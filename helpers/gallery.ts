import * as ImagePicker from "expo-image-picker";

export type ImageFile = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

export const pickImageFromGallery = async (): Promise<ImageFile | null> => {
  try {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
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
  } catch (error) {
    console.log("Gallery Error:", error);
    return null;
  }
};