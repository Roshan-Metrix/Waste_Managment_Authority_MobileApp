import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import colors from '../../../colors'

export default function AddProceedTransactionScreen({ navigation }) {
  const handleSubmit = async () => {
    navigation.navigate("AddTransactionScreen");
  };

  const handleProceed = async () => {
    const stored = await AsyncStorage.getItem("todayTransaction");
    const parsed = JSON.parse(stored);
    const transactionId = parsed?.transactionId;
    navigation.navigate("ProcessTransactionScreen", { transactionId });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("UserScreen")}>
          <MaterialIcons name="arrow-back" size={32} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add / Proceed Transaction</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* CENTERED CONTENT */}
      <View style={styles.centerWrapper}>
        {/* Top Icon */}
        <View style={styles.topIconCircle}>
          <MaterialIcons name="playlist-add" size={60} color={colors.primary} />
        </View>
        <Text style={styles.topTitle}>Transaction Processing</Text>
        <Text style={styles.topSubtitle}>
          Complete the necessary phases below
        </Text>

        {/* Buttons */}
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.finalButton,
            { backgroundColor: colors.primary, transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
        >
          <Text style={styles.finalButtonText}> Add Transaction</Text>
        </Pressable>

        <Pressable
          onPress={handleProceed}
          style={({ pressed }) => [
            styles.finalButton,
            { backgroundColor: "#2d4287ff", transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
        >
          <Text style={styles.finalButtonText}> Proceed Recent Transaction</Text>
        </Pressable>
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginLeft: 15,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  topIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 6,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  topTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e40af",
    marginTop: 2,
  },
  topSubtitle: { fontSize: 15, color: "#64748b", marginTop: 6, marginBottom: 20 },

  finalButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  finalButtonText: { fontSize: 18, fontWeight: "700", color: "#fff" },
});
