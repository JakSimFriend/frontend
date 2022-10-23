import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components/native";

import { ProgressInfoNav } from "./progress-info-nav";
import { StatInfoNav } from "./stat-info-nav";

const Tab = createMaterialTopTabNavigator();

export const ProgressTopbarNav = () => {
  return (
    <Wrapper>
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
        },
        tabBarItemStyle: {
          alignItems: "baseline",
          marginRight: -50,
          marginLeft:5,
          width: Dimensions.get("window").width * 0.3,
          marginTop: Platform.OS === "android" ? 0 : 20,
        },
        tabBarPressColor: "#ffffff",
      }}
    >
      <Tab.Screen name="정보" component={ProgressInfoNav} />
      <Tab.Screen name="정산" component={StatInfoNav} />
    </Tab.Navigator>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: ${Platform.OS === "ios" ? "17.5%" : "12%"};
`;
