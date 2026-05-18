import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";



import { ImageFile } from "@/types";

export type PickerType = "camera" | "gallery" | "document";

type PickFileProps = {
    type: PickerType;
};

export const pickFile = async ({
    type,
}: PickFileProps): Promise<ImageFile | null> => {
    try {
        // ================= GALLERY =================

        if (type === "gallery") {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (result.canceled) {
                return null;
            }

            const asset = result.assets[0];

            return {
                uri: asset.uri,
                name: asset.fileName || `image-${Date.now()}.jpg`,
                type: asset.mimeType || "image/jpeg",
                size: asset.fileSize || 0,
            };
        }

        // ================= DOCUMENT =================

        if (type === "document") {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf"],
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                return null;
            }

            const file = result.assets[0];

            return {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || "application/pdf",
                size: file.size || 0,
            };
        }

        return null;
    } catch (error) {
        console.log("Error while picking file:", error);
        return null;
    }
};