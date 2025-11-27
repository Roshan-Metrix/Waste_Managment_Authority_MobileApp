import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import colors from "../../src/colors";

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const [managerData, setManagerData] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile for STORE user
  const loadStoreProfile = async () => {
    try {
      const res = await api.get("/auth/store/profile");

      if (res.data.success && res.data.store) {
        setStoreData(res.data.store);
      }
    } catch (error) {
      console.log("Store Profile Fetch Error:", error.message);
    }
  };

  // Load profile for MANAGER
  const loadManagerProfile = async () => {
    try {
      const res = await api.get("/auth/manager/profile");

      if (res.data.success) {
        setManagerData(res.data.manager);
        setStoreData(res.data.store);
      }
    } catch (error) {
      console.log("Manager Profile Fetch Error:", error.message);
    }
  };

  // Master Loader
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      if (user?.role === "store") {
        await loadStoreProfile();
      }

      if (user?.role === "manager") {
        await loadManagerProfile();
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Profile Box */}
      <View style={styles.profileBox}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={90} color={colors.primary} />
        </View>

        {/* ADMIN SECTION */}
        {user?.role === "admin" && (
          <>
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text style={styles.emailText}>{user?.email}</Text>

            <Text style={styles.roleText}>
              Role: <Text style={styles.roleHighlight}>ADMIN</Text>
            </Text>
          </>
        )}

        {/* MANAGER SECTION */}
        {user?.role === "manager" && (
          <>
            <Text style={styles.nameText}>{managerData?.name || user.name}</Text>
            <Text style={styles.emailText}>{managerData?.email || user.email}</Text>

            <Text style={styles.roleText}>
              Role: <Text style={styles.roleHighlight}>MANAGER</Text>
            </Text>

            {/* Store Details */}
            {storeData && (
              <View style={styles.storeBox}>
                <Text style={styles.storeTitle}>Store Details</Text>

                <Text style={styles.storeText}>
                  Id: <Text style={styles.storeHighlight}>{storeData?.storeId}</Text>
                </Text>

                <Text style={styles.storeText}>
                  Store Name: <Text style={styles.storeHighlight}>{storeData?.name}</Text>
                </Text>

                <Text style={styles.storeText}>
                  Location: <Text style={styles.storeHighlight}>{storeData?.storeLocation}</Text>
                </Text>

                <Text style={styles.storeText}>
                  Contact: <Text style={styles.storeHighlight}>{storeData?.contactNumber}</Text>
                </Text>

                <Text style={styles.storeText}>
                  Email: <Text style={styles.storeHighlight}>{storeData?.email}</Text>
                </Text>
              </View>
            )}
          </>
        )}

        {/* STORE SECTION */}
        {user?.role === "store" && storeData && (
          <>
            <Text style={styles.nameText}>{storeData?.name}</Text>
            <Text style={styles.emailText}>{storeData?.email}</Text>

            <Text style={styles.roleText}>
              Role: <Text style={styles.roleHighlight}>STORE</Text>
            </Text>

            <View style={styles.storeBox}>
              <Text style={styles.storeTitle}>Store Details</Text>

              <Text style={styles.storeText}>
                Id: <Text style={styles.storeHighlight}>{storeData?.storeId}</Text>
              </Text>

              <Text style={styles.storeText}>
                Store Name: <Text style={styles.storeHighlight}>{storeData?.name}</Text>
              </Text>

              <Text style={styles.storeText}>
                Location: <Text style={styles.storeHighlight}>{storeData?.storeLocation}</Text>
              </Text>

              <Text style={styles.storeText}>
                Contact: <Text style={styles.storeHighlight}>{storeData?.contactNumber}</Text>
              </Text>

              <Text style={styles.storeText}>
                Email: <Text style={styles.storeHighlight}>{storeData?.email}</Text>
              </Text>
            </View>
          </>
        )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    color: colors.primary,
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
  roleHighlight: {
    fontWeight: "bold",
    color: colors.primary,
  },

  storeBox: {
    width: "100%",
    backgroundColor: "#e0f2fe",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  storeText: {
    fontSize: 16,
    color: "#1e3a8a",
    marginTop: 4,
  },
  storeHighlight: {
    fontWeight: "600",
    color: colors.primary,
  },

  changePasswordBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 25,
    justifyContent: "center",
  },
  changePasswordText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
});
