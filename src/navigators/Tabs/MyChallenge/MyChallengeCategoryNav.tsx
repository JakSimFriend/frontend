import React from "react";
import { Part, Manage } from "../../../screens/main";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export const MyChallengeCategoryNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="참여중"
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#B2B1B0",
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 23, fontWeight: "bold" },
        tabBarStyle: {
          shadowColor: "#fff",
          marginEnd: 165,
        },
      }}
    >
      <Tab.Screen name="참여중" component={Part} />
      <Tab.Screen name="관리" component={Manage} />
    </Tab.Navigator>
  );
};
