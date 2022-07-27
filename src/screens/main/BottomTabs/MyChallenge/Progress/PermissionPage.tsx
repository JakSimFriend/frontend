import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { ActivityIndicator, ImageRequireSource, Linking, StyleSheet, View } from "react-native";
import { Camera, CameraPermissionStatus, useCameraDevices } from "react-native-vision-camera";

const BANNER_IMAGE = require("../../../../../assets/Book.png") as ImageRequireSource;

export const CONTENT_SPACING = 15;

export type Routes = {
  PermissionsPage: undefined;
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: "video" | "photo";
  };
};
export const SAFE_AREA_PADDING = {
  paddingLeft: 10,
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
};
type Props = NativeStackScreenProps<Routes, "PermissionsPage">;

const PermissionPage = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [openCamera, setOpenCamera] = useState(false);

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");

  // const devices = useCameraDevices('wide-angle-camera')
  // const device = devices.back

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === "denied") await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);
  return (
    <View>
      {device == null ? (
        <ActivityIndicator size={20} color={"blue"} />
      ) : openCamera === true ? (
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} />
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  banner: {
    position: "absolute",
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    ...SAFE_AREA_PADDING,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: "#007aff",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
});
