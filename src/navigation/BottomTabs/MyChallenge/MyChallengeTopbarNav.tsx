import React from "react";
import { Progress, Request } from "../../../screens/main";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";

const Tab = createMaterialTopTabNavigator();

export const MyChallengeTopbarNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="진행"
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#BFC7D7",
        tabBarItemStyle: {
          alignItems: "baseline",
          marginRight: -50,
          marginLeft:5,
          width: Dimensions.get("window").width * 0.3,
        },
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 23, fontWeight: "bold" },
        tabBarStyle: {
          shadowColor: "#fff",
        },
        tabBarPressColor: "#ffffff",
      }}
    >
      <Tab.Screen name="진행" component={Progress} />
      <Tab.Screen name="신청" component={Request} />
    </Tab.Navigator>
  );
};
