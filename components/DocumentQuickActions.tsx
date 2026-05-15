import React from "react";

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

import { useDeleteDocument } from "@/hooks/mutations/useDeleteDocument";

import { ROUTES_PATH } from "@/constant";
import { useDownloadDocument } from "@/hooks/mutations/useDownloadDocument";
import { COLORS } from "@/theme/colors";
import { Directory, File, Paths } from "expo-file-system";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";

type Props = {
  documentId: string;

  documentUrl: string;

  s3Key: string;

  documentType: string;

  fileName: string;
};

const DocumentQuickActions = ({
  documentId,
  documentUrl,
  s3Key,
  documentType,
  fileName,
}: Props) => {
  const { mutate: deleteDocument, isPending } = useDeleteDocument();
  const { mutateAsync: downloadDocument } = useDownloadDocument();
  const router = useRouter();

  /**
   * Download Document
   */

  const handleDownload = async () => {
    try {
      // Get signed URL from backend
      const res: any = await downloadDocument(s3Key);

      const url = res.data.data;

      // Create cache folder
      const destination = new Directory(Paths.cache, documentType);

      // Ensure folder exists
      destination.create({ idempotent: true });

      // Unique filename
      const uniqueName = `${Date.now()}-${fileName}`;

      // Create file path
      const file = new File(destination, uniqueName);

      // Download file
      const downloadedFile = await File.downloadFileAsync(url, file);

      Alert.alert("Download Complete ✓", `${fileName} downloaded successfully`);
    } catch (error) {
      console.error("Error while downloading file:", error);

      Alert.alert("Download Failed", "Unable to download document");
    }
  };

  /**
   * Share Document
   */
  const handleShare = async () => {
    try {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert("Sharing is not available");
        return;
      }

      const res: any = await downloadDocument(s3Key);

      const url = res.data.data;

      // Create unique filename
      const uniqueName = `${Date.now()}-${fileName}`;

      // Cache folder
      const destination = new Directory(Paths.cache, documentType);

      // Ensure directory exists
      destination.create({ idempotent: true });

      // Download file
      const file = new File(destination, uniqueName);

      const downloadedFile = await File.downloadFileAsync(url, file);

      // Share
      await Sharing.shareAsync(downloadedFile.uri);
    } catch (error) {
      console.log("Share Error:", error);
    }
  };

  /**
   * Delete
   */
  const handleDeleteDoc = () => {
    deleteDocument(documentId, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Document deleted successfully",
        });
        router.push(ROUTES_PATH.Documents);
      },
      onError: (error) => {
        console.log("error while document delete", error);
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Share */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.actionButton}
        onPress={handleShare}
      >
        <Ionicons name="share-social-outline" size={24} color="#7F5AF0" />

        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>

      {/* Download */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.actionButton}
        onPress={handleDownload}
      >
        <Ionicons name="download-outline" size={24} color="#2563EB" />

        <Text style={styles.actionText}>Download</Text>
      </TouchableOpacity>

      {/* Delete */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.actionButton}
        onPress={handleDeleteDoc}
        disabled={isPending}
      >
        <Ionicons name="trash-outline" size={24} color="#EF4444" />

        <Text style={styles.actionText}>
          {isPending ? "Deleting..." : "Delete"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentQuickActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  actionButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
});
