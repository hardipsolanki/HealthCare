import { ROUTES_PATH } from "@/constant/index"; // adjust path as needed
import { captureImage } from "@/helpers/camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CameraScreen = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter(); // ✅ moved to component level (not inside async)
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const takePicture = async () => {
    try {
      const file = await captureImage({
        cameraRef,
      });

      if (!file) return;
      //  Navigate after capturing
      router.replace({
        pathname: ROUTES_PATH.AddDocument,
        params: {
          file: JSON.stringify(file),
          type: "camera",
        },
      });
    } catch (error) {
      console.log("Camera Error:", error);
    }
  };

  //  Handles the initial loading state
  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  //  Handles denied permission
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity
          style={styles.permissionBtn}
          onPress={requestPermission}
        >
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
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
  permissionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  permissionBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
