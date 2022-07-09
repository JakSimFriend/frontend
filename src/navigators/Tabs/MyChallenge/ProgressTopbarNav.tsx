import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatInfoNav } from "./StatInfoNav";
import { ProgressInfoNav } from "./ProgressInfoNav";

const Tab = createMaterialTopTabNavigator();

export const ProgressTopbarNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="정보"
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#BFC7D7",
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 23, fontWeight: "bold" },
        tabBarStyle: {
          shadowColor: "#fff",
          width: "50%",
        },
        tabBarPressColor: "#ffffff",
      }}
    >
      <Tab.Screen name="정보" component={ProgressInfoNav} options={{}} />
      <Tab.Screen name="정산" component={StatInfoNav} />
    </Tab.Navigator>
  );
};
