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
  SearchChallenge,
  Setting,
  NickName,
  Record,
  RequestPage,
  Detail,
} from "../screens/main";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "react-native-vector-icons/AntDesign";

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
  const goBack = () => navigation.goBack();
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
              headerTitle: "알림",
              headerRight: () => (
                <Button
                  onPress={() => {
                    console.warn("전부삭제~");
                  }}
                  title="전부 삭제"
                  color="#054de4"
                />
              ),
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              presentation: "card",
              headerTitle: "상세",
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
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
            }}
          />
          <Stack.Screen
            name="RequestPage"
            component={RequestPage}
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
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
            }}
          />
          <Stack.Screen
            name="SearchChallenge"
            component={SearchChallenge}
            options={{
              headerShadowVisible: false,
              headerBackgroundContainerStyle: { backgroundColor: "#F6F5FB" },
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
