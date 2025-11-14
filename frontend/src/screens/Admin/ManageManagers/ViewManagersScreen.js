import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ViewManagersScreen({ navigation }) {
  // Dummy Managers Data
  const managers = [
    {
      id: "ST-101",
      storeName: "City Mall Store",
      managerName: "Ravi Sharma",
      email: "ravi.manager@example.com",
    },
    {
      id: "ST-225",
      storeName: "Kathmandu Center",
      managerName: "Pooja Karki",
      email: "pooja.karki@example.com",
    },
    {
      id: "ST-309",
      storeName: "Lalitpur Outlet",
      managerName: "Sanjay Singh",
      email: "sanjay.s@example.com",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Managers List</Text>

        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="supervised-user-circle" size={70} color="#2563eb" />
        </View>

        <Text style={styles.title}>All Store Managers</Text>

        {/* Manager Cards */}
        {managers.map((m, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <MaterialIcons name="person" size={22} color="#2563eb" />
              <Text style={styles.value}>{m.managerName}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="email" size={22} color="#2563eb" />
              <Text style={styles.value}>{m.email}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="store" size={22} color="#2563eb" />
              <Text style={styles.value}>{m.storeName}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="confirmation-number" size={22} color="#2563eb" />
              <Text style={styles.value}>{m.id}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    elevation: 3,
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
  },

  scrollContent: {
    padding: 20,
  },

  iconContainer: {
    alignSelf: "center",
    backgroundColor: "#e0e7ff",
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  value: {
    fontSize: 16,
    marginLeft: 10,
    color: "#111827",
    fontWeight: "500",
  },
});
