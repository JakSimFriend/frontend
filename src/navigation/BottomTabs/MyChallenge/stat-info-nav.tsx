import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
