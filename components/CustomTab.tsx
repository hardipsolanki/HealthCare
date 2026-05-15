import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const TabItem = ({
  icon,
  label,
  focused,
}: {
  icon: string;
  label: string;
  focused: boolean;
}) => {
  return (
    <View style={styles.tabItem}>
      <Ionicons
        name={icon as any}
        size={24}
        color={focused ? COLORS.primary : COLORS.tabs}
      />

      <Text
        style={[
          styles.label,
          {
            color: focused ? COLORS.primary : COLORS.tabs,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const CenterButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.centerButtonContainer}
    >
      <View style={styles.centerButton}>
        <Ionicons name="add" size={34} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export { CenterButton, TabItem };

const styles = StyleSheet.create({
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
  },

  centerButtonContainer: {
    top: -25,
    justifyContent: "center",
    alignItems: "center",
  },

  centerButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },
});
