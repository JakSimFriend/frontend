import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../../atom";
import { Category, ChallengeDesc, Notifications, Search, Setting } from "../screens/main";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const Stack = createStackNavigator();

const MainNav = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Tabs"
          screenOptions={{
            headerTitle: () => false,
            headerTransparent: true,
            headerTintColor: "#000000",
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="Tabs" component={LoggedInNav} />
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
              presentation: "modal",
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
