// app/uploading-document.tsx

import React, { useEffect, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Svg, { Circle } from "react-native-svg";

import CustomModal from "@/components/LogoutModal";
import { ROUTES_PATH } from "@/constant";
import { useAddDocument } from "@/hooks/mutations/useAddDocument";
import { ApiError, ImageFile } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

type UploadingDocParams = {
  documentType: string;
  file: string;
};

const CIRCLE_SIZE = 190;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const UploadingDocument = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    mutate: addDocument,
    isPending,
    abortControllerRef,
  } = useAddDocument();
  const data = useLocalSearchParams<UploadingDocParams>();
  const file: ImageFile = data?.file ? JSON.parse(data.file as string) : null;
  const documentType = data?.documentType || "";
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    let progress = 0;

    setUploadProgress(0);

    const interval = setInterval(() => {
      progress += 10;

      // stop at 90 until API success
      if (progress >= 90) {
        clearInterval(interval);
        return;
      }

      setUploadProgress(progress);
    }, 200);

    addDocument(
      {
        documentType,
        file,
      },
      {
        onSuccess: (data: any) => {
          clearInterval(interval);

          setUploadProgress(100);

          Toast.show({
            type: "success",
            text1: "Document uploaded successfully",
          });

          setTimeout(() => {
            router.replace({
              pathname: ROUTES_PATH.UploadDocSuccess,
              params: {
                documentType,
                fileName: file.name,
                size: file.size,
                id: data.data.data.id,
              },
            });
          }, 500);
        },

        onError: (error: ApiError) => {
          console.log({ error });
          clearInterval(interval);

          setUploadProgress(0);

          Toast.show({
            type: "error",
            text1: error?.data?.message || "Upload failed",
          });
        },
      },
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const router = useRouter();
  const progressValue = uploadProgress || 0;

  const strokeDashoffset =
    CIRCUMFERENCE - (+progressValue / 100) * CIRCUMFERENCE;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.8}
          onPress={() => {
            if (isPending) {
              setIsModelOpen(true);
            } else {
              router.back();
            }
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Uploading Document</Text>

        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.8}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#111827"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* PROGRESS RING */}
        <View style={styles.progressSection}>
          <View style={styles.ringWrap}>
            <Svg
              width={CIRCLE_SIZE}
              height={CIRCLE_SIZE}
              viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
            >
              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke="#EDE9FE"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke="url(#progressGradient)"
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                originX={CIRCLE_SIZE / 2}
                originY={CIRCLE_SIZE / 2}
              />

              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke="transparent"
                fill="none"
              />

              <LinearGradient
                colors={["#2563EB", "#7C3AED"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Svg>

            <View style={styles.centerText}>
              <Text style={styles.progressPercent}>
                {progressValue}
                <Text style={styles.progressPercentSmall}>%</Text>
              </Text>
            </View>

            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <Svg
                width={CIRCLE_SIZE}
                height={CIRCLE_SIZE}
                viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
              >
                <Circle
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={RADIUS}
                  stroke="#EDE9FE"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                />
                <Circle
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={RADIUS}
                  stroke="#5B5FEF"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  originX={CIRCLE_SIZE / 2}
                  originY={CIRCLE_SIZE / 2}
                />
              </Svg>
            </View>
          </View>

          <Text style={styles.uploadingTitle}>Uploading your document...</Text>

          <Text style={styles.uploadingSubTitle}>
            Please don&apos;t close the app or go back.
          </Text>
        </View>

        {/* FILE CARD */}
        <View style={styles.fileCard}>
          <View style={styles.fileTopRow}>
            <View style={styles.fileLeft}>
              <View style={styles.pdfIcon}>
                <Ionicons name="document-text" size={24} color="#FFFFFF" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {}
                </Text>
                <Text style={styles.fileSize}>{file?.size}</Text>
              </View>
            </View>

            <Text style={styles.filePercent}>{progressValue}%</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${+progressValue}%`,
                },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressMeta}>{file?.size}</Text>

            <Text style={styles.progressMeta}>{progressValue}%</Text>
          </View>
        </View>

        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconWrap}>
            <Ionicons name="lock-closed-outline" size={22} color="#2563EB" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Your document is secure</Text>
            <Text style={styles.infoSubTitle}>
              We are uploading for your safety.
            </Text>
          </View>
        </View>

        {/* SMALL DETAIL ROW */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category</Text>
          <Text style={styles.detailValue}>{documentType}</Text>
        </View>
      </View>

      {isModelOpen && (
        <CustomModal
          visible={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          isLoading={false}
          actionBtnName="Yes"
          text={`Are you sure you want to\ncancel upload?`}
          onPress={() => {
            abortControllerRef.current?.abort();
            setIsModelOpen(false);
            router.back();
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default UploadingDocument;

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
    paddingTop: 24,
    paddingBottom: 24,
  },

  progressSection: {
    alignItems: "center",
    marginTop: 6,
    marginBottom: 24,
  },

  ringWrap: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  progressPercent: {
    fontSize: 40,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 46,
  },

  progressPercentSmall: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  uploadingTitle: {
    marginTop: 22,
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  uploadingSubTitle: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },

  fileCard: {
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

  fileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  fileLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  pdfIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  fileName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  fileSize: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },

  filePercent: {
    fontSize: 14,
    fontWeight: "800",
    color: "#5B5FEF",
  },

  progressBarBg: {
    height: 8,
    backgroundColor: "#E9E7FF",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#5B5FEF",
  },

  progressFooter: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressMeta: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  infoCard: {
    marginTop: 16,
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8E6FF",
  },

  infoIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  infoSubTitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 16,
  },

  detailRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  detailLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },

  detailValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "700",
  },
});
