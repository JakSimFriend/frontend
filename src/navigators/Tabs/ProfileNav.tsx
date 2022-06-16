import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../../screens/main";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export const ProfileNav = () => {
  const navigation = useNavigation();
  const goToSetting = () => navigation.navigate("Setting");
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitle: () => false,
        headerShadowVisible:false,
        headerRightContainerStyle: { paddingRight: 20},
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={goToSetting}>
              <Text>설정</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
