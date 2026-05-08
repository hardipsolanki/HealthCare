import { COLORS } from "@/theme/colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
}: ButtonProps) => {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.touchable, isDisabled && styles.disabledContainer]}
    >
      <LinearGradient
        colors={
          isDisabled
            ? [COLORS.primary + "99", COLORS.secondary + "99"]
            : [COLORS.secondary, COLORS.primary]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 14,
    overflow: "hidden",
  },

  disabledContainer: {
    opacity: 0.9,
  },

  button: {
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
