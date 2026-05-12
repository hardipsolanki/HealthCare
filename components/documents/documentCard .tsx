import { COLORS } from "@/theme/colors";
import { DocumentItem } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DocumentCardProps = {
  item: DocumentItem;
  onPress?: () => void;
  onMorePress?: () => void;
};

const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 KB";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;

  return `${mb.toFixed(1)} MB`;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status: DocumentItem["ocrStatus"]) => {
  switch (status) {
    case "completed":
      return "#22C55E";

    case "pending":
      return "#F59E0B";

    case "failed":
      return COLORS.red;

    default:
      return COLORS.subText;
  }
};

const DocumentCard = ({ item, onPress, onMorePress }: DocumentCardProps) => {
  const isPdf =
    item.fileType?.includes("pdf") ||
    item.fileName?.toLowerCase().endsWith(".pdf");

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      {/* LEFT */}
      <View style={styles.cardLeft}>
        {/* FILE ICON */}
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

        {/* CONTENT */}
        <View style={styles.cardContent}>
          {/* FILE NAME */}
          <Text numberOfLines={1} style={styles.documentTitle}>
            {item.fileName}
          </Text>

          {/* META INFO */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{formatDate(item.createdAt)}</Text>

            <View style={styles.dot} />

            <Text style={styles.metaText}>{formatFileSize(item.fileSize)}</Text>

            <View style={styles.dot} />

            <Text style={styles.metaText}>{item.documentType}</Text>
          </View>

          {/* EXTRA INFO */}
          <View style={styles.bottomRow}>
            {/* OCR STATUS */}
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: getStatusColor(item.ocrStatus),
                  },
                ]}
              />

              <Text
                style={[
                  styles.statusText,
                  {
                    color: getStatusColor(item.ocrStatus),
                  },
                ]}
              >
                {item.ocrStatus}
              </Text>
            </View>

            {/* HOSPITAL */}
            {!!item.hospitalName && (
              <Text numberOfLines={1} style={styles.hospitalText}>
                {item.hospitalName}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* MORE BUTTON */}
      <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
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
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  fileIconContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#FAFAFA",

    justifyContent: "center",
    alignItems: "center",
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
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
    borderRadius: 999,
    backgroundColor: "#C7C7CC",
    marginHorizontal: 8,
  },

  bottomRow: {
    marginTop: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginRight: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  hospitalText: {
    flex: 1,
    marginLeft: 12,

    fontSize: 12,
    color: COLORS.subText,
    fontWeight: "500",

    textAlign: "right",
  },

  moreButton: {
    marginLeft: 12,
    padding: 4,
  },
});
