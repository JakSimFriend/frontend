import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyState } from "@src/screens/main";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { Archieve } from "../../assets/images/images";

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
          headerTitleAlign: "left",
          headerTitleStyle: { fontSize: 16, fontWeight: "900" },
          headerRight: () => (
            <TouchableOpacity onPress={goToDetail} style={{ marginRight: 20 }}>
              <Image source={Archieve} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
