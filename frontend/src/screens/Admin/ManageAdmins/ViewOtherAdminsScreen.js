// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// export default function ViewOtherAdminsScreen({ navigation }) {
//   // ---- Dummy Admin Data ----
//   const admins = [
//     { id: "1", name: "Roshan Patel", email: "roshan@example.com" },
//     { id: "2", name: "Amisha Sharma", email: "amisha@example.com" },
//     { id: "3", name: "Krishna Dev", email: "krish@example.com" },
//     { id: "4", name: "Priya Gurung", email: "priya@example.com" },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* ----------- Header ----------- */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Other Admins</Text>

//         <View style={{ width: 26 }} /> 
//       </View>

//       {/* ----------- Admin List ----------- */}
//       <FlatList
//         data={admins}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ padding: 16 }}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <View>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.email}>{item.email}</Text>
//             </View>

//             <MaterialIcons name="admin-panel-settings" size={26} color="#2563eb" />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// // ----------- Styles ----------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     paddingTop: 50,
//     backgroundColor: "#fff",
//     elevation: 2,
//     justifyContent: "space-between",
//   },

//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#2563eb",
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 14,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     elevation: 2,
//   },

//   name: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#111",
//   },

//   email: {
//     fontSize: 14,
//     marginTop: 3,
//     color: "#555",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../../api/api"; // <-- your axios instance

export default function ViewOtherAdminsScreen({ navigation }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all admins from backend
  const fetchAdmins = async () => {
    try {
      const { data } = await api.get("/auth/admin/get-all-admins");

      if (data.success && data.admins) {
        setAdmins(data.admins);
      }
    } catch (err) {
      console.log("Fetch Admins Error:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <View style={styles.container}>
      {/* ----------- Header ----------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Other Admins</Text>

        <View style={{ width: 26 }} /> 
      </View>

      {/* ----------- Loading ----------- */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{ marginTop: 40 }}
        />
      ) : admins.length === 0 ? (
        <Text style={styles.noData}>No admins found.</Text>
      ) : (
        <FlatList
          data={admins}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>

              <MaterialIcons
                name="admin-panel-settings"
                size={26}
                color="#2563eb"
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

/* ----------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563eb",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  email: {
    fontSize: 14,
    marginTop: 3,
    color: "#555",
  },

  noData: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});
