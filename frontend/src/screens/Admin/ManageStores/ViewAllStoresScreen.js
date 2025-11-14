import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ViewAllStoresScreen({ navigation }) {
  // Sample dummy data
  const stores = [
    {
      id: "ST-101",
      name: "Kathmandu Central Store",
      location: "Kathmandu, Nepal",
      contact: "9800000001",
    },
    {
      id: "ST-102",
      name: "Pokhara Lakeside Store",
      location: "Pokhara, Nepal",
      contact: "9800000002",
    },
    {
      id: "ST-103",
      name: "Birgunj City Store",
      location: "Birgunj, Nepal",
      contact: "9800000003",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Stores</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {stores.map((store, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <MaterialIcons name="confirmation-number" size={22} color="#2563eb" />
              <Text style={styles.value}>{store.id}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="store" size={22} color="#2563eb" />
              <Text style={styles.value}>{store.name}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="location-pin" size={22} color="#2563eb" />
              <Text style={styles.value}>{store.location}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="phone" size={22} color="#2563eb" />
              <Text style={styles.value}>{store.contact}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* -------------------- STYLES -------------------- */
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
    backgroundColor: "#fff",
    elevation: 4,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 16,
    marginLeft: 10,
    color: "#111827",
    fontWeight: "500",
  },
});

