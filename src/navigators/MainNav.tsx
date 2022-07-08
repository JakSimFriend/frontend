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
  RecruitPage,
  BeforeStartPage,
  ProgressPage,
  ProgressNotification,
  ProgressDetailTopTab,
} from "../screens/main";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { Button, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import { RecruitPageInfo } from "../screens/main/BottomTabs/MyChallenge/Recruit/RecruitPageInfo";
import { BeforeStartPageInfo } from "../screens/main/BottomTabs/MyChallenge/BeforeStart/BeforeStartPageInfo";
import Bell from "react-native-vector-icons/AntDesign";

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
  const goToRecruitPageInfo = () => navigation.navigate("RecruitPageInfo");
  const goToBeforeStartPageInfo = () => navigation.navigate("BeforeStartPageInfo");
  const goToProgressNotification = () => navigation.navigate("ProgressNotification");
  const goToMyChallenge = () => navigation.navigate("내챌린지");
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

          {/* 우측 상단 페이지들 */}
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

          {/* 내 챌린지 페이지 내부페이지들 */}
          <Stack.Screen
            name="ProgressDetailTopTab"
            component={ProgressDetailTopTab}
            options={{
              headerTitle: "제목", //서버데이터
              headerLeft: () => (
                <ArrowLeft onPress={goToMyChallenge} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
              headerRight: () => (
                <TouchableOpacity onPress={goToProgressNotification} style={{ marginRight: 20 }}>
                  <Text>알림</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ProgressNotification"
            component={ProgressNotification}
            options={{
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
            }}
          />
          <Stack.Screen
            name="BeforeStartPage"
            component={BeforeStartPage}
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={goToBeforeStartPageInfo}>
                  <Text style={{ color: "#000000", fontSize: 16, marginRight: 15 }}>정보</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
            }}
          />
          <Stack.Screen
            name="BeforeStartPageInfo"
            component={BeforeStartPageInfo}
            options={{
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
            }}
          />
          <Stack.Screen
            name="RecruitPage"
            component={RecruitPage}
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={goToRecruitPageInfo}>
                  <Text style={{ color: "#000000", fontSize: 16, marginRight: 15 }}>정보</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <ArrowLeft onPress={goBack} name="arrowleft" size={25} style={{ marginLeft: 15 }} />
              ),
            }}
          />
          <Stack.Screen
            name="RecruitPageInfo"
            component={RecruitPageInfo}
            options={{
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

          {/* 챌린지 개설 페이지들 */}
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
