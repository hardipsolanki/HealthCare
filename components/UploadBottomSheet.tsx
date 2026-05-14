// components/bottomSheet/UploadBottomSheet.tsx

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { ROUTES_PATH } from "@/constant";
import { TEXTS } from "@/constant/texts";
import { COLORS } from "@/theme/colors";
import { useRouter } from "expo-router";

const uploadOptions = [
  {
    id: 1,
    title: TEXTS.uploadDocument.camera,
    desc: TEXTS.uploadDocument.cameraDesc,
    icon: "camera",
    color: "#7C3AED",
    bg: "#F3E8FF",
  },

  {
    id: 3,
    title: TEXTS.uploadDocument.pdf,
    desc: TEXTS.uploadDocument.pdfDesc,
    icon: "document-text",
    color: "#EF4444",
    bg: "#FEE2E2",
    link: ROUTES_PATH.AddDocument,
  },

  {
    id: 4,
    title: TEXTS.uploadDocument.files,
    desc: TEXTS.uploadDocument.filesDesc,
    icon: "folder",
    color: "#2563EB",
    bg: "#DBEAFE",
  },
];

const UploadBottomSheet = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* TITLE */}

      <Text style={styles.title}>{TEXTS.uploadDocument.title}</Text>

      <Text style={styles.subTitle}>{TEXTS.uploadDocument.subTitle}</Text>

      {/* OPTIONS */}

      <View style={styles.optionContainer}>
        {uploadOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.optionCard}
            onPress={() => {
              router.push(item.link || ROUTES_PATH.AddDocument);
              onClose();
            }}
          >
            {/* LEFT */}

            <View style={styles.leftContent}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: item.bg,
                  },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>

              <View style={{ marginLeft: 14 }}>
                <Text style={styles.optionTitle}>{item.title}</Text>

                <Text style={styles.optionDesc}>{item.desc}</Text>
              </View>
            </View>

            {/* RIGHT */}

            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default UploadBottomSheet;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  subTitle: {
    marginTop: 8,

    color: COLORS.textSecondary,

    fontSize: 14,
  },

  optionContainer: {
    marginTop: 24,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    borderRadius: 20,

    overflow: "hidden",
  },

  optionCard: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 10,

    paddingVertical: 10,

    borderBottomWidth: 1,

    borderBottomColor: "#F3F4F6",
  },

  leftContent: {
    flexDirection: "row",

    alignItems: "center",
  },

  iconContainer: {
    width: 52,

    height: 52,

    borderRadius: 16,

    justifyContent: "center",

    alignItems: "center",
  },

  optionTitle: {
    fontSize: 16,

    fontWeight: "600",

    color: COLORS.textPrimary,
  },

  optionDesc: {
    marginTop: 4,

    fontSize: 13,

    color: COLORS.textSecondary,
  },
});
