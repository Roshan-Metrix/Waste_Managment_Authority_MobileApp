import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VendorSignatureScreen({ navigation }) {
  const signatureRef = useRef(null);
  const [signature, setSignature] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSignature = async (sig) => {
    setSignature(sig);
    setSubmitted(true);

    await AsyncStorage.setItem("vendor_signature", sig);
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Vendor Signature</Text>

      {!submitted ? (
        <View style={styles.signatureBox}>
          <SignatureScreen
            ref={signatureRef}
            onOK={handleSignature}
            onEmpty={() => alert("Please sign first")}
            descriptionText="Sign here"
            clearText="Clear"
            confirmText="Save"
            webStyle={style}
          />
        </View>
      ) : (
        <View style={styles.previewBox}>
          <Image source={{ uri: signature }} style={styles.signatureImage} />
        </View>
      )}

      {!submitted && (
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => signatureRef.current.readSignature()}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      )}

      {!submitted && (
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Clear Signature</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.submitBtn, { marginTop: 20, backgroundColor: "black" }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.submitText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },
  signatureBox: {
    height: 300,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  previewBox: {
    height: 300,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    marginBottom: 20,
  },
  signatureImage: {
    width: "100%",
    height: "100%",
  },
  submitBtn: {
    backgroundColor: "#2C6BED",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  clearBtn: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  clearText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

const style = `
  .m-signature-pad { border: none; box-shadow: none; }
  .m-signature-pad--body { border: none; }
  .m-signature-pad--footer { display: none; }
`;
