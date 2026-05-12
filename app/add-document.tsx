// app/add-document.tsx

import CustomButton from "@/components/Button";
import { ROUTES_PATH } from "@/constant";
import { TEXTS } from "@/constant/texts";
import { useAddDocument } from "@/hooks/mutations/useAddDocument";
import { COLORS } from "@/theme/colors";
import { AddDocumentInput, ApiError, ImageFile } from "@/types";

import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import * as DocumentPicker from "expo-document-picker";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

import React, { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";

const documentTypeItems = [
  { label: "Family", value: "family" },

  { label: "Medical Document", value: "medical_document" },

  { label: "Prescription", value: "medication" },

  { label: "Insurance", value: "insurance" },

  { label: "Lab Report", value: "other" },
];

const AddDocument = () => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const { mutate: addDocument, isPending } = useAddDocument();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{ documentType: string; file: ImageFile | null }>({
    defaultValues: {
      documentType: "",
      file: null,
    },
  });

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],

      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const pickedFile = result.assets[0];

      const fileData: ImageFile = {
        uri: pickedFile.uri,
        name: pickedFile.name,
        type:
          pickedFile.mimeType ||
          (pickedFile.name.endsWith(".pdf") ? "application/pdf" : "image/jpeg"),
      };

      setSelectedFile(fileData.name);

      setValue("file", fileData, {
        shouldValidate: true,
      });
    }
  };

  const onSubmit: SubmitHandler<{
    documentType: string;
    file: ImageFile | null;
  }> = (data) => {
    if (!data.file) {
      Toast.show({
        type: "error",
        text1: "Please select file",
      });

      return;
    }

    addDocument(data as AddDocumentInput, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Document uploaded",
        });

        reset();

        setSelectedFile(null);

        router.push(ROUTES_PATH.Index);
      },

      onError: (error: ApiError) => {
        console.log("Error while add document: ", error?.data?.message);

        Toast.show({
          type: "error",
          text1: error?.data?.message || "Upload failed",
        });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[COLORS.primary, "#6D4BEF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.headerIcon}>
          <Ionicons name="document-text" size={42} color={COLORS.primary} />
        </View>

        <Text style={styles.headerTitle}>{TEXTS.addDocument.title}</Text>

        <Text style={styles.headerSubTitle}>{TEXTS.addDocument.subTitle}</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.label}>{TEXTS.addDocument.documentType}</Text>

        <Controller
          control={control}
          name="documentType"
          rules={{
            required: "Document type is required",
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={styles.picker}
                dropdownIconColor={COLORS.primary}
              >
                <Picker.Item label="Select document type" value="" />

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

        {errors.documentType && (
          <Text style={styles.errorText}>{errors.documentType.message}</Text>
        )}

        <Text style={styles.label}>{TEXTS.addDocument.uploadFile}</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.fileContainer}
          onPress={pickFile}
        >
          <View style={styles.fileLeft}>
            <View style={styles.fileIconBox}>
              <Ionicons
                name="document-attach"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.fileTitle}>
                {selectedFile || TEXTS.addDocument.chooseFile}
              </Text>

              <Text style={styles.fileSubTitle}>
                {TEXTS.addDocument.fileSupportText}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={22} color={COLORS.textMuted} />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={TEXTS.addDocument.uploadButton}
            onPress={handleSubmit(onSubmit)}
            disabled={!selectedFile || isPending}
            loading={isPending}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddDocument;

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  header: {
    height: "32%",
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 18,
    left: 16,
    zIndex: 10,
    padding: 6,
  },

  headerIcon: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "700",
  },

  headerSubTitle: {
    color: "#E9DFFF",
    marginTop: 8,
    fontSize: 14,
  },

  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -25,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    padding: 22,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginTop: 20,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },

  picker: {
    height: 58,
    width: "100%",
  },

  errorText: {
    color: "#EF4444",
    marginTop: 8,
    fontSize: 13,
  },

  fileContainer: {
    height: 82,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  fileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  fileIconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#F3EEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  fileTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  fileSubTitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 22,
    right: 22,
  },
});
