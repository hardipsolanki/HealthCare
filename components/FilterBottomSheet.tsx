// components/FilterBottomSheet/index.tsx

import React from "react";

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Controller, useForm } from "react-hook-form";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";

import { TEXTS } from "@/constant/texts";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "./Input";

/**
 * Types
 */
type SortByType = "createdAt" | "updatedAt" | "title";

type DocumentType = "prescription" | "report" | "invoice" | "other";

/**
 * IMPORTANT:
 * Backend expects MIME TYPES not extensions
 */
type FileType =
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "text/plain"
  | "application/document";

type FormValues = {
  search: string;

  title: string;

  createdBy: string;

  doctorName: string;

  hospitalName: string;

  fileName: string;

  documentType?: DocumentType;

  fileType?: FileType;

  sortBy: SortByType;

  orderBy: "asc" | "desc";
};

type Props = {
  onClose: () => void;

  onApply: (data: any) => void;
};

/**
 * Sort Options
 */
const sortOptions: SortByType[] = ["createdAt", "updatedAt", "title"];

/**
 * Document Types
 */
const documentTypeOptions: DocumentType[] = [
  "prescription",
  "report",
  "invoice",
  "other",
];

/**
 * File Types
 * label = UI display
 * value = API value
 */
const fileTypeOptions: {
  label: string;
  value: FileType;
}[] = [
  {
    label: "Pdf",
    value: "application/pdf",
  },
  {
    label: "Jpg / Jpeg",
    value: "image/jpeg",
  },
  {
    label: "Png",
    value: "image/png",
  },
  {
    label: "Text",
    value: "text/plain",
  },
  {
    label: "Doc",
    value: "application/document",
  },
];

/**
 * Dynamic Inputs
 */
const inputFields = [
  {
    label: "Search",
    name: "search",
    placeholder: "Search...",
  },

  {
    label: "Title",
    name: "title",
    placeholder: "Enter title",
  },

  {
    label: "Doctor Name",
    name: "doctorName",
    placeholder: "Enter doctor name",
  },

  {
    label: "Hospital Name",
    name: "hospitalName",
    placeholder: "Enter hospital name",
  },

  {
    label: "File Name",
    name: "fileName",
    placeholder: "Enter file name",
  },
] as const;

const FilterBottomSheet = ({ onClose, onApply }: Props) => {
  /**
   * React Hook Form
   */
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>(
    {
      defaultValues: {
        search: "",
        title: "",
        createdBy: "",
        doctorName: "",
        hospitalName: "",
        fileName: "",
        documentType: undefined,
        fileType: undefined,
        sortBy: "createdAt",
        orderBy: "desc",
      },
    },
  );

  /**
   * Submit
   */
  const onSubmit = (values: FormValues) => {
    onApply({
      filter: {
        createdBy: values.createdBy || undefined,

        doctorName: values.doctorName || undefined,

        documentType: values.documentType,

        fileName: values.fileName || undefined,

        /**
         * Now sending correct MIME TYPE
         */
        fileType: values.fileType,

        hospitalName: values.hospitalName || undefined,

        search: values.search || undefined,

        title: values.title || undefined,
      },

      sort: {
        sortBy: values.sortBy,

        orderBy: values.orderBy,
      },
    });

    onClose();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} barStyle="dark-content" />

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.filters.filter}</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => reset()}>
            <Text style={styles.resetText}>{TEXTS.filters.reset}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Sort By */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Sort By</Text>

          <View style={styles.rowWrap}>
            {sortOptions.map((item) => {
              const active = watch("sortBy") === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.optionButton, active && styles.activeOption]}
                  onPress={() => setValue("sortBy", item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.activeOptionText,
                    ]}
                  >
                    {item.split("")?.[0].toUpperCase() +
                      item.split("").slice(1).join("")}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Order */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Order</Text>

          <View style={styles.rowWrap}>
            {(["asc", "desc"] as const).map((item) => {
              const active = watch("orderBy") === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.optionButton, active && styles.activeOption]}
                  onPress={() => setValue("orderBy", item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.activeOptionText,
                    ]}
                  >
                    {item.split("")?.[0].toUpperCase() +
                      item.split("").slice(1).join("")}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Dynamic Inputs */}
        {inputFields.map((field) => (
          <View key={field.name} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>

            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={field.placeholder}
                  icon=""
                />
              )}
            />
          </View>
        ))}

        {/* Document Type */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Document Type</Text>

          <View style={styles.rowWrap}>
            {documentTypeOptions.map((item) => {
              const active = watch("documentType") === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.optionButton, active && styles.activeOption]}
                  onPress={() =>
                    setValue("documentType", active ? undefined : item)
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.activeOptionText,
                    ]}
                  >
                    {item.split("")?.[0].toUpperCase() +
                      item.split("").slice(1).join("")}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* File Type */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>File Type</Text>

          <View style={styles.rowWrap}>
            {fileTypeOptions.map((item) => {
              const active = watch("fileType") === item.value;

              return (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.optionButton, active && styles.activeOption]}
                  onPress={() =>
                    setValue("fileType", active ? undefined : item.value)
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.activeOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </BottomSheetScrollView>

      {/* ================= FOOTER ================= */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.applyButtonText}>
            {TEXTS.filters.applyFilters}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.white,
  },

  /**
   * HEADER
   */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",

    backgroundColor: COLORS.white,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  resetText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F3F4F6",
  },

  /**
   * CONTENT
   */
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },

  fieldContainer: {
    marginBottom: 22,
  },

  label: {
    marginBottom: 10,

    fontSize: 14,
    fontWeight: "600",

    color: COLORS.textSecondary,
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  optionButton: {
    minWidth: "30%",

    height: 48,

    paddingHorizontal: 14,

    borderRadius: 14,

    borderWidth: 1,
    borderColor: COLORS.border,

    justifyContent: "center",
    alignItems: "center",
  },

  activeOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  optionText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  activeOptionText: {
    color: COLORS.white,
  },

  /**
   * FOOTER
   */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,

    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
  },

  applyButton: {
    height: 54,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.primary,
  },

  applyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
