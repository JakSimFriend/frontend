import React, { useEffect, useState } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  createdModalAtom,
  dateAtom,
  infoAtom,
  isLoggedInAtom,
  isUserAtom,
  nextButtonAtom,
  numberAtom,
  progressTitleAtom,
  selectedCategoryIndexAtom,
  startDateAtom,
  submitButtonAtom,
  tagsAtom,
  timeAtom,
  titleAtom,
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
import axios from "axios";
import { HomeChallengeInfo } from "../screens/main/BottomTabs/Home/HomeChallengeInfo";
import { ProgressPageInfo } from "../screens/main/BottomTabs/MyChallenge/Progress/ProgressPageInfo";
import messaging from "@react-native-firebase/messaging";

const Stack = createStackNavigator();

const MainNav = () => {
  const [isUser, setIsUser] = useRecoilState(isUserAtom);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const nextButtonDisable = useRecoilValue(nextButtonAtom);
  const submitButtonDisable = useRecoilValue(submitButtonAtom);
  const setModalVisible = useSetRecoilState(createdModalAtom);
  const progressTitle = useRecoilValue(progressTitleAtom);
  const navigation = useNavigation();
  const goToChallengeOpenOne = () => navigation.navigate("ChallengeOpenOne");
  const goToChallengeOpenTwo = () => navigation.navigate("ChallengeOpenTwo");
  const goToProgressNotification = () => navigation.navigate("ProgressNotification");
  const goToMyChallenge = () => navigation.navigate("내챌린지");
  const goBack = () => navigation.goBack();

  // signOut
  const [userIndex, setUserIndex] = useState(0);
  AsyncStorage.getItem("userIdx", (err, result: any) => {
    setUserIndex(parseInt(result));
  });
  const signOutPatch = () => {
    axios
      .patch(`https://jaksimfriend.site/users/${userIndex}/delete`)
      .then(function (response) {
        console.warn(response.data.result);
      })
      .catch(function (error) {
        console.warn(error);
      });
  };
  const kakaoSignOut = async (): Promise<void> => {
    const message = await unlink();
    console.log(message);
    AsyncStorage.removeItem("jwt");
    AsyncStorage.removeItem("userIdx");
    signOutPatch();
    setIsLoggedIn(false);
    setIsUser(false);
  };

  // 챌린지 개설
  const title = useRecoilValue(titleAtom); // 제목
  const content = useRecoilValue(infoAtom); // 내용
  const startDate = useRecoilValue(startDateAtom); // 시작 날짜
  const date = useRecoilValue(dateAtom); // 인증 날짜
  const number = useRecoilValue(numberAtom); // 인증 횟수
  const time = useRecoilValue(timeAtom); // 인증 시간
  const categoryIdx = useRecoilValue(selectedCategoryIndexAtom); // 카테고리 인덱스
  const tags = useRecoilValue(tagsAtom); // 태그
  const createChallenge = () => {
    axios
      .post("https://jaksimfriend.site/challenges", {
        title: title,
        content: content,
        startDate: startDate,
        cycle: date,
        count: number,
        deadline: time,
        categoryIdx: categoryIdx,
        userIdx: userIndex,
        tags: tags,
      })
      .then(function (response) {
        console.warn(response.data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  };

  //   const date1 = new Date();
  // const times  = (Date.parse(`01 may 2022 ${time} GMT`))
  //   const timestamp = date1.getTime();
  //   console.warn((times))

  // useEffect(() => {
  //   const date1 = new Date();

  //   const tmpHours = `${date1.getHours() < 10 ? "0" : ""}${date1.getHours()}`;
  //   // let meridiem;
  //   const meridiem = parseInt(tmpHours) - 12 < 0 ? "AM" : "PM";
  //   const tmpMinuets = `${date1.getMinutes() < 10 ? "0" : ""}${date1.getMinutes()}`;
  //   const fullTime = `${tmpHours}:${tmpMinuets} ${meridiem}`;
  //   console.warn(fullTime);
  // }, []);

  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate("Home");
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute("Home");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator
        initialRouteName={initialRoute}
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
          <Stack.Screen
            name="HomeChallengeInfo"
            component={HomeChallengeInfo}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />

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
              headerTitle: progressTitle,
              headerTitleAlign: "center",
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
            name="ProgressPageInfo"
            component={ProgressPageInfo}
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
              headerLeft: () => <></>,
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
              headerLeft: () => <></>,
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
              headerLeft: () => <></>,
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
                    createChallenge();
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
