
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width - 40;

const IS_MAINTENANCE_MODE = true; 

export default function DataAnalysisScreen({ navigation }) {
  const [activeChart, setActiveChart] = useState("sales");

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#2563eb",
    },
  };

  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [220, 280, 210, 300, 250, 400, 380],
      },
    ],
  };

  const storeData = {
    labels: ["Store A", "Store B", "Store C", "Store D"],
    datasets: [
      {
        data: [90, 70, 80, 60],
      },
    ],
  };

   const handleRefresh = () => {
      console.log("Attempting refresh...");
      alert("Sorry , Not maintained")
    };
  
    if (IS_MAINTENANCE_MODE) {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>System Status</Text>
                <View style={{ width: 26 }} /> 
            </View>
    
            <View style={styles.maintenanceContainer}>
              <MaterialIcons 
                name="build" 
                size={80} 
                color="#f59e0b" 
                style={styles.maintenanceIcon}
              />
              <Text style={styles.maintenanceTitle}>
                System Under Maintenance
              </Text>
              <Text style={styles.maintenanceMessage}>
                We're currently performing scheduled maintenance to improve system performance and add new features.
              </Text>
              <Text style={styles.maintenanceDetail}>
                Estimated downtime: **2 hours**
                <Text style={{ fontWeight: '700', color: '#dc2626' }}> (Expected back at 1:00 AM IST)</Text>
              </Text>
              
              <TouchableOpacity 
                style={styles.refreshButton}
                onPress={handleRefresh}
              >
                <MaterialIcons name="refresh" size={20} color="#fff" />
                <Text style={styles.refreshButtonText}>Check Status Now</Text>
              </TouchableOpacity>
    
            </View>
          </View>
        );
      }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Analysis</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Scroll Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Overview Cards */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <MaterialIcons name="bar-chart" size={28} color="#2563eb" />
            <Text style={styles.cardValue}>₹12,450</Text>
            <Text style={styles.cardLabel}>Total Sales</Text>
          </View>
          <View style={styles.card}>
            <MaterialIcons name="store" size={28} color="#2563eb" />
            <Text style={styles.cardValue}>48</Text>
            <Text style={styles.cardLabel}>Active Stores</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <MaterialIcons name="people" size={28} color="#2563eb" />
            <Text style={styles.cardValue}>126</Text>
            <Text style={styles.cardLabel}>Store Managers</Text>
          </View>
          <View style={styles.card}>
            <MaterialIcons name="trending-up" size={28} color="#2563eb" />
            <Text style={styles.cardValue}>+12%</Text>
            <Text style={styles.cardLabel}>Weekly Growth</Text>
          </View>
        </View>

        {/* Chart Switcher */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeChart === "sales" && styles.activeToggle,
            ]}
            onPress={() => setActiveChart("sales")}
          >
            <Text
              style={[
                styles.toggleText,
                activeChart === "sales" && styles.activeText,
              ]}
            >
              Sales Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeChart === "stores" && styles.activeToggle,
            ]}
            onPress={() => setActiveChart("stores")}
          >
            <Text
              style={[
                styles.toggleText,
                activeChart === "stores" && styles.activeText,
              ]}
            >
              Store Performance
            </Text>
          </TouchableOpacity>
        </View>

        {/* Charts */}
        <View style={styles.chartContainer}>
          {activeChart === "sales" ? (
            <LineChart
              data={salesData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
            />
          ) : (
            <BarChart
              data={storeData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              style={styles.chartStyle}
            />
          )}
        </View>

        {/* Insights */}
        <View style={styles.insightBox}>
          <MaterialIcons name="insights" size={22} color="#2563eb" />
          <Text style={styles.insightText}>
            Sales peaked on Saturday — consistent with the last 3 weeks. Store A
            continues to outperform others, contributing 32% of total revenue.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

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
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
  },
  
  maintenanceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  maintenanceIcon: {
    marginBottom: 20,
    backgroundColor: '#fffbe5', 
    padding: 15,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fcd34d',
  },
  maintenanceTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#b45309", 
    marginBottom: 10,
    textAlign: 'center',
  },
  maintenanceMessage: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  maintenanceDetail: {
    fontSize: 14,
    color: "#dc2626", 
    textAlign: "center",
    marginBottom: 30,
    fontWeight: '500'
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
  },
  cardLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeToggle: {
    backgroundColor: "#2563eb",
  },
  toggleText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  chartStyle: {
    borderRadius: 16,
  },
  insightBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#eff6ff",
    padding: 14,
    borderRadius: 12,
    marginTop: 25,
  },
  insightText: {
    color: "#1e3a8a",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});
