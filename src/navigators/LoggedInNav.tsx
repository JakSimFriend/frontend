import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClockIcon, DiamondIcon, HomeIcon, UserIcon } from "../components/TabIcon";
import { ProfileNav, StateNav, MyChallengeNav, HomeNav } from ".";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
  return (
    <>
      <Tabs.Navigator
        initialRouteName="홈"
        screenOptions={{
          headerTitle: () => false,
          headerTransparent: Platform.OS === "android" ? true : false,
          tabBarActiveTintColor: "#054DE4",
          tabBarInactiveTintColor: "#647498",
          tabBarStyle: { backgroundColor: "#ffffff" },
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="홈"
          component={HomeNav}
          options={{
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="내챌린지"
          component={MyChallengeNav}
          options={{
            tabBarIcon: ({ focused }) => <DiamondIcon focused={focused} />,
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="현황"
          component={StateNav}
          options={{
            tabBarIcon: ({ focused }) => <ClockIcon focused={focused} />,
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="프로필"
          component={ProfileNav}
          options={{
            tabBarIcon: ({ focused }) => <UserIcon focused={focused} />,
          }}
        ></Tabs.Screen>
      </Tabs.Navigator>
    </>
  );
};
export default LoggedInNav;
