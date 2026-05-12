// components/DocumentQuickActions.tsx

import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";

import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const actions = [
  {
    id: "1",
    title: "Share",
    icon: "share-social-outline",
    color: "#7F5AF0",
  },

  {
    id: "2",
    title: "Download",
    icon: "download-outline",
    color: "#2563EB",
  },

  {
    id: "3",
    title: "Favorite",
    icon: "star-outline",
    color: "#F59E0B",
  },

  {
    id: "4",
    title: "Delete",
    icon: "trash-outline",
    color: "#EF4444",
  },
];

const DocumentQuickActions = () => {
  return (
    <View style={styles.container}>
      {actions.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={styles.actionButton}
          >
            <Ionicons name={item.icon as any} size={24} color={item.color} />

            <Text style={styles.actionText}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DocumentQuickActions;

const styles = StyleSheet.create({
  container: {
    marginTop: 36,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {
    width: 78,
    height: 92,

    backgroundColor: COLORS.white,
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  actionText: {
    marginTop: 10,

    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
});
