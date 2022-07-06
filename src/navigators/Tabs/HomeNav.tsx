import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/main";
import Bell from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export const HomeNav = () => {
  const navigation = useNavigation();
  const goToNotifications = () => navigation.navigate("Notifications");
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: () => false,
        headerShadowVisible: false,
        headerRightContainerStyle: { paddingRight: 20 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <Bell name="bells" size={23} onPress={goToNotifications} />,
        }}
      />
    </Stack.Navigator>
  );
};
