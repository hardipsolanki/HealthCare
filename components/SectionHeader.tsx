import { COLORS } from "@/theme/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <TouchableOpacity>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 15,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  viewAll: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});
