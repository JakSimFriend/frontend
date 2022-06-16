import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Bell from "react-native-vector-icons/AntDesign";
import { StateCategoryNav } from "./StateCategoryNav";
import { State } from "../../../screens/main";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export const StateNav = () => {
  const navigation = useNavigation();
  const goToNotifications = () => navigation.navigate("Notifications");
  return (
    <Stack.Navigator
      initialRouteName="State"
      screenOptions={{
        headerTitle: () => false,
        headerShadowVisible: false,
        headerRightContainerStyle: { paddingRight: 20 },
      }}
    >
      <Stack.Screen
        name="State"
        component={State}
        options={{
          headerRight: () => <Bell name="bells" size={23} onPress={goToNotifications} />,
        }}
      />
      <Stack.Screen name="StateCategoryNav" component={StateCategoryNav} />
    </Stack.Navigator>
  );
};
