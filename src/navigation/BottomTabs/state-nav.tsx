import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyState } from "@src/screens/main";
import React from "react";
import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

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
          headerTitleStyle: { fontSize: 15, fontWeight: "900" },
          headerRight: () => (
            <TouchableOpacity onPress={goToDetail}>
              {/* <Text style={{ color: "#054de4", fontSize: 15, marginRight: 18 }}>상세</Text> */}
              <Entypo size={24} name="box" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
