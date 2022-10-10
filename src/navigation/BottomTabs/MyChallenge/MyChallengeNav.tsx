import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { MyChallengeTopbarNav } from "./MyChallengeTopbarNav";

const Stack = createStackNavigator();

export const MyChallengeNav = () => {
  const navigation = useNavigation();
  const goToRecord = () => navigation.navigate("Record");
  return (
    <Wrapper>
      <Stack.Navigator
        initialRouteName="MyChallengeTopbarNav"
        screenOptions={{
          headerTitle: () => false,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="MyChallengeTopbarNav"
          component={MyChallengeTopbarNav}
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
    </Wrapper>
  );
};

export const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
