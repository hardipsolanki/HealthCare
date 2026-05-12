// app/document-details.tsx

import DocumentInfoCard from "@/components/DocumentInfoCard";
import DocumentQuickActions from "@/components/DocumentQuickActions";
import { useDocument } from "@/hooks/queries/getDocument";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// const documentData = {
//   id: "1",
//   userId: "user_123",

//   documentType: "Pathology",

//   fileName: "Blood Test Report.pdf",

//   fileStoragePath: "/documents/report.pdf",

//   s3Bucket: "health-bucket",

//   s3Key: "documents/report.pdf",

//   fileType: "application/pdf",

//   fileSize: 2516582,

//   ocrStatus: "completed",

//   ocrExtractedText: "Routine blood test report from City Hospital.",

//   structuredExtractedData: null,

//   reportDate: "2024-05-20",

//   hospitalName: "City Hospital",

//   doctorName: "Dr. Sharma",

//   remarks: "Routine blood test report from City Hospital.",

//   softDelete: false,

//   deletedAt: null,

//   createdAt: "2024-05-20T10:00:00.000Z",

//   updatedAt: "2024-05-20T10:00:00.000Z",
// };

const DocumentDetails = () => {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const router = useRouter();
  if (!documentId) {
    return null;
  }
  const { data: documentData, isLoading } = useDocument(documentId);
  if (isLoading || !documentData) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        {/* LEFT */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* CENTER TITLE */}
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {documentData?.fileName}
          </Text>
        </View>

        {/* RIGHT ACTIONS */}
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="star-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* DOCUMENT CARD */}
        <DocumentInfoCard data={documentData} />

        {/* DESCRIPTION */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>

          <Text style={styles.descriptionText}>
            {documentData?.remarks || documentData?.ocrExtractedText}
          </Text>
        </View>

        {/* QUICK ACTIONS */}
        <DocumentQuickActions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 22,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 40,
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: "center",
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",

    maxWidth: "90%",
  },

  headerRight: {
    width: 60,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  headerIcon: {
    marginRight: 14,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    marginTop: -10,
  },

  descriptionContainer: {
    marginTop: 24,
  },

  descriptionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },

  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.subText,
    fontWeight: "500",
  },
});
