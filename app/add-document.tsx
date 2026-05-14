// // app/add-document.tsx

// import React, { useState } from "react";

// import {
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";

// import { Controller, SubmitHandler, useForm } from "react-hook-form";

// import { useRouter } from "expo-router";

// import { LinearGradient } from "expo-linear-gradient";

// import * as DocumentPicker from "expo-document-picker";

// import { Picker } from "@react-native-picker/picker";

// import { Ionicons } from "@expo/vector-icons";

// import Toast from "react-native-toast-message";

// import CustomButton from "@/components/Button";
// import CustomInput from "@/components/Input";

// import { TEXTS } from "@/constant/texts";

// import { useAddDocument } from "@/hooks/mutations/useAddDocument";

// import { COLORS } from "@/theme/colors";

// import { ROUTES_PATH } from "@/constant";
// import { generateSlug } from "@/helpers/generateSlug";
// import { AddDocumentInput, ApiError, ImageFile } from "@/types";

// const documentTypeItems = [
//   { label: "Family", value: "family" },

//   { label: "Medical Document", value: "medical_document" },

//   { label: "Prescription", value: "medication" },

//   { label: "Insurance", value: "insurance" },

//   { label: "Lab Report", value: "other" },
// ];

// type FormValues = {
//   documentType: string;

//   file: ImageFile | null;

//   fileName: string;
// };

// const AddDocument = () => {
//   const router = useRouter();

//   const [selectedFile, setSelectedFile] = useState<ImageFile | null>(null);

//   const [uploadProgress, setUploadProgress] = useState(0);

//   const { mutate: addDocument, isPending } = useAddDocument();

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       documentType: "",
//       file: null,
//       fileName: "",
//     },
//   });

//   const watchedFileName = watch("fileName");

//   const pickFile = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ["application/pdf", "image/*"],
//         copyToCacheDirectory: true,
//       });

//       if (!result.canceled) {
//         const pickedFile = result.assets[0];

//         const fileData: ImageFile = {
//           uri: pickedFile.uri,
//           name: pickedFile.name,
//           type:
//             pickedFile.mimeType ||
//             (pickedFile.name.endsWith(".pdf")
//               ? "application/pdf"
//               : "image/jpeg"),
//         };

//         setSelectedFile(fileData);

//         setValue("file", fileData, {
//           shouldValidate: true,
//         });

//         setValue("fileName", pickedFile.name);
//       }
//     } catch (error) {
//       console.log("Error picking file:", error);

//       Toast.show({
//         type: "error",
//         text1: "Failed to pick file",
//       });
//     }
//   };

//   const simulateProgress = () => {
//     setUploadProgress(0);

//     let progress = 0;

//     const interval = setInterval(() => {
//       progress += 10;

//       if (progress === 90) {
//         clearInterval(interval);
//         return;
//       }

//       setUploadProgress(progress);

//       if (progress >= 100) {
//         clearInterval(interval);
//       }
//     }, 200);

//     return interval;
//   };

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     if (!data.file) {
//       Toast.show({
//         type: "error",
//         text1: "Please select file",
//       });

//       return;
//     }

//     const updatedFile: ImageFile = {
//       ...data.file,
//       name: data.fileName || data.file.name,
//     };

//     const interval = simulateProgress();

//     addDocument(
//       {
//         documentType: data.documentType,
//         file: { ...updatedFile, name: generateSlug(updatedFile.name) },
//       } as AddDocumentInput,
//       {
//         onSuccess: () => {
//           clearInterval(interval);

//           Toast.show({
//             type: "success",
//             text1: "Document uploaded",
//           });

//           reset();

//           setSelectedFile(null);

//           setUploadProgress(100);
//           setTimeout(() => {
//             router.push(ROUTES_PATH.Documents);
//           }, 500);
//         },

//         onError: (error: ApiError) => {
//           clearInterval(interval);

//           setUploadProgress(0);

//           console.log("Error while add document: ", error?.data?.message);

//           Toast.show({
//             type: "error",
//             text1: error?.data?.message || "Upload failed",
//           });
//         },
//       },
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

//       {/* HEADER */}
//       <LinearGradient
//         colors={[COLORS.primary, "#6D4BEF"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="chevron-back" size={24} color={COLORS.white} />
//         </TouchableOpacity>

//         <View style={styles.headerIcon}>
//           <Ionicons name="document-text" size={42} color={COLORS.primary} />
//         </View>

//         <Text style={styles.headerTitle}>{TEXTS.addDocument.title}</Text>

//         <Text style={styles.headerSubTitle}>{TEXTS.addDocument.subTitle}</Text>
//       </LinearGradient>

//       {/* BODY */}
//       <KeyboardAvoidingView
//         style={styles.card}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* DOCUMENT TYPE */}
//           <Text style={styles.label}>{TEXTS.addDocument.documentType}</Text>

//           <Controller
//             control={control}
//             name="documentType"
//             rules={{
//               required: "Document type is required",
//             }}
//             render={({ field: { onChange, value } }) => (
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={value}
//                   onValueChange={(itemValue) => onChange(itemValue)}
//                   style={styles.picker}
//                   dropdownIconColor={COLORS.primary}
//                 >
//                   <Picker.Item label="Select document type" value="" />

//                   {documentTypeItems.map((item) => (
//                     <Picker.Item
//                       key={item.value}
//                       label={item.label}
//                       value={item.value}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             )}
//           />

//           {errors.documentType && (
//             <Text style={styles.errorText}>{errors.documentType.message}</Text>
//           )}

//           {/* FILE PICKER */}
//           <Text style={styles.label}>{TEXTS.addDocument.uploadFile}</Text>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.fileContainer}
//             onPress={pickFile}
//           >
//             <View style={styles.fileLeft}>
//               <View style={styles.fileIconBox}>
//                 <Ionicons
//                   name="document-attach"
//                   size={24}
//                   color={COLORS.primary}
//                 />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.fileTitle} numberOfLines={1}>
//                   {selectedFile?.name || TEXTS.addDocument.chooseFile}
//                 </Text>

//                 <Text style={styles.fileSubTitle}>
//                   {TEXTS.addDocument.fileSupportText}
//                 </Text>
//               </View>
//             </View>

//             <Ionicons
//               name="chevron-forward"
//               size={22}
//               color={COLORS.textMuted}
//             />
//           </TouchableOpacity>

//           {/* FILE NAME */}
//           {selectedFile && (
//             <>
//               <Text style={styles.label}>Document Name</Text>

//               <Controller
//                 control={control}
//                 name="fileName"
//                 rules={{
//                   required: "Document name is required",
//                 }}
//                 render={({ field: { onChange, value } }) => (
//                   <CustomInput
//                     placeholder="Enter document name"
//                     value={value}
//                     onChangeText={onChange}
//                     icon="document-text-outline"
//                     err={errors.fileName?.message}
//                   />
//                 )}
//               />
//             </>
//           )}

//           {/* PROGRESS */}
//           {isPending && (
//             <View style={styles.progressCard}>
//               <View style={styles.progressHeader}>
//                 <View style={styles.progressLeft}>
//                   <ActivityIndicator size="small" color={COLORS.primary} />

//                   <View style={{ marginLeft: 12 }}>
//                     <Text style={styles.progressTitle}>Uploading Document</Text>

//                     <Text style={styles.progressSubTitle}>Please wait...</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.progressPercent}>{uploadProgress}%</Text>
//               </View>

//               <View style={styles.progressBarContainer}>
//                 <View
//                   style={[
//                     styles.progressBar,
//                     {
//                       width: `${uploadProgress}%`,
//                     },
//                   ]}
//                 />
//               </View>
//             </View>
//           )}

//           {/* BUTTON */}
//           <View style={styles.buttonContainer}>
//             <CustomButton
//               title={TEXTS.addDocument.uploadButton}
//               onPress={handleSubmit(onSubmit)}
//               disabled={!selectedFile || !watchedFileName || isPending}
//               loading={isPending}
//             />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default AddDocument;

// // ================= STYLES =================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },

//   header: {
//     height: "30%",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },

//   backButton: {
//     position: "absolute",
//     top: 18,
//     left: 16,
//     zIndex: 10,
//     padding: 6,
//   },

//   headerIcon: {
//     width: 90,
//     height: 90,
//     borderRadius: 100,
//     backgroundColor: COLORS.white,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   headerTitle: {
//     color: COLORS.white,
//     fontSize: 28,
//     fontWeight: "700",
//   },

//   headerSubTitle: {
//     color: "#E9DFFF",
//     marginTop: 8,
//     fontSize: 14,
//     textAlign: "center",
//   },

//   card: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     marginTop: -25,
//     borderTopLeftRadius: 38,
//     borderTopRightRadius: 38,
//   },

//   scrollContent: {
//     paddingHorizontal: 22,
//     paddingTop: 10,
//     paddingBottom: 60,
//     flexGrow: 1,
//   },

//   label: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: COLORS.textPrimary,
//     marginBottom: 12,
//     marginTop: 20,
//   },

//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 18,
//     overflow: "hidden",
//     backgroundColor: COLORS.white,
//   },

//   picker: {
//     height: 58,
//     width: "100%",
//   },

//   errorText: {
//     color: "#EF4444",
//     marginTop: 8,
//     fontSize: 13,
//   },

//   fileContainer: {
//     minHeight: 82,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },

//   fileLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginRight: 10,
//   },

//   fileIconBox: {
//     width: 54,
//     height: 54,
//     borderRadius: 16,
//     backgroundColor: "#F3EEFF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 14,
//   },

//   fileTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: COLORS.textPrimary,
//   },

//   fileSubTitle: {
//     marginTop: 4,
//     fontSize: 13,
//     color: COLORS.textSecondary,
//   },

//   progressCard: {
//     marginTop: 28,
//     borderRadius: 22,
//     padding: 18,
//     backgroundColor: "#F8F6FF",
//     borderWidth: 1,
//     borderColor: "#ECE5FF",
//   },

//   progressHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },

//   progressLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   progressTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//   },

//   progressSubTitle: {
//     marginTop: 2,
//     fontSize: 12,
//     color: COLORS.textSecondary,
//   },

//   progressPercent: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },

//   progressBarContainer: {
//     height: 10,
//     width: "100%",
//     backgroundColor: "#E5DEFF",
//     borderRadius: 999,
//     overflow: "hidden",
//   },

//   progressBar: {
//     height: "100%",
//     borderRadius: 999,
//     backgroundColor: COLORS.primary,
//   },

//   buttonContainer: {
//     marginTop: 40,
//     marginBottom: 20,
//   },
// });

// app/add-document.tsx
// app/add-document.tsx

import React, { useState } from "react";

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

import { useRouter } from "expo-router";

import * as DocumentPicker from "expo-document-picker";

import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

import { LinearGradient } from "expo-linear-gradient";

import CustomButton from "@/components/Button";
import CustomInput from "@/components/Input";

import { TEXTS } from "@/constant/texts";

import { useAddDocument } from "@/hooks/mutations/useAddDocument";

import { COLORS } from "@/theme/colors";

import { ROUTES_PATH } from "@/constant";

import { generateSlug } from "@/helpers/generateSlug";

import { formatFileSize } from "@/helpers/formatSize";

import { AddDocumentInput, ApiError, ImageFile } from "@/types";

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

const AddDocument = () => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<ImageFile | null>(null);

  const { mutate: addDocument, isPending } = useAddDocument();

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

  const watchedFileName = watch("fileName");

  const pickFile = async () => {
    try {
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
            (pickedFile.name.endsWith(".pdf")
              ? "application/pdf"
              : "image/jpeg"),
          size: pickedFile.size || 0,
        };

        setSelectedFile(fileData);

        setValue("file", fileData, {
          shouldValidate: true,
        });

        setValue("fileName", pickedFile.name);
      }
    } catch (error) {
      console.log("Error picking file:", error);

      Toast.show({
        type: "error",
        text1: "Failed to pick file",
      });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);

    reset({
      documentType: "",
      file: null,
      fileName: "",
    });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!data.file) {
      Toast.show({
        type: "error",
        text1: "Please select file",
      });

      return;
    }

    const updatedFile: ImageFile = {
      ...data.file,
      name: data.fileName || data.file.name,
    };

    addDocument(
      {
        documentType: data.documentType,
        file: { ...updatedFile, name: generateSlug(updatedFile.name) },
      } as AddDocumentInput,
      {
        onSuccess: () => {
          reset();
          setSelectedFile(null);
          router.push({
            pathname: ROUTES_PATH.UploadingDocument,
            params: {
              fileName: updatedFile.name,
              fileSize: formatFileSize(updatedFile.size),
              DocumentType: data.documentType,
              isPending: isPending.toString(),
            },
          });
        },

        onError: (error: ApiError) => {
          Toast.show({
            type: "error",
            text1: error?.data?.message || "Upload failed",
          });
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Upload Document</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#111827"
          />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* FILE CARD */}
          <View style={styles.fileCard}>
            <View style={styles.fileLeft}>
              <View style={styles.pdfIcon}>
                <Ionicons name="document-text" size={24} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.fileName}>
                  {selectedFile?.name}
                </Text>

                <Text style={styles.fileSize}>
                  {formatFileSize(selectedFile?.size || 0)}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={removeFile}>
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
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
            <Text style={styles.errorText}>{errors.documentType.message}</Text>
          )}

          {/* FOLDER */}
          <View style={styles.fieldWrapper}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.uploadBox}
              onPress={pickFile}
            >
              <LinearGradient
                colors={["#2563EB", "#9333EA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadIconWrap}
              >
                <Ionicons name="cloud-upload-outline" size={28} color="#fff" />
              </LinearGradient>

              <Text style={styles.uploadTitle}>Select File</Text>

              <Text style={styles.uploadSubTitle}>
                Tap here to upload PDF or Image
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
              disabled={!selectedFile || !watchedFileName || isPending}
              loading={isPending}
            />
          </LinearGradient>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddDocument;

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

  folderBox: {
    height: 72,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
  },

  folderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  folderIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  folderTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  folderSubTitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#9CA3AF",
  },

  progressCard: {
    marginTop: 6,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  progressTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  progressLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  progressPercent: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  progressBarBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  buttonWrapper: {
    padding: 16,
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
});
