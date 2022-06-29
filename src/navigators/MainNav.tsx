import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  createdModalAtom,
  isLoggedInAtom,
  isUserAtom,
  nextButtonAtom,
  submitButtonAtom,
} from "../../atom";
import {
  Category,
  ChallengeOpenOne,
  ChallengeOpenTwo,
  Notifications,
  Search,
  Setting,
} from "../screens/main";
import { NickName } from "../screens/main/NickName";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const MainNav = () => {
  const isUser = useRecoilValue(isUserAtom);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const nextButtonDisable = useRecoilValue(nextButtonAtom);
  const submitButtonDisable = useRecoilValue(submitButtonAtom);
  const setModalVisible = useSetRecoilState(createdModalAtom);
  const navigation = useNavigation();
  const goToChallengeOpenOne = () => navigation.navigate("ChallengeOpenOne");
  const goToChallengeOpenTwo = () => navigation.navigate("ChallengeOpenTwo");
  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: () => false,
            headerTransparent: true,
            headerTintColor: "#000000",
            headerBackTitleVisible: false,
          }}
        >
          {isUser ? (
            <Stack.Screen name="Home" component={LoggedInNav} />
          ) : (
            <Stack.Screen name="NickName" component={NickName} />
          )}
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <Button onPress={goToChallengeOpenOne} title="다음" color="#000000" />
              ),
            }}
          />
          <Stack.Screen
            name="ChallengeOpenOne"
            component={ChallengeOpenOne}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <Button
                  disabled={nextButtonDisable}
                  onPress={goToChallengeOpenTwo}
                  title="다음"
                  color={nextButtonDisable ? "#9a9797" : "#000000"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="ChallengeOpenTwo"
            component={ChallengeOpenTwo}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <Button
                  disabled={submitButtonDisable}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  title="완료"
                  color={submitButtonDisable ? "#9a9797" : "#000000"}
                />
              ),
            }}
          />
        </Stack.Navigator>
      ) : (
        <LoggedOutNav />
      )}
    </>
  );
};
export default MainNav;
