import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ChallengeTOS from "../screens/main/BottomTabs/Profile/setting/ChallengeTOS";
import Complaint from "../screens/main/BottomTabs/Profile/setting/Complaint";
import Notification from "../screens/main/BottomTabs/Profile/setting/Notification";
import NotificationDetail from "../screens/main/BottomTabs/Profile/setting/NotificationDetail";
import PrivacyPolicy from "../screens/main/BottomTabs/Profile/setting/PrivacyPolicy";
import { Setting } from "../screens/main/BottomTabs/Profile/setting/Setting";
import TOS from "../screens/main/BottomTabs/Profile/setting/TOS";

export type SettingNavParamList = {
  Setting: undefined;
  Notification: undefined;
  NotificationDetail: undefined;
  Complaint: undefined;
  TOS: undefined;
  PrivacyPolicy: undefined;
  ChallengeTOS: undefined;
};

export default function SettingNav() {
  const Stack = createStackNavigator<SettingNavParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
      <Stack.Screen name="Complaint" component={Complaint} />
      <Stack.Screen name="TOS" component={TOS} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ChallengeTOS" component={ChallengeTOS} />
    </Stack.Navigator>
  );
}
