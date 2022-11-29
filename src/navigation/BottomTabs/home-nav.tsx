import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Home } from "../../screens/main";

const Stack = createStackNavigator();

export const HomeNav = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ 
        headerTitle: "홈",
        headerTitleAlign: "left",
        headerTitleStyle: { fontSize: 15, fontWeight: "900" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <AntDesign
                  name="plus"
                  size={23}
                  onPress={() => navigation.navigate("Category")}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign
                  name="bells"
                  size={23}
                  onPress={() => navigation.navigate("Notifications")}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
