import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Profile Content */}
      <View style={styles.profileBox}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={90} color="#2563eb" />
        </View>

        <Text style={styles.nameText}>{user?.name || "User"}</Text>
        <Text style={styles.emailText}>{user?.email || "example@email.com"}</Text>
        <Text style={styles.roleText}>
          Role:
          <Text style={{ fontWeight: "bold", color: "#2563eb" }}>
            {user?.role?.toUpperCase() || "STAFF"}
          </Text>
        </Text>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity
        style={styles.changePasswordBtn}
        onPress={() => navigation.navigate("ChangePasswordScreen")}
        activeOpacity={0.8}
      >
        <MaterialIcons name="lock-reset" size={24} color="#fff" />
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <MaterialIcons name="info" size={22} color="#2563eb" />
        <Text style={styles.infoText}>
          This profile is linked to your Decathlon internal account.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563eb",
  },
  profileBox: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    backgroundColor: "#e0e7ff",
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  emailText: {
    fontSize: 16,
    color: "#374151",
    marginTop: 4,
  },
  roleText: {
    fontSize: 16,
    color: "#4b5563",
    marginTop: 8,
  },

  /* ★ Change Password Button ★ */
  changePasswordBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 25,
    justifyContent: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  changePasswordText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
  },
  infoText: {
    color: "#1e3a8a",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
});
