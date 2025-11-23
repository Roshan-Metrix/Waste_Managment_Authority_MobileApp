// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { CameraView, Camera } from "expo-camera";
// import { MaterialIcons } from "@expo/vector-icons";
// import { runOcrOnImage } from "../../../ocr/ocrService";
// import { parseWeight } from "../../../ocr/parseWeight";
// import api from "../../../api/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function ItemsTransactionScreen({ navigation }) {
//   const cameraRef = useRef(null);
//   const [photo, setPhoto] = useState(null);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [materialType, setMaterialType] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchWeight, setFetchWeight] = useState("");
//   const [enterWeight, setEnterWeight] = useState("");

//   useEffect(() => {
//     (async () => {
//       const cam = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(cam.status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//       return (
//         <View style={styles.centerScreen}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }
  
//     if (hasPermission === false) {
//       return (
//         <View style={styles.centerScreen}>
//           <Text>No access to camera</Text>
//           <TouchableOpacity
//             onPress={() => Camera.requestCameraPermissionsAsync()}
//             style={styles.permissionBtn}
//           >
//             <Text style={{ color: "#fff" }}>Allow Camera</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//   const handleCapture = async () => {
//       try {
//         const picture = await cameraRef.current.takePictureAsync({
//           base64: true,
//           quality: 0.5,
//         });
  
//         setPhoto(picture);
//         setLoading(true);
  
//         // Run OCR automatically
//         const ocrText = await runOcrOnImage(picture.uri);
//         const cleanWeight = parseWeight(ocrText);
  
//         if (cleanWeight) {
//           setFetchWeight(cleanWeight.toString());
//         } else {
//           alert("Unable to detect weight! Please enter manually.");
//           setFetchWeight("");
//         }
  
//         setLoading(false);
//       } catch (e) {
//         console.log("Error capturing:", e);
//         setLoading(false);
//         alert("Capture failed. Try again.");
//       }
//     };

//   const handleAddItem = async () => {
//     if (!fetchWeight || !enterWeight) {
//       alert("Required fields missing.");
//       return;
//     }
//     try {
//       setLoading(true);

//       const stored = await AsyncStorage.getItem("todayTransaction");
//       const parsed = JSON.parse(stored);
//       const transactionId = parsed?.transactionId;

//       const res = await api.post(
//         `/manager/transaction/transaction-items/${transactionId}`,
//         {
//           materialType,
//           weight,
//           weightSource,
//           image: photo.base64,
//         }
//       );

//       setLoading(false);

//       if (res.data.success) {
//         navigation.navigate("ProcessTransactionScreen");
//       } else {
//         alert("Item not added.");
//       }
//     } catch (err) {
//       setLoading(false);
//       alert("Error Adding Items.");
//       console.log(err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Material Photo</Text>
//         <View style={{ width: 26 }} />
//         <TouchableOpacity
//           onPress={() => navigation.navigate("VendorSignatureScreen")}
//         >
//           <MaterialIcons name="storefront" size={35} color="#007AFF" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         contentContainerStyle={{ paddingBottom: 40 }}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* CAMERA BOX */}
//         <View style={styles.cameraBox}>
//           {photo ? (
//             <Image source={{ uri: photo }} style={styles.capturedImage} />
//           ) : (
//             <CameraView style={styles.camera} facing="back" ref={cameraRef} />
//           )}
//         </View>

//         {/* CAPTURE BUTTON */}
//         <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
//           <MaterialIcons name="photo-camera" size={22} color="#fff" />
//           <Text style={styles.captureText}>Capture</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.dropdownBox}
//           onPress={() => setShowDropdown(!showDropdown)}
//         >
//           <Text style={styles.dropdownText}>
//             {materialType || "Choose material"}
//           </Text>
//           <MaterialIcons
//             name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
//             size={24}
//             color="#374151"
//           />
//         </TouchableOpacity>

//         {showDropdown && (
//           <View style={styles.dropdownList}>
//             {[
//               "Defective Products",
//               "Hazardous Waste",
//               "Recycling Cardboard",
//               "Recycling E Waste",
//               "Recycling Glass",
//               "Recycling Hangers",
//               "Recycling Metal",
//               "Recycling Mixed Packaging",
//               "Recycling Organic",
//               "Recycling Paper",
//               "Recycling Rubber",
//               "Recycling Soft Plastics",
//               "Recycling Textile",
//               "Waste Incineration",
//               "Waste incineration energy recovery",
//               "Waste Landfill",
//             ].map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   setMaterialType(item);
//                   setShowDropdown(false);
//                 }}
//               >
//                 <Text style={styles.dropdownItemText}>{item}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//         {/* ---- END DROPDOWN ---- */}

//         {/* Fetch Weight */}
//         <View style={styles.inputBox}>
//           <TextInput
//             placeholder="Fetch Weight (auto)"
//             style={styles.input}
//             keyboardType="numeric"
//             value={fetchWeight}
//             onChangeText={setFetchWeight}
//           />
//           <Text style={styles.gmText}>kg</Text>
//         </View>

//         {/* ENTER WEIGHT */}
//         <View style={styles.inputBox}>
//           <TextInput
//             placeholder="Enter Weight (manual)"
//             style={styles.input}
//             keyboardType="numeric"
//             value={enterWeight}
//             onChangeText={setEnterWeight}
//           />
//           <Text style={styles.gmText}>kg</Text>
//         </View>

//         {/* CALIBRATE BUTTON */}
//         <TouchableOpacity style={styles.calibrateBtn} onPress={handleAddItem}>
//           <Text style={styles.calibrateText}>Add Material</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* LOADING OVERLAY */}
//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#fff" />
//           <Text style={{ color: "#fff", marginTop: 10 }}>Processing...</Text>
//         </View>
//       )}
//     </View>
//   );
// }


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
import { CameraView, Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { runOcrOnImage } from "../../../ocr/ocrService";
import { parseWeight } from "../../../ocr/parseWeight";
import api from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemsTransactionScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [materialType, setMaterialType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fetchWeight, setFetchWeight] = useState("");
  const [enterWeight, setEnterWeight] = useState("");

  // ASK PERMISSION
  useEffect(() => {
    (async () => {
      const cam = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cam.status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.centerScreen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerScreen}>
        <Text>No access to camera</Text>
        <TouchableOpacity
          onPress={() => Camera.requestCameraPermissionsAsync()}
          style={styles.permissionBtn}
        >
          <Text style={{ color: "#fff" }}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // -------------------------
  // CAPTURE IMAGE + OCR
  // -------------------------
  const handleCapture = async () => {
    try {
      const picture = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
      });

      setPhoto(picture); // Store the full picture object
      setLoading(true);

      // OCR
      const ocrText = await runOcrOnImage(picture.uri);
      const cleanWeight = parseWeight(ocrText);

      if (cleanWeight) {
        setFetchWeight(cleanWeight.toString());
      } else {
        alert("Unable to detect weight! Please enter manually.");
        setFetchWeight("");
      }

      setLoading(false);
    } catch (e) {
      console.log("Error capturing:", e);
      setLoading(false);
      alert("Capture failed. Try again.");
    }
  };

  // ADD ITEM
  const handleAddItem = async () => {
    if (!materialType) {
      alert("Please select material type.");
      return;
    }

    if (!photo) {
      alert("Please capture an image.");
      return;
    }

    // Determine weight source
    let weight = "";
    let weightSource = "";

    if (enterWeight.trim() !== "") {
      weight = enterWeight;
      weightSource = "manual";
    } else {
      weight = fetchWeight;
      weightSource = "system";
    }

    if (!weight) {
      alert("No weight detected or entered.");
      return;
    }

    try {
      setLoading(true);

      const stored = await AsyncStorage.getItem("todayTransaction");
      const parsed = JSON.parse(stored);
      const transactionId = parsed?.transactionId;

      const res = await api.post(
        `/manager/transaction/transaction-items/${transactionId}`,
        {
          materialType,
          weight,
          weightSource,
          image: photo.base64,
        }
      );

      setLoading(false);

      if (res.data.success) {
        alert("Item added .");
        setPhoto("");
        setMaterialType("");
        setFetchWeight("");
        setEnterWeight("");
      } else {
        alert("Item not added.");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Error adding item.");
    }
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Material Photo</Text>
        <View style={{ width: 26 }} />
         <TouchableOpacity
          onPress={() => navigation.navigate("VendorSignatureScreen")}
        >
          <MaterialIcons name="assignment" size={35} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* CAMERA SECTION */}
        <View style={styles.cameraBox}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.capturedImage} />
          ) : (
            <CameraView style={styles.camera} facing="back" ref={cameraRef} />
          )}
        </View>

        {/* CAPTURE BUTTON */}
        <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
          <MaterialIcons name="photo-camera" size={22} color="#fff" />
          <Text style={styles.captureText}>Capture</Text>
        </TouchableOpacity>

        {/* RECAPTURE BUTTON */}
        {photo && (
          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={handleCapture}
          >
            <Text style={styles.retakeText}>Capture Image Again</Text>
          </TouchableOpacity>
        )}

        {/* MATERIAL DROPDOWN */}
        <TouchableOpacity
          style={styles.dropdownBox}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>
            {materialType || "Choose material"}
          </Text>
          <MaterialIcons
            name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="#374151"
          />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            {[
              "Defective Products",
              "Hazardous Waste",
              "Recycling Cardboard",
              "Recycling E Waste",
              "Recycling Glass",
              "Recycling Hangers",
              "Recycling Metal",
              "Recycling Mixed Packaging",
              "Recycling Organic",
              "Recycling Paper",
              "Recycling Rubber",
              "Recycling Soft Plastics",
              "Recycling Textile",
              "Waste Incineration",
              "Waste incineration energy recovery",
              "Waste Landfill",
            ].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setMaterialType(item);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* FETCHED WEIGHT (READ ONLY) */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Fetched Weight (auto)"
            style={[styles.input, { color: "#6B7280" }]}
            keyboardType="numeric"
            value={fetchWeight}
            editable={false} // DISABLE EDITING
          />
          <Text style={styles.gmText}>kg</Text>
        </View>

        {/* ENTER WEIGHT (OPTIONAL) */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter Weight (manual)"
            style={styles.input}
            keyboardType="numeric"
            value={enterWeight}
            onChangeText={setEnterWeight}
          />
          <Text style={styles.gmText}>kg</Text>
        </View>

        {/* ADD MATERIAL */}
        <TouchableOpacity style={styles.calibrateBtn} onPress={handleAddItem}>
          <Text style={styles.calibrateText}>Add Material</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* LOADING */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>Processing...</Text>
        </View>
      )}
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2ff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 5,
  },

  headerTitle: { fontSize: 22, fontWeight: "700", color: "#2563eb" },

  cameraBox: {
    width: "90%",
    height: 280,
    backgroundColor: "#fff",
    borderRadius: 18,
    alignSelf: "center",
    marginTop: 20,
    overflow: "hidden",
  },

  camera: { flex: 1 },

  capturedImage: { width: "100%", height: "100%" },

  captureBtn: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    borderRadius: 12,
    width: "70%",
    alignSelf: "center",
    justifyContent: "center",
  },

  captureText: { color: "#fff", marginLeft: 8, fontWeight: "700" },

  retakeBtn: {
    backgroundColor: "#6B7280",
    paddingVertical: 10,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  retakeText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },

  dropdownBox: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdownList: {
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 12,
    paddingVertical: 5,
  },

  dropdownItem: {
    padding: 12,
  },

  dropdownItemText: {
    fontSize: 16,
  },

  inputBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },

  gmText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },

  calibrateBtn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 30,
    width: "85%",
    alignSelf: "center",
  },

  calibrateText: {
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

  centerScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionBtn: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#2563eb",
    borderRadius: 10,
  },
});


// ----------------- STYLES -----------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//     paddingHorizontal: 20,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop: 60,
//     paddingBottom: 15,
//     backgroundColor: "#fff",
//     marginHorizontal: -20,
//     paddingHorizontal: 20,
//     elevation: 3,
//   },

//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#2563eb",
//   },

//   capturePhotoHeading: {
//     marginTop: 20,
//     marginLeft: 10,
//     fontWeight: "600",
//     fontSize: 20,
//     color: "#374151",
//   },

//   cameraBox: {
//     width: "100%",
//     height: 280,
//     backgroundColor: "#e5e7eb",
//     borderRadius: 16,
//     overflow: "hidden",
//     marginTop: 18,
//   },

//   camera: { flex: 1 },

//   capturedImage: {
//     width: "100%",
//     height: "100%",
//   },

//   captureBtn: {
//     backgroundColor: "#2563eb",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     borderRadius: 12,
//     marginTop: 15,
//   },

//   captureText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },

//   // --- DROPDOWN ---
//   dropdownLabel: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 4,
//     color: "#374151",
//   },

//   dropdownBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     borderRadius: 12,
//     marginTop: 10,
//   },

//   dropdownText: {
//     fontSize: 16,
//     color: "#374151",
//   },

//   dropdownList: {
//     backgroundColor: "#fff",
//     marginTop: 2,
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 12,
//     overflow: "hidden",
//   },

//   dropdownItem: {
//     paddingVertical: 14,
//     paddingHorizontal: 15,
//   },

//   dropdownItemText: {
//     fontSize: 16,
//     color: "#111827",
//   },

//   // --- INPUTS ---
//   inputBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     marginTop: 15,
//   },

//   input: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 16,
//   },

//   gmText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#374151",
//   },

//   calibrateBtn: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 14,
//     borderRadius: 14,
//     alignItems: "center",
//     marginTop: 25,
//   },

//   calibrateText: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "700",
//   },

//    loadingOverlay: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
