import React from "react";
import { Progress, Request } from "../../../screens/main";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export const MyChallengeCategoryNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="진행"
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#BFC7D7",
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 23, fontWeight: "bold" },
        tabBarStyle: {
          shadowColor: "#fff",
          // marginRight: 220,
        },
      }}
    >
      <Tab.Screen name="진행" component={Progress} />
      <Tab.Screen name="신청" component={Request} />
    </Tab.Navigator>
  );
};
