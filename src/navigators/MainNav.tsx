import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom, isUserAtom } from "../../atom";
import { Category, ChallengeDesc, Notifications, Search, Setting } from "../screens/main";
import { NickName } from "../screens/main/NickName";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const Stack = createStackNavigator();

const MainNav = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isUser = useRecoilValue(isUserAtom);
  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: () => false,
            headerTransparent: true,
            headerTintColor: "#000000",
            headerBackTitleVisible: false,
          }}
        >
          {isUser ? (
            <Stack.Screen name="Home" component={LoggedInNav} />
          ) : (
            <Stack.Screen name="NickName" component={NickName} />
          )}
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              presentation: "transparentModal",
              headerShown:false
            }}
          />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="ChallengeDesc" component={ChallengeDesc} />
        </Stack.Navigator>
      ) : (
        <LoggedOutNav />
      )}
    </>
  );
};
export default MainNav;
