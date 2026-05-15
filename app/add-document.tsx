import React, { useEffect, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

import { LinearGradient } from "expo-linear-gradient";

import CustomButton from "@/components/Button";
import CustomInput from "@/components/Input";

import { TEXTS } from "@/constant/texts";

import { COLORS } from "@/theme/colors";

import { ROUTES_PATH } from "@/constant";

import { formatFileSize } from "@/helpers/formatSize";

import { generateSlug } from "@/helpers/generateSlug";

import { pickFile } from "@/helpers/pickFile";

import { ImageFile } from "@/types";

const documentTypeItems = [
  { label: "Family", value: "family" },

  { label: "Medical Document", value: "medical_document" },

  { label: "Prescription", value: "medication" },

  { label: "Insurance", value: "insurance" },

  { label: "Lab Report", value: "other" },
];

type FormValues = {
  documentType: string;

  file: ImageFile | null;

  fileName: string;
};

type FileType = "camera" | "gallery" | "document";

const AddDocument = () => {
  const router = useRouter();

  const params = useLocalSearchParams();

  const upcomingFile: ImageFile = params.file
    ? JSON.parse(params.file as string)
    : null;

  const type = (params.type as FileType) || "document";
  const [selectedFile, setSelectedFile] = useState<ImageFile | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      documentType: "",
      file: null,
      fileName: "",
    },
  });

  useEffect(() => {
    if (upcomingFile) {
      updateSelectedFile(upcomingFile);
    }
  }, []);

  const watchedFileName = watch("fileName");

  // ================= UPDATE FILE STATE =================

  const updateSelectedFile = (file: ImageFile) => {
    const { uri, name, type, size } = file;

    const updatedFile = {
      uri,
      name,
      type,
      size,
    };

    setSelectedFile(updatedFile);

    setValue("file", updatedFile, {
      shouldValidate: true,
    });

    setValue("fileName", updatedFile.name);
  };

  // ================= PICK / REPLACE FILE =================

  const handleReplaceFile = async () => {
    try {
      if (type === "camera") {
        router.replace(ROUTES_PATH.Camera);
        return;
      }
      const file = await pickFile({ type });

      if (!file) {
        return;
      }

      updateSelectedFile(file);
    } catch (error) {
      console.log("Error while replacing file:", error);

      Toast.show({
        type: "error",
        text1: "Failed to replace file",
      });
    }
  };

  // ================= REMOVE FILE =================

  const removeFile = () => {
    setSelectedFile(null);

    reset({
      documentType: "",
      file: null,
      fileName: "",
    });
  };

  // ================= SUBMIT =================

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    reset();

    setSelectedFile(null);

    const updatedData = {
      ...data.file,
      name: data.fileName || data.file?.name,
    };

    router.replace({
      pathname: ROUTES_PATH.UploadingDocument,
      params: {
        file: JSON.stringify({
          ...updatedData,
          name: generateSlug(updatedData.name || ""),
        }),

        documentType: data.documentType,
      },
    });
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Upload Document</Text>

          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: COLORS.white }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* FILE CARD */}

            {selectedFile && (
              <View style={styles.fileCard}>
                <View style={styles.fileLeft}>
                  <View style={styles.pdfIcon}>
                    <Ionicons name="document-text" size={24} color="#fff" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={styles.fileName}>
                      {selectedFile.name}
                    </Text>

                    <Text style={styles.fileSize}>
                      {formatFileSize(selectedFile.size || 0)}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity onPress={removeFile}>
                  <Ionicons name="close" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            )}

            {/* TITLE */}

            <Text style={styles.sectionTitle}>Document Details</Text>

            {/* DOCUMENT NAME */}

            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Document Name</Text>

              <Controller
                control={control}
                name="fileName"
                rules={{
                  required: "Document name is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    placeholder="Blood Test Report"
                    value={value}
                    onChangeText={onChange}
                    err={errors.fileName?.message}
                  />
                )}
              />
            </View>

            {/* CATEGORY */}

            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Category</Text>

              <Controller
                control={control}
                name="documentType"
                rules={{
                  required: "Document type is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      style={styles.picker}
                      dropdownIconColor="#6B7280"
                    >
                      <Picker.Item label="Select Category" value="" />

                      {documentTypeItems.map((item) => (
                        <Picker.Item
                          key={item.value}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
              />
            </View>

            {errors.documentType && (
              <Text style={styles.errorText}>
                {errors.documentType.message}
              </Text>
            )}

            {/* REPLACE FILE */}

            <View style={styles.fieldWrapper}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.uploadBox}
                onPress={handleReplaceFile}
              >
                <LinearGradient
                  colors={["#2563EB", "#9333EA"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.uploadIconWrap}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={28}
                    color="#fff"
                  />
                </LinearGradient>

                <Text style={styles.uploadTitle}>Replace {type} File</Text>

                <Text style={styles.uploadSubTitle}>
                  Tap here to select another file
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* BUTTON */}

        {selectedFile && (
          <View style={styles.buttonWrapper}>
            <LinearGradient
              colors={["#2563EB", "#9333EA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <CustomButton
                title={TEXTS.addDocument.uploadButton}
                onPress={handleSubmit(onSubmit)}
                disabled={!selectedFile || !watchedFileName}
              />
            </LinearGradient>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    color: COLORS.white,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },

  uploadBox: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    marginTop: 20,
  },

  uploadIconWrap: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  uploadTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  uploadSubTitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },

  fileCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  fileLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
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
    fontWeight: "600",
    color: "#111827",
  },

  fileSize: {
    marginTop: 4,
    fontSize: 12,
    color: "#9CA3AF",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 22,
  },

  fieldWrapper: {
    marginBottom: 22,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    height: 56,
    justifyContent: "center",
  },

  picker: {
    width: "100%",
    height: 56,
  },

  buttonWrapper: {
    padding: 16,
    backgroundColor: COLORS.white,
  },

  gradientButton: {
    borderRadius: 16,
    overflow: "hidden",
  },

  errorText: {
    marginTop: -12,
    marginBottom: 16,
    color: "#EF4444",
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
  },
});
