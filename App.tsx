import "react-native-gesture-handler";

import messaging from "@react-native-firebase/messaging";
import { NavigationContainer } from "@react-navigation/native";
import MainNav from "@src/navigation/main-nav";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};
export default App;
