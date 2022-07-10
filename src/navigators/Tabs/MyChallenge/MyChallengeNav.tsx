import React from "react";
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
        headerRightContainerStyle: { paddingRight: 20 },
      }}
    >
      <Stack.Screen
        name="MyChallenge"
        component={MyChallenge}
        options={{
          headerTitle: "내 도전",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 15, fontWeight: "900" },
          headerRight: () => (
            <TouchableOpacity onPress={goToRecord}>
              <Text style={{ color: "#054de4" }}>기록</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
