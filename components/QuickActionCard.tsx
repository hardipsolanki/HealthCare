import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuickActionCard = ({ item }: { item: any }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.quickCard,
        {
          backgroundColor: item.bg,
        },
      ]}
    >
      <View style={styles.quickIconWrapper}>
        <Ionicons name={item.icon} size={22} color={item.iconColor} />
      </View>

      <Text style={styles.quickTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default QuickActionCard;

const styles = StyleSheet.create({
  quickCard: {
    width: "23%",
    borderRadius: 22,
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 8,
  },

  quickIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  quickTitle: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPrimary,
    lineHeight: 17,
  },
});
