import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../colors"; 

export default function ManageDataScreen({ navigation }) {
  const handleAction = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={26} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Management</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="storage" size={48} color={colors.primary} />
          </View>
          <Text style={styles.subTitle}>Centralized Record Hub</Text>
          <Text style={styles.desc}>
            Access, review, and manage all your stored transaction data. Use the
            tools below to ensure data integrity and compliance.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* View All Data Card/Button */}
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.primary }]}
            onPress={() => handleAction("ShowAllTransaction")}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconContainer}>
              <MaterialIcons name="dataset" size={30} color={colors.primary} />
            </View>
            <View style={styles.actionTextGroup}>
              <Text style={styles.actionCardTitle}>View All Records</Text>
              <Text style={styles.actionCardDesc}>
                Browse and search through the complete transaction history.
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="#fff"
              style={{ opacity: 0.7 }}
            />
          </TouchableOpacity>

          {/* Export Data Card/Button */}
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: "#22c55e" }]}
            onPress={() => handleAction("ShowAllTransaction")}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.actionIconContainer,
                { backgroundColor: "#dcfce7" },
              ]}
            >
              <MaterialIcons name="file-download" size={30} color={"#22c55e"} />
            </View>
            <View style={styles.actionTextGroup}>
              <Text style={styles.actionCardTitle}>Export Data (PDF/CSV)</Text>
              <Text style={styles.actionCardDesc}>
                Generate reports and share transaction logs for auditing.
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="#fff"
              style={{ opacity: 0.7 }}
            />
          </TouchableOpacity>

          {/* Placeholder for future actions (e.g., Settings) */}
          <View style={styles.placeholderCard}>
            <MaterialIcons
              name="settings-suggest"
              size={24}
              color={"#f59e0b"}
            />
            <Text style={styles.placeholderText}>
              More options coming soon...
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: "center",
  },

  // Info Card Styles
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 25,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  iconCircle: {
    backgroundColor: "#e0e7ff",
    padding: 18,
    borderRadius: 50,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b7280",
    lineHeight: 22,
  },

  // Action Container Styles
  actionsContainer: {
    width: "100%",
    gap: 20,
  },

  // Action Card (Button) Styles
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 12, 
  },
  actionIconContainer: {
    backgroundColor: "#e0e7ff",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  actionTextGroup: {
    flex: 1,
    marginRight: 10,
  },
  actionCardTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
  },
  actionCardDesc: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },

  // Placeholder Card Style
  placeholderCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f59e0b" + "50",
    marginTop: 10,
    opacity: 0.8,
  },
  placeholderText: {
    color: "#6b7280",
    marginLeft: 10,
    fontWeight: "500",
  },
});
