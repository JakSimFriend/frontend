import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { StatPage } from "../../../screens/main";

const Stack = createStackNavigator();

export const StatInfoNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="StatPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StatPage" component={StatPage} />
    </Stack.Navigator>
  );
};
