import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProcessTransactionScreen({ navigation }) {
  const [calibrationStatus] = useState("Completed"); 
  const [credentialStatus] = useState("Completed");

  // Possible statuses: Completed / Pending

  const isReady =
    calibrationStatus === "Completed" &&
    credentialStatus === "Completed";

  const getStatusStyle = (status) => {
    return status === "Completed" ? styles.completed : styles.pending;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Process Transaction</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Top Icon */}
      <View style={styles.topIconWrapper}>
        <View style={styles.topIconCircle}>
          <MaterialIcons name="account-balance" size={60} color="#2563eb" />
        </View>
        <Text style={styles.topTitle}>Transaction Processing</Text>
        <Text style={styles.topSubtitle}>
          Complete the necessary phases below
        </Text>
      </View>

      {/* Body */}
      <View style={styles.container}>
        {/* Calibration Phase */}
        <TouchableOpacity
          style={styles.phaseButton}
          onPress={() => navigation.navigate("CalibrationPhaseScreen")}
        >
          <View>
            <Text style={styles.phaseTitle}>Calibration Phase</Text>
            <Text style={styles.phaseDesc}>
              Begin initial verification process
            </Text>
          </View>

          <View style={[styles.statusBadge, getStatusStyle(calibrationStatus)]}>
            <Text style={styles.statusText}>{calibrationStatus}</Text>
          </View>
        </TouchableOpacity>

        {/* Credential Verification */}
        <TouchableOpacity
          style={styles.phaseButton}
          onPress={() => navigation.navigate("CredentialVerificationScreen")}
        >
          <View>
            <Text style={styles.phaseTitle}>Credential Verification</Text>
            <Text style={styles.phaseDesc}>Verify Manager credentials</Text>
          </View>

          <View style={[styles.statusBadge, getStatusStyle(credentialStatus)]}>
            <Text style={styles.statusText}>{credentialStatus}</Text>
          </View>
        </TouchableOpacity>

        {/* ---------- FINAL SUBMIT BUTTON ---------- */}
        <TouchableOpacity
          disabled={!isReady}
          onPress={() => navigation.navigate("BillingTransactionScreen")}
          style={[
            styles.finalButton,
            { backgroundColor: isReady ? "#2563eb" : "#94a3b8" },
          ]}
        >
          <Text style={styles.finalButtonText}>
            Continue to Billing
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
  },

  topIconWrapper: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },

  topIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  topTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e40af",
    marginTop: 12,
  },

  topSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },

  container: {
    padding: 20,
  },

  phaseButton: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  phaseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  phaseDesc: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  completed: {
    backgroundColor: "#dcfce7",
  },

  pending: {
    backgroundColor: "#fee2e2",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  finalButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  finalButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});
