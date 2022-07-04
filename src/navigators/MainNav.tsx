import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  cancelModalAtom,
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
import { Record } from "../screens/main/BottomTabs/MyChallenge/Record";
import { BeforeStart } from "../screens/main/BottomTabs/MyChallenge/BeforeStart";

const Stack = createStackNavigator();

const MainNav = () => {
  const isUser = useRecoilValue(isUserAtom);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const nextButtonDisable = useRecoilValue(nextButtonAtom);
  const submitButtonDisable = useRecoilValue(submitButtonAtom);
  const setModalVisible = useSetRecoilState(createdModalAtom);
  const setCancelModal = useSetRecoilState(cancelModalAtom);
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
            name="Record"
            component={Record}
            options={{
              headerTitle: "기록",
              headerTransparent: false,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="BeforeStart"
            component={BeforeStart}
            options={{
              headerShadowVisible: false,
              headerBackgroundContainerStyle: { backgroundColor: "#F6F5FB" },
              headerRight: () => (
                <Button
                  onPress={() => {
                    setCancelModal(true);
                  }}
                  title="신청 취소"
                  color="#054de4"
                />
              ),
            }}
          />
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
