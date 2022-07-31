import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/auth/Welcome";

const Stack = createStackNavigator();

const LoggedOutNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTitle: () => false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};
export default LoggedOutNav;
