import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

export const useGetFcmTokenByGoogle = async () => {
  const fcmToken = await messaging().getToken();
  return fcmToken;
};

export const useFcmTokenSaveLocalStorage = async (token: string) => {
  AsyncStorage.setItem("fcstone", token);
};
