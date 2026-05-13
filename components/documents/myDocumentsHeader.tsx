import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = ({ onOpenFilter }: any) => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientContainer}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Documents</Text>

        <View style={styles.headerRight}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={22} color={COLORS.white} />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.iconButton} onPress={onOpenFilter}>
            <Ionicons name="funnel-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  gradientContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "700",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginLeft: 14,
  },

  indicator: {
    backgroundColor: COLORS.textMuted,
    width: 50,
    height: 5,
  },

  bottomSheetBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  sheetContent: {
    flex: 1,
    paddingBottom: 20,
  },
});
