import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../api/api";

export default function CalibrationPhaseScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [photo, setPhoto] = useState(null);
  const [fetchWeight, setFetchWeight] = useState("");
  const [enterWeight, setEnterWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [calibrateBtnDisabled, setCalibrateBtnDisabled] = useState(false);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  const handleCapture = async () => {
    try {
      const picture = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.4,
      });
      setPhoto(picture);
      setCalibrateBtnDisabled(true);
    } catch (err) {
      alert("Failed to capture image.");
    }
  };

  const handleCalibrate = async () => {
    if (!fetchWeight || !enterWeight || !photo?.base64) {
      alert("Please fill all fields and capture an image.");
      return;
    }

    try {
      setLoading(true);

      const stored = await AsyncStorage.getItem("todayTransaction");
      const parsed = JSON.parse(stored);
      const transactionId = parsed?.transactionId;

      const res = await api.post(
        `/manager/transaction/transaction-calibration/${transactionId}`,
        {
          fetchWeight,
          enterWeight,
          image: photo.base64,
        }
      );

      setLoading(false);

      if (res.data.success) {
        await AsyncStorage.setItem("calibrationStatus", "Completed");
        navigation.navigate("ProcessTransactionScreen");
      } else {
        alert("Calibration failed.");
        setPhoto(null);
      }
    } catch (err) {
      setLoading(false);
      alert("Calibration failed. Please try again.");
      setPhoto(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calibration Phase</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        
        {/* Title Section */}
        {/* <View style={styles.titleBox}>
          <Text style={styles.title}>Capture Calibration Data</Text>
          <Text style={styles.subTitle}>
            Upload the bag image & enter weights accurately
          </Text>
        </View> */}

        {/* Camera Box */}
        <View style={styles.card}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.capturedImage} />
          ) : (
            <CameraView style={styles.camera} facing="back" ref={cameraRef} />
          )}
        </View>

        {/* Capture Button */}
        {!photo && (
          <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
            <MaterialIcons name="camera-alt" size={22} color="#fff" />
            <Text style={styles.captureText}>Capture Image</Text>
          </TouchableOpacity>
        )}

        {/* Input Fields */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Fetch Weight</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter fetched weight"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              keyboardType="numeric"
              value={fetchWeight}
              onChangeText={setFetchWeight}
            />
            <Text style={styles.unit}>kg</Text>
          </View>

          <Text style={styles.inputLabel}>Enter Weight</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter input weight"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              keyboardType="numeric"
              value={enterWeight}
              onChangeText={setEnterWeight}
            />
            <Text style={styles.unit}>kg</Text>
          </View>
        </View>

        {calibrateBtnDisabled && (
          <TouchableOpacity style={styles.mainBtn} onPress={handleCalibrate}>
            <Text style={styles.mainBtnText}>Calibrate</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* LOADING OVERLAY */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>Processing...</Text>
        </View>
      )}
    </View>
  );
}

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 5,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
  },

  titleBox: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1e3a8a",
    textAlign: "center",
  },

  subTitle: {
    marginTop: 6,
    color: "#6b7280",
    textAlign: "center",
  },

  card: {
    width: "90%",
    height: 280,
    backgroundColor: "#ffffffbb",
    borderRadius: 18,
    alignSelf: "center",
    marginTop: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  camera: {
    flex: 1,
  },

  capturedImage: {
    width: "100%",
    height: "100%",
  },

  captureBtn: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    borderRadius: 12,
    width: "70%",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  captureText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },

  inputCard: {
    marginTop: 25,
    padding: 20,
    backgroundColor: "#ffffffaa",
    borderRadius: 18,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
    color: "#374151",
    marginTop: 10,
  },

  inputWrapper: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },

  unit: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },

  mainBtn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 30,
    width: "85%",
    alignSelf: "center",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  mainBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },

  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
