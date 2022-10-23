import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { useRecoilState } from "recoil";

import { myIndicatorAtom, profileIndicatorAtom, stateIndicatorAtom } from "../common/atom";
import { ClockIcon, DiamondIcon, HomeIcon, UserIcon } from "../components/atoms/TabIcon";
import { HomeNav, MyChallengeNav, ProfileNav, StateNav } from ".";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
  const platformHeader = Platform.OS === "android" ? false : true;
  const [myIndicator, setMyIndicator] = useRecoilState(myIndicatorAtom);
  const [stateIndicator, setStateIndicator] = useRecoilState(stateIndicatorAtom);
  const [profileIndicator, setProfileIndicator] = useRecoilState(profileIndicatorAtom);
  return (
    <>
      <Tabs.Navigator
        initialRouteName="홈"
        screenOptions={{
          headerTitle: () => false,
          tabBarActiveTintColor: "#054DE4",
          tabBarInactiveTintColor: "#647498",
          tabBarStyle: { backgroundColor: "#ffffff" },
          headerShadowVisible: false,
          headerShown: platformHeader,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Tabs.Screen
          name="홈"
          component={HomeNav}
          options={{
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="내 도전"
          component={MyChallengeNav}
          options={{
            tabBarIcon: ({ focused }) => <DiamondIcon focused={focused} />,
          }}
          listeners={{
            tabPress: () => {
              setMyIndicator(!myIndicator);
            },
          }}
        />
        <Tabs.Screen
          name="현황"
          component={StateNav}
          options={{
            tabBarIcon: ({ focused }) => <ClockIcon focused={focused} />,
          }}
          listeners={{
            tabPress: () => {
              setStateIndicator(!stateIndicator);
            },
          }}
        />
        <Tabs.Screen
          name="프로필"
          component={ProfileNav}
          options={{
            tabBarIcon: ({ focused }) => <UserIcon focused={focused} />,
          }}
          listeners={{
            tabPress: () => {
              setProfileIndicator(!profileIndicator);
            },
          }}
        />
      </Tabs.Navigator>
    </>
  );
};
export default LoggedInNav;
