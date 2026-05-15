import { CameraView } from "expo-camera";
import { RefObject } from "react";

export type ImageFile = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

type CaptureImageProps = {
  cameraRef: RefObject<CameraView | null>;
};

export const captureImage = async ({
  cameraRef,
}: CaptureImageProps): Promise<ImageFile | null> => {
  try {
    if (!cameraRef.current) return null;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.2,
      base64: false,
      skipProcessing: true,
    });

    if (!photo?.uri) return null;

    return {
      uri: photo.uri,
      name: photo.uri.split("/").pop() || `photo-${Date.now()}.jpg`,
      type: "image/jpeg",
      size: photo.width * photo.height,
    };
  } catch (error) {
    console.log("Capture Error:", error);
    return null;
  }
};