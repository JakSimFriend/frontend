import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import MainNav from "./src/navigators/MainNav";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  });
  return (
    <RecoilRoot>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </SafeAreaProvider>
      </SafeAreaView>
    </RecoilRoot>
  );
};
export default App;
