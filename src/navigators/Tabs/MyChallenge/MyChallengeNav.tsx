import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyChallenge } from "../../../screens/main";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export const MyChallengeNav = () => {
  const navigation = useNavigation();
  const goToRecord = () => navigation.navigate("Record");
  return (
    <Stack.Navigator
      initialRouteName="MyChallenge"
      screenOptions={{
        headerTitle: () => false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="MyChallenge"
        component={MyChallenge}
        options={{
          headerTitle: "내 도전",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 18, fontWeight: "900" },
          headerRight: () => (
            <TouchableOpacity onPress={goToRecord}>
              <Text style={{ color: "#054de4", fontSize: 15, marginRight: 18 }}>기록</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
