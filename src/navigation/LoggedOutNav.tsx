import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../screens/auth/login-page";

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
      <Stack.Screen name="Welcome" component={LoginPage} />
    </Stack.Navigator>
  );
};
export default LoggedOutNav;
