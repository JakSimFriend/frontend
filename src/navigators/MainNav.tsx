import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
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
  NickName,
  Record,
  RequestPage,
  Detail,
  RecruitPage,
  BeforeStartPage,
  ProgressNotification,
  ProgressDetailTopTab,
  ProgressCertified,
  BirthDay,
  BeforeStartPageInfo,
  RecruitPageInfo,
} from "../screens/main";
import SettingNav from "./SettingNav";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import { unlink } from "@react-native-seoul/kakao-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileEdit from "../screens/main/ProfileEdit";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const MainNav = () => {
  const isUser = useRecoilValue(isUserAtom);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
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
  const kakaoSignOut = async (): Promise<void> => {
    const message = await unlink();
    console.warn(message);
    AsyncStorage.removeItem("jwt");
    AsyncStorage.removeItem("userIdx");
    setIsLoggedIn(false);
  };
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
            <>
              <Stack.Screen name="Home" component={LoggedInNav} />
              <Stack.Screen
                name="ProfileEdit"
                component={ProfileEdit}
                options={{
                  headerShown: false,
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
              <Stack.Screen
                name="SettingNav"
                component={SettingNav}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="NickName"
                component={NickName}
                options={{
                  headerTitle: "회원가입",
                  headerTitleAlign: "center",
                  headerTitleStyle: { fontSize: 15, fontWeight: "900" },
                  headerLeft: () => (
                    <ArrowLeft
                      onPress={kakaoSignOut}
                      name="arrowleft"
                      size={25}
                      style={{ marginLeft: 15 }}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="BirthDay"
                component={BirthDay}
                options={{
                  headerTitle: "회원가입",
                  headerTitleAlign: "center",
                  headerTitleStyle: { fontSize: 15, fontWeight: "900" },
                  headerLeft: () => (
                    <TouchableOpacity>
                      <ArrowLeft
                        onPress={goBack}
                        name="arrowleft"
                        size={25}
                        style={{ marginLeft: 15 }}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
            </>
          )}

          {/* 우측 상단 페이지들 */}
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{
              presentation: "transparentModal",
              headerTitle: "알림",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    console.warn("전부삭제~");
                  }}
                  style={{ marginRight: 20 }}
                >
                  <Text style={{ color: "#054de4" }}>전부 삭제</Text>
                </TouchableOpacity>
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
              presentation: "transparentModal",
              headerTitle: "상세",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              presentation: "transparentModal",
              headerTintColor: "#000000",
              headerShadowVisible: false,
              headerTransparent: false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="SearchChallenge"
            component={SearchChallenge}
            options={{
              presentation: "transparentModal",
              headerShadowVisible: false,
              headerBackgroundContainerStyle: { backgroundColor: "#F6F5FB" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          {/* <Stack.Screen name="Setting" component={Setting} /> */}
          <Stack.Screen
            name="Record"
            component={Record}
            options={{
              presentation: "transparentModal",
              headerTitle: "기록",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
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
              presentation: "transparentModal",
              headerTitle: "제목", //서버데이터
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerLeft: () => (
                <TouchableOpacity onPress={goToMyChallenge}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={goToProgressNotification} style={{ marginRight: 20 }}>
                  <Text style={{ color: "#054de4" }}>알림</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ProgressNotification"
            component={ProgressNotification}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ProgressCertified"
            component={ProgressCertified}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="BeforeStartPage"
            component={BeforeStartPage}
            options={{
              presentation: "transparentModal",
              headerRight: () => (
                <TouchableOpacity onPress={goToBeforeStartPageInfo}>
                  <Text style={{ color: "#054de4", fontSize: 16, marginRight: 15 }}>정보</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="BeforeStartPageInfo"
            component={BeforeStartPageInfo}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="RecruitPage"
            component={RecruitPage}
            options={{
              presentation: "transparentModal",
              headerRight: () => (
                <TouchableOpacity onPress={goToRecruitPageInfo}>
                  <Text style={{ color: "#054de4", fontSize: 16, marginRight: 15 }}>정보</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="RecruitPageInfo"
            component={RecruitPageInfo}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="RequestPage"
            component={RequestPage}
            options={{
              presentation: "transparentModal",
              headerShadowVisible: false,
              headerBackgroundContainerStyle: { backgroundColor: "#F6F5FB" },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    setCancelModal(true);
                  }}
                  style={{ marginRight: 20 }}
                >
                  <Text style={{ color: "#054de4" }}>신청 취소</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
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
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <TouchableOpacity onPress={goToChallengeOpenOne} style={{ marginRight: 20 }}>
                  <Text style={{ color: "#054de4" }}>다음</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ChallengeOpenOne"
            component={ChallengeOpenOne}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <TouchableOpacity
                  onPress={goToChallengeOpenTwo}
                  disabled={nextButtonDisable}
                  style={{ marginRight: 20 }}
                >
                  <Text style={[{ color: nextButtonDisable ? "#9a9797" : "#054de4" }]}>다음</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ChallengeOpenTwo"
            component={ChallengeOpenTwo}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  disabled={submitButtonDisable}
                  style={{ marginRight: 20 }}
                >
                  <Text style={[{ color: submitButtonDisable ? "#9a9797" : "#054de4" }]}>완료</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
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
