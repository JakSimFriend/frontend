import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { Archieve } from "../../../assets/images/images";
import { MyChallengeTopbarNav } from "./my-challenge-topbar-nav";

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
            headerTitleAlign: "left",
            headerTitleStyle: { fontSize: 16, fontWeight: "900" },
            headerRight: () => (
              <TouchableOpacity onPress={goToRecord} style={{ marginRight: 20 }}>
                <Image source={Archieve} />
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
