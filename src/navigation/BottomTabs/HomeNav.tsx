import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import Bell from "react-native-vector-icons/AntDesign";

import { Home } from "../../screens/main";

const Stack = createStackNavigator();

export const HomeNav = () => {
  const navigation = useNavigation();
  const goToNotifications = () => {
    navigation.navigate("Notifications");
  };
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: "홈",
        headerTitleAlign: "left",
        headerTitleStyle: { fontSize: 18, fontWeight: "600" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity>
              <Bell
                name="bells"
                size={23}
                onPress={goToNotifications}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
