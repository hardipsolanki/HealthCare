import { Ionicons } from "@expo/vector-icons";

import React from "react";

import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/theme/colors";

type LogoutModalProps = {
  visible: boolean;

  onClose: () => void;

  onPress: () => void;
  isLoading: boolean;
  actionBtnName: string;
  text: string;
};

const CustomModal = ({
  visible,
  onClose,
  onPress,
  isLoading,
  actionBtnName,
  text,
}: LogoutModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* ICON */}

          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="log-out-outline"
                size={34}
                color={COLORS.secondary}
              />
            </View>
          </View>

          {/* TITLE */}

          <Text style={styles.title}>{actionBtnName}</Text>

          {/* DESCRIPTION */}

          <Text style={styles.description}>{text}</Text>

          {/* LOGOUT BUTTON */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logoutButton}
            onPress={onPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={styles.logoutText}>{actionBtnName}</Text>
            )}
          </TouchableOpacity>

          {/* CANCEL BUTTON */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.25)",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 24,
  },

  modalContainer: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 28,

    paddingHorizontal: 22,

    paddingTop: 28,

    paddingBottom: 22,

    alignItems: "center",
  },

  iconContainer: {
    marginBottom: 18,
  },

  iconCircle: {
    width: 82,

    height: 82,

    borderRadius: 100,

    backgroundColor: "#FFE8EF",

    justifyContent: "center",

    alignItems: "center",
  },

  title: {
    fontSize: 24,

    fontWeight: "700",

    color: COLORS.textPrimary,

    marginBottom: 10,
  },

  description: {
    fontSize: 14,

    color: COLORS.textSecondary,

    textAlign: "center",

    lineHeight: 22,

    marginBottom: 26,
  },

  logoutButton: {
    width: "100%",

    height: 52,

    borderRadius: 14,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 14,
  },

  logoutText: {
    color: COLORS.white,

    fontSize: 16,

    fontWeight: "700",
  },

  cancelButton: {
    width: "100%",

    height: 52,

    borderRadius: 14,

    backgroundColor: "#F3F4F6",

    justifyContent: "center",

    alignItems: "center",
  },

  cancelText: {
    color: COLORS.textPrimary,

    fontSize: 16,

    fontWeight: "600",
  },
});
