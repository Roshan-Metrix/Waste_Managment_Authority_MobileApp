import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import { SidebarMenu } from "../Components/SidebarMenu";
import { getTodayTransaction, clearOldTransaction } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../api/api'

export default function UserScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    setRole(user?.role || "User");
  }, [user]);


useEffect(() => {
  const addStoreId = async () => {
    if (user?.role === "manager") {
      try {
        const res = await api.get("/auth/manager/profile");
        if (res.data.success) {
          await AsyncStorage.setItem("storeId", res.data.store.storeId);
        }
      } catch (error) {
        console.log("Manager Profile Fetch Error:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  addStoreId();
}, [user]);


  // const goToTransaction = async () => {
  //   try {

  //     const today = new Date().toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }).split(",")[0];

  //     const data = await getTodayTransaction();

  //     if (!data || data === "null" || data === "undefined") {
  //       await clearOldTransaction();
  //       return navigation.navigate("AddTransactionScreen");
  //     }
  //     let parsed = null;
  //     try {
  //       parsed = typeof data === "string" ? JSON.parse(data) : data;
  //     } catch (err) {
  //       console.log("JSON Parse failed -> clearing storage");
  //       await clearOldTransaction();
  //       return navigation.navigate("AddTransactionScreen");
  //     }
  //     const storedDate = parsed?.date;
  //     const storedId = parsed?.transactionId;

  //     console.log("Stored date:", storedDate, "Today:", today);

  //     if (storedDate === today && storedId) {
  //       return navigation.navigate("ProcessTransactionScreen", {
  //         transactionId: storedId,
  //       });
  //     }

  //     await clearOldTransaction();
  //     navigation.navigate("AddTransactionScreen");

  //   } catch (error) {
  //     console.log("goToTransaction Error:", error);
  //     navigation.navigate("AddTransactionScreen");
  //   }
  // };

  const roleBoxes = {
    admin: [
      { title: "Add Store", icon: "store", screen: "AddStoreScreen" },
      {
        title: "Manage Stores",
        icon: "storefront",
        screen: "ManageStoresScreen",
      },
      {
        title: "Manage Admins",
        icon: "manage-accounts",
        screen: "ManageAdminScreen",
      },
      {
        title: "Manage Managers",
        icon: "supervisor-account",
        screen: "ManageManagerScreen",
      },
      {
        title: "Notify Stores",
        icon: "notifications",
        screen: "NotifyStoresScreen",
      },
      {
        title: "Data Analysis",
        icon: "query-stats",
        screen: "DataAnalysisScreen",
      },
    ],

    manager: [
      {
        title: "Process Transaction",
        icon: "account-balance",
        // screen: "AddTransactionScreen",
        screen: "AddProceedTransactionScreen",
      },
      {
        title: "Manage Data",
        icon: "folder",
        screen: "ManageDataScreen",
      },
      {
        title: "Manage Managers",
        icon: "supervisor-account",
        screen: "ManageOwnStoreManagersScreen",
      },
      { title: "View Tasks", icon: "assignment", screen: "ViewTasksScreen" },
    ],
  };

  const optionalFeatures = [
    { title: "Profile", icon: "person", screen: "ProfileScreen" },
  ];

  const features = [...(roleBoxes[role] || []), ...optionalFeatures];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={["#1e3a8a", "#2563eb"]} style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <MaterialIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.userContainer}>
          {/* <MaterialIcons name="account-circle" size={45} color="#fff" /> */}
          <Text style={styles.welcomeText}>
            Welcome, {user?.name || "User"}
          </Text>
        </View>
      </LinearGradient>

      {/* SIDEBAR */}
      <SidebarMenu
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        role={role}
        user={user}
        navigation={navigation}
        logout={logout}
      />

      {/* FEATURE BOXES */}
      <ScrollView contentContainerStyle={styles.featuresContainer}>
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureBox}
            onPress={() =>
              typeof item.screen === "function"
                ? item.screen()
                : navigation.navigate(item.screen)
            }
          >
            <View style={styles.iconCircle}>
              <MaterialIcons name={item.icon} size={32} color="#2563eb" />
            </View>
            <Text style={styles.featureTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  welcomeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  featuresContainer: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  featureBox: {
    width: "48%",
    backgroundColor: "#fff",
    paddingVertical: 25,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  iconCircle: {
    backgroundColor: "#e0e7ff",
    padding: 15,
    borderRadius: 50,
    marginBottom: 12,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
  },
});
