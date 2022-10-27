import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ProgressPage } from "../../../screens/main";

const Stack = createStackNavigator();

export const ProgressInfoNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProgressPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProgressPage" component={ProgressPage} />
    </Stack.Navigator>
  );
};
