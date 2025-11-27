import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert, 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Reusable component for the action buttons (now modern cards)
const FeatureCard = ({ title, iconName, iconColor, onPress, description }) => (
  <TouchableOpacity
    style={[styles.cardContainer, { borderLeftColor: iconColor }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.iconWrapper, { backgroundColor: iconColor + "15" }]}>
      <MaterialIcons name={iconName} size={30} color={iconColor} />
    </View>
    <View style={styles.textWrapper}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
    <MaterialIcons
      name="arrow-forward-ios"
      size={16}
      color="#9ca3af"
      style={{ marginLeft: 10 }}
    />
  </TouchableOpacity>
);

export default function ManageStoresScreen({ navigation }) {

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1e40af" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Store Management</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Body */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="storefront" size={60} color="#1e40af" />
          </View>
          <Text style={styles.subTitle}>Centralized Store Hub</Text>
          <Text style={styles.desc}>
            Efficiently handle all aspects of your store locations. Your data is
            secure and accessible instantly.
          </Text>
        </View>

        {/* Action Cards */}
        <View style={styles.actionsContainer}>
          <Text style={styles.actionSectionTitle}>Quick Actions</Text>

          <FeatureCard
            title="Add New Store"
            description="Register a new physical location into the system."
            iconName="add-business"
            iconColor="#22c55e" 
            onPress={() => navigation.navigate("AddStoreScreen")}
          />

          <FeatureCard
            title="View All Stores"
            description="Access the complete list and detailed information."
            iconName="visibility"
            iconColor="#2563eb" 
            onPress={() => navigation.navigate("ViewAllStoresScreen")}
          />

          <FeatureCard
            title="Remove Store"
            description="Permanently delete a store from the database."
            iconName="delete-forever"
            iconColor="#ef4444" 
            onPress={() => navigation.navigate("RemoveStoresScreen")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50, 
    paddingBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#1e40af",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e40af", 
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  // --- Hero Section ---
  heroSection: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  iconCircle: {
    backgroundColor: "#dbeafe", 
    padding: 25,
    borderRadius: 50,
    marginBottom: 15,
    shadowColor: "#1e40af",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b7280",
    lineHeight: 20,
    maxWidth: 350,
  },
  // --- Action Cards Container ---
  actionsContainer: {
    width: "100%",
    paddingTop: 10,
    gap: 12, 
  },
  actionSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: 8,
    marginLeft: 5,
  },
  // --- Feature Card Styles  ---
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16, 
    borderLeftWidth: 6, 
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 12,
    color: "#6b7280",
  },
});
