import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogoutModal from "../../../../../components/organisms/Modal/LogoutModal";
import WithdrawalModal from "../../../../../components/organisms/Modal/WithdrawalModal";
import { SettingNavParamList } from "../../../../../navigation/SettingNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIndexAtom } from "../../../../../../atom";
import { Color } from "@src/assets/color";
import SelectModal from "@src/components/organisms/Modal/SelectModal";
import { LogOutWithKakao } from "@src/components/molecules/authentication/LogoutButton";

export const Setting = ({ navigation }: StackScreenProps<SettingNavParamList>) => {
  const [switchEnable, setSwitchEnable] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);
  const userIdx = useRecoilValue(userIndexAtom);

  useEffect(() => {
    AsyncStorage.getItem("alertButton").then((value) => {
      if (value === "false") {
        setSwitchEnable(false);
      } else {
        setSwitchEnable(true);
      }
    });
  }, []);

  const patchAlert = () => {
    axios
      .patch(
        `https://jaksimfriend.site/settings/${userIdx}/${switchEnable ? "alert-cancel" : "alert"}`,
      )
      .then(() => {
        AsyncStorage.setItem("alertButton", String(!switchEnable));
        setSwitchEnable(!switchEnable);
      })
      .catch((error) => console.log(error));
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
        <View style={styles.topView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Color.blue[1100]} />
          </TouchableOpacity>
          <Text style={styles.topText}>설정</Text>
          <Ionicons name="arrow-back" size={24} color={Color.black[0]} />
        </View>
        <Text style={styles.title}>알림 설정</Text>
        <View style={styles.row}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons
                name={"notifications" + (switchEnable ? "" : "-outline")}
                color={switchEnable ? Color.blue[100] : Color.blue[1100]}
                size={24}
              />
            </View>
            <Text style={styles.text}>미달성 도전작심 알림 받기</Text>
          </View>
          <Switch
            value={switchEnable}
            onValueChange={patchAlert}
            onChange={patchAlert}
            trackColor={{ true: Color.blue[100], false: Color.white[100] }}
            thumbColor={switchEnable ? Color.white[0] : Color.gray[100]}
            style={{ width: 60 }}
          />
        </View>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
        <Text style={styles.title}>이용 설정</Text>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Notification")}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="notifications-outline" color={Color.blue[1100]} size={24} />
            </View>
            <Text style={styles.text}>공지 사항</Text>
          </View>
          <Ionicons name="chevron-forward" color={Color.blue[1100]} size={18} />
        </TouchableOpacity>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Complaint")}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="chatbubble-outline" color={Color.blue[1100]} size={24} />
            </View>
            <Text style={styles.text}>문의하기</Text>
          </View>
          <Ionicons name="chevron-forward" color={Color.blue[1100]} size={18} />
        </TouchableOpacity>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("TOS")}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="settings-outline" color={Color.blue[1100]} size={24} />
            </View>
            <Text style={styles.text}>이용 약관</Text>
          </View>
          <Ionicons name="chevron-forward" color={Color.blue[1100]} size={18} />
        </TouchableOpacity>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("PrivacyPolicy")}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="settings-outline" color={Color.blue[1100]} size={24} />
            </View>
            <Text style={styles.text}>개인 정보 처리 방침</Text>
          </View>
          <Ionicons name="chevron-forward" color={Color.blue[1100]} size={18} />
        </TouchableOpacity>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("ChallengeTOS")}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="settings-outline" color={Color.blue[1100]} size={24} />
            </View>
            <Text style={styles.text}>도전작심 개설 약관</Text>
          </View>
          <Ionicons name="chevron-forward" color={Color.blue[1100]} size={18} />
        </TouchableOpacity>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
        <TouchableOpacity style={styles.row} onPress={() => setLogoutModalVisible(true)}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="log-out-outline" color={Color.blue[1100]} size={24} />
            </View>
            <Text style={styles.text}>로그아웃</Text>
          </View>
          <Ionicons name="chevron-forward" color={Color.blue[1100]} size={18} />
        </TouchableOpacity>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
        <TouchableOpacity style={styles.row} onPress={() => setWithdrawalModalVisible(true)}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="person-remove-outline" color={Color.blue[1100]} size={24} />
            </View>
            <Text style={styles.text}>회원 탈퇴</Text>
          </View>
          <Ionicons name="chevron-forward" color={Color.blue[1100]} size={18} />
        </TouchableOpacity>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Color.white[100], marginTop: 10 }}
        />
      </ScrollView>
      {/* <LogoutModal visible={logoutModalVisible} setVisible={setLogoutModalVisible} /> */}
      <SelectModal
        visible={logoutModalVisible}
        title="로그아웃 하시겠어요?"
        leftContent="취소"
        leftFn={() => setLogoutModalVisible(false)}
        rightFn={() => <LogOutWithKakao />}
        rightContent="로그아웃"
        isRightIsJsx={true}
      />
      <WithdrawalModal visible={withdrawalModalVisible} setVisible={setWithdrawalModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Color.white[0],
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  topText: {
    color: Color.blue[1100],
    fontSize: 17,
    fontWeight: "600",
    alignSelf: "center",
  },
  title: {
    color: Color.blue[1100],
    fontSize: 17,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    backgroundColor: Color.white[100],
    borderRadius: 13,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingLeft: 10,
    color: Color.blue[1100],
    fontWeight: "400",
    fontSize: 17,
  },
});
