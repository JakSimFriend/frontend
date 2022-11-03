import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

export const useGetFcmTokenByGoogle = () => messaging().getToken();

export const useFcmTokenSaveLocalStorage = async (token: string) => {
  AsyncStorage.setItem("fcstone", token);
};
