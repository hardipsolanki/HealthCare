import { COLORS } from "@/theme/colors";
import { DocumentItemType } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DocumentCardProps {
  item: DocumentItemType;
}

const DocumentCard = ({ item }: DocumentCardProps) => {
  const isPdf = item.type === "PDF";

  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.fileIconContainer}>
          {isPdf ? (
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={34}
              color={COLORS.red}
            />
          ) : (
            <Ionicons name="image" size={28} color="#4A90E2" />
          )}
        </View>

        <View style={styles.cardContent}>
          <Text numberOfLines={1} style={styles.documentTitle}>
            {item.title}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{item.date}</Text>

            <View style={styles.dot} />

            <Text style={styles.metaText}>{item.type}</Text>

            <View style={styles.dot} />

            <Text style={styles.metaText}>{item.size}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={18} color={COLORS.subText} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DocumentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,

    elevation: 2,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  fileIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },

  cardContent: {
    marginLeft: 14,
    flex: 1,
  },

  documentTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  metaText: {
    fontSize: 12,
    color: COLORS.subText,
    fontWeight: "500",
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C7C7CC",
    marginHorizontal: 8,
  },

  moreButton: {
    marginLeft: 12,
    padding: 4,
  },
});
