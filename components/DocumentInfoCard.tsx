// components/DocumentInfoCard.tsx

import { COLORS } from "@/theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import React from "react";

import { StyleSheet, Text, View } from "react-native";

type Props = {
  data: {
    fileName: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
    userId: string;
    documentType: string;
  };
};

const formatFileSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);

  return `${mb.toFixed(1)} MB`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DocumentInfoCard = ({ data }: Props) => {
  const isPdf = data.fileType.includes("pdf");

  return (
    <View style={styles.card}>
      {/* TOP */}
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          {isPdf ? (
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={46}
              color={COLORS.red}
            />
          ) : (
            <Ionicons name="image" size={42} color="#4A90E2" />
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.fileName}>
            {data.fileName}
          </Text>

          <Text style={styles.fileMeta}>
            {formatFileSize(data.fileSize)} • {isPdf ? "PDF" : "IMAGE"}
          </Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* BOTTOM */}
      <View style={styles.bottomSection}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Date</Text>

          <Text style={styles.value}>{formatDate(data.createdAt)}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Uploaded By</Text>

          <Text style={styles.value}>You</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Category</Text>

          <Text style={styles.value}>{data.documentType}</Text>
        </View>
      </View>
    </View>
  );
};

export default DocumentInfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  topSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#FAFAFA",

    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },

  fileName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  fileMeta: {
    fontSize: 14,
    color: COLORS.subText,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#EFEFF4",
    marginVertical: 18,
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoItem: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: COLORS.subText,
    fontWeight: "600",
    marginBottom: 6,
  },

  value: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "700",
  },
});
