import React from "react";
import { MyState } from "../../../screens/main";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export const StateCategoryNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="내 현황"
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#B2B1B0",
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 23, fontWeight: "bold" },
        tabBarStyle: {
          shadowColor: "#fff",
          right: 145,
        },
      }}
    >
      <Tab.Screen name="시즌" component={MyState} />
    </Tab.Navigator>
  );
};
