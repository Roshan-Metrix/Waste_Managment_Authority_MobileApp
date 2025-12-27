import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function NoInternetScreen({ visible }) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Animated.View style={[styles.overlay, { opacity: fade }]}>
        <View style={styles.card}>
          <MaterialIcons name="wifi-off" size={80} color="#ef4444" />
          <Text style={styles.title}>No Internet Connection</Text>
          <Text style={styles.subtitle}>
            Please check your network and try again.
          </Text>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 16,
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
    color: "#6b7280",
    lineHeight: 22,
  },
});
