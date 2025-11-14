import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function RemoveStoresScreen({ navigation }) {
  // Dummy Store Data
  const [stores, setStores] = useState([
    {
      id: "STR001",
      name: "Super Mart",
      location: "Downtown",
      contact: "9876543210",
    },
    {
      id: "STR002",
      name: "Fresh Foods",
      location: "City Square",
      contact: "9801122334",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Remove Store Confirm
  const confirmRemoval = () => {
    if (!adminEmail || !adminPassword) {
      alert("Please enter admin email and password!");
      return;
    }

    // Remove
    const updated = stores.filter((s) => s.id !== selectedStore.id);
    setStores(updated);

    setModalVisible(false);
    setAdminEmail("");
    setAdminPassword("");
    alert("Store Removed Successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Remove Stores</Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>All Stores</Text>

        {stores.map((store, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <MaterialIcons name="store" size={24} color="#2563eb" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{store.name}</Text>
                <Text style={styles.cardSub}>ID: {store.id}</Text>
                <Text style={styles.cardSub}>Location: {store.location}</Text>
                <Text style={styles.cardSub}>Contact: {store.contact}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => {
                setSelectedStore(store);
                setModalVisible(true);
              }}
            >
              <MaterialIcons name="delete" size={22} color="#fff" />
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Verify Identity Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Verify Your Identity</Text>

            <View style={styles.inputBox}>
              <MaterialIcons name="email" size={22} color="#2563eb" />
              <TextInput
                style={styles.input}
                placeholder="Admin Email"
                value={adminEmail}
                onChangeText={setAdminEmail}
              />
            </View>

            <View style={styles.inputBox}>
              <MaterialIcons name="lock" size={22} color="#2563eb" />
              <TextInput
                style={styles.input}
                placeholder="Admin Password"
                secureTextEntry
                value={adminPassword}
                onChangeText={setAdminPassword}
              />
            </View>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={confirmRemoval}
            >
              <Text style={styles.confirmText}>Confirm Removal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: "space-between",
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

  content: {
    padding: 20,
  },

  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  cardSub: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },

  removeBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 20,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    marginLeft: 10,
  },

  confirmBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  cancelBtn: {
    marginTop: 10,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 15,
    color: "#6b7280",
  },
});
