import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClockIcon, DiamondIcon, HomeIcon, UserIcon } from "../components/atoms/TabIcon";
import { ProfileNav, StateNav, MyChallengeNav, HomeNav } from ".";
import { Platform } from "react-native";
import { useRecoilState } from "recoil";
import { myIndicatorAtom, stateIndicatorAtom, profileIndicatorAtom } from "../common/atom";

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
          name="내챌린지"
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
