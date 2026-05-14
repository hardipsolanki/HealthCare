import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const SummaryCard = ({ item }: { item: any }) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryIcon}>
        <Ionicons name={item.icon} size={20} color={item.color} />
      </View>

      <Text style={styles.summaryTitle}>{item.title}</Text>

      <Text style={styles.summaryValue}>{item.value}</Text>

      {item.subValue && (
        <Text style={styles.summarySubValue}>{item.subValue}</Text>
      )}
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  summaryCard: {
    width: "31%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,

    elevation: 1,
  },

  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryTitle: {
    marginTop: 9,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  summaryValue: {
    marginTop: 5,
    // fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  summarySubValue: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.textMuted,
  },
});
