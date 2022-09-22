import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyState } from "../../screens/main";
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
      }}
    >
      <Stack.Screen
        name="State"
        component={MyState}
        options={{
          headerTitle: "현황",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 18, fontWeight: "900" },
          headerRight: () => (
            <TouchableOpacity onPress={goToDetail}>
              <Text style={{ color: "#054de4", fontSize: 15, marginRight: 18 }}>상세</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};