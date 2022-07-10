import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../../screens/main";
import ProfileEdit from "../../screens/main/ProfileEdit";
import SettingNav from "../SettingNav";

export type ProfileNavParamList = {
  Profile: undefined,
  ProfileEdit: undefined,
  SettingNav: undefined
}

const Stack = createStackNavigator<ProfileNavParamList>();

export const ProfileNav = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
