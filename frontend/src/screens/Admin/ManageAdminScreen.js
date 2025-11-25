import React from "react";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView,
Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ManageAdminScreen({ navigation }) {

return (
 <View style={styles.container}>
 {/* Header */}
 <View style={styles.header}>
  <TouchableOpacity
  onPress={() => navigation.goBack()}
  style={styles.backButton}
  >
  <MaterialIcons name="arrow-back" size={26} color="#1d4ed8" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Admin Access Hub</Text>
  <View style={{ width: 26 }} />
 </View>

 {/* Content */}
 <ScrollView contentContainerStyle={styles.content}>
  <View style={styles.iconCircle}>
  <MaterialIcons name="supervisor-account" size={60} color="#1d4ed8" />
  </View>

  <Text style={styles.subTitle}>Administrator Control Panel</Text>
  <Text style={styles.desc}>
  Use this portal to manage and maintain the list of system administrators.
  You can add new admins or review existing accounts.
  </Text>

  {/* Action Buttons */}
  <View style={styles.actionsContainer}>
  <TouchableOpacity
   style={[styles.actionButton, styles.shadow, { backgroundColor: "#10b981" }]}
   onPress={() => navigation.navigate("AddAdminsScreen")}
  >
   <MaterialIcons name="person-add" size={24} color="#fff" />
   <Text style={styles.actionText} >Add New Admin</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
   style={[styles.actionButton, styles.shadow, { backgroundColor: "#3b82f6" }]}
   onPress={() => navigation.navigate("ViewOtherAdminsScreen")}
  >
   <MaterialIcons name="people" size={24} color="#fff" />
   <Text style={styles.actionText}>Review Active Admins</Text>
  </TouchableOpacity>

  </View>


  {/* Info Section */}
  <View style={styles.infoBox}>
  <MaterialIcons name="security" size={24} color="#1d4ed8" />
  <Text style={styles.infoText}>
   Note: Administrative privileges grant full control over user roles, access, and settings.
  </Text>
  </View>
 </ScrollView>
 </View>
);
}

const styles = StyleSheet.create({
container: {
 flex: 1,
 backgroundColor: "#f8fafc", 
},
// Reusable shadow style
shadow: {
 shadowColor: "#000",
 shadowOffset: {
 width: 0,
 height: 4,
 },
 shadowOpacity: 0.1,
 shadowRadius: 6,
 elevation: 8,
},
header: {
 flexDirection: "row",
 alignItems: "center",
 justifyContent: "space-between",
 paddingHorizontal: 20,
 paddingTop: Platform.OS === 'android' ? 50 : 60,
 paddingBottom: 15,
 backgroundColor: "#fff",
 borderBottomWidth: 1,
 borderBottomColor: '#e5e7eb',
 ...Platform.select({ ios: { zIndex: 10 }, default: { elevation: 3 } }),
},
backButton: {
 padding: 5,
},
headerTitle: {
 fontSize: 20,
 fontWeight: "700",
 color: "#1f2937", 
},
content: {
 paddingHorizontal: 25,
 paddingVertical: 40,
 alignItems: "center",
},
iconCircle: {
 backgroundColor: "#e0f2fe", 
 padding: 30,
 borderRadius: 120,
 marginBottom: 30,
 borderWidth: 2,
 borderColor: "#3b82f6", 
 ...Platform.select({ ios: { shadowColor: "#3b82f6", shadowOpacity: 0.2, shadowRadius: 10 } }), 
},
subTitle: {
 fontSize: 24,
 fontWeight: "700",
 color: "#1d4ed8", 
 marginBottom: 15,
},
desc: {
 fontSize: 16,
 textAlign: "center",
 color: "#6b7280", 
 marginBottom: 40,
 paddingHorizontal: 10,
 lineHeight: 24,
},
actionsContainer: {
 width: "100%",
 gap: 20,
},
actionButton: {
 flexDirection: "row",
 alignItems: "center",
 justifyContent: "center",
 paddingVertical: 18,
 borderRadius: 16,
 overflow: 'hidden', 
},
actionText: {
 color: "#fff",
 fontSize: 17,
 fontWeight: "700",
 marginLeft: 10,
},
infoBox: {
 flexDirection: "row",
 alignItems: "flex-start",
 backgroundColor: "#e0f2fe", 
 padding: 18,
 borderRadius: 16,
 marginTop: 50,
 borderWidth: 1,
 borderColor: "#3b82f6", 
 ...Platform.select({ ios: { shadowOpacity: 0.05, shadowRadius: 4 } }),
},
infoText: {
 color: "#1d4ed8", 
 fontSize: 14,
 marginLeft: 12,
 flex: 1,
 lineHeight: 20,
 fontWeight: "500",
},
});