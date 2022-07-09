import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyState, State } from "../../../screens/main";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export const StateNav = () => {
  const navigation = useNavigation();
  const goToDetail = () => navigation.navigate("Detail");
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
        component={MyState}
        options={{
          headerTitle: "현황",
          headerRight: () => (
            <TouchableOpacity onPress={goToDetail}>
              <Text>상세</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
