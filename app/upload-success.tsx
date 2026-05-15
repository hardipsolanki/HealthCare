import React from "react";

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import CustomButton from "@/components/Button";
import { ROUTES_PATH } from "@/constant";

const formatDateTime = (value?: string) => {
  if (!value) {
    return new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

type UploadSuccessParams = {
  fileName: string;
  size: string;
  documentType: string;
  id: string;
};
const UploadSuccess = () => {
  const router = useRouter();

  const data = useLocalSearchParams<UploadSuccessParams>();

  const { fileName, size, documentType, id } = data;

  const handleViewDocument = () => {
    router.replace({
      pathname: ROUTES_PATH.DocumentDetails,
      params: {
        documentId: id,
      },
    });
  };

  const handleUploadAnother = () => {
    router.replace(ROUTES_PATH.AddDocument);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Success</Text>

        <View style={styles.headerBtn} />
      </View>

      <View style={styles.content}>
        <View style={styles.successWrap}>
          <View style={styles.confettiArea}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
            <View style={[styles.dot, styles.dot4]} />
            <View style={[styles.dot, styles.dot5]} />
            <View style={[styles.dot, styles.dot6]} />
            <View style={[styles.dot, styles.dot7]} />
            <View style={[styles.dot, styles.dot8]} />
            <View style={[styles.dot, styles.dot9]} />
            <View style={[styles.dot, styles.dot10]} />
            <View style={[styles.dot, styles.dot11]} />
            <View style={[styles.dot, styles.dot12]} />

            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={42} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.successTitle}>Upload Successful!</Text>

          <Text style={styles.successSubTitle}>
            Your document has been uploaded successfully.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fileRow}>
            <View style={styles.pdfIcon}>
              <Ionicons name="document-text" size={24} color="#FFFFFF" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.fileName} numberOfLines={1}>
                {fileName}
              </Text>

              <Text style={styles.fileSize}>{size}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="folder-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>{documentType}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <CustomButton onPress={handleViewDocument} title="View Document" />
          {/* <LinearGradient
            colors={["#2563EB", "#9333EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryGradient}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.primaryBtn}
              onPress={handleViewDocument}
            >
              <Text style={styles.primaryBtnText}>View Document</Text>
            </TouchableOpacity>
          </LinearGradient> */}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.secondaryBtn}
            onPress={handleUploadAnother}
          >
            <Text style={styles.secondaryBtnText}>Upload Another</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },

  headerBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 20,
  },

  successWrap: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 22,
  },

  confettiArea: {
    width: 170,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  successCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#22C55E",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  dot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  dot1: { top: 10, left: 58, backgroundColor: "#F59E0B" },
  dot2: { top: 18, right: 36, backgroundColor: "#3B82F6" },
  dot3: { top: 40, right: 12, backgroundColor: "#8B5CF6" },
  dot4: { top: 72, right: 4, backgroundColor: "#F97316" },
  dot5: { bottom: 28, right: 16, backgroundColor: "#EF4444" },
  dot6: { bottom: 12, right: 52, backgroundColor: "#14B8A6" },
  dot7: { bottom: 6, left: 62, backgroundColor: "#EC4899" },
  dot8: { bottom: 26, left: 18, backgroundColor: "#F59E0B" },
  dot9: { top: 70, left: 6, backgroundColor: "#10B981" },
  dot10: { top: 38, left: 16, backgroundColor: "#8B5CF6" },
  dot11: { top: 18, left: 36, backgroundColor: "#3B82F6" },
  dot12: { top: 48, left: 78, backgroundColor: "#F97316" },

  successTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  successSubTitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 18,
  },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  pdfIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  fileName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  fileSize: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  metaText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#4B5563",
  },

  actions: {
    marginTop: 22,
  },

  primaryGradient: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },

  primaryBtn: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  primaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  secondaryBtn: {
    marginTop: 12,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },

  secondaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
});
