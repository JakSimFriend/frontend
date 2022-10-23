import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Progress, Request } from "@src/screens/main";
import React from "react";

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
          marginTop: 19,
          justifyContent: "flex-start",
          width: '100%'
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
