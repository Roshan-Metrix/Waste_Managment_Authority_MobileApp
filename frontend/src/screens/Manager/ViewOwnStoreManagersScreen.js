import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../api/api";

export default function ViewOwnStoreManagersScreen({ navigation, route }) {
  const storeId = route.params?.storeId; 
  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState([]);

 const loadManagers = async () => {
  try {
    const res = await api.get("/auth/manager/get-store-managers");

    if (res.data.success) {
      setManagers(res.data.managers);
    }
  } catch (error) {
    console.log("Fetch Error:", error.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadManagers();
  }, []);

  const renderManager = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="person-circle-outline" size={40} color="#2563eb" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.meta}>
            Store: <Text style={styles.highlight}>{item.storeName}</Text>
          </Text>
          <Text style={styles.meta}>
            Location: <Text style={styles.highlight}>{item.storeLocation}</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Store Managers</Text>
        <View style={{ width: 26 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={managers}
          keyExtractor={(item) => item._id}
          renderItem={renderManager}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563eb",
  },

  card: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  email: {
    fontSize: 14,
    color: "#4b5563",
  },

  meta: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },

  highlight: {
    fontWeight: "600",
    color: "#2563eb",
  },
});
