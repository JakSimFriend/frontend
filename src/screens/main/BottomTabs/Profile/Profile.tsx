import Clipboard from "@react-native-clipboard/clipboard";
import { StackScreenProps } from "@react-navigation/stack";
import { Color } from "@src/assets/color";
import { profileIndicatorAtom, userIdxAtom } from "@src/common/atom";
import ModalComponent from "@src/components/organisms/Modal/Modal";
import SelectModal from "@src/components/organisms/Modal/SelectModal";
import { ProfileNavParamList } from "@src/navigation/BottomTabs/ProfileNav";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue } from "recoil";

import { UserInfo } from "./interface/user.interface";

const pointIconName = [
  "gift-outline",
  "person-add-outline",
  "receipt-outline",
  "wallet-outline",
  "flag-outline",
]; //Ionicons

export const Profile = ({ navigation }: StackScreenProps<ProfileNavParamList>) => {
  const userIdx = useRecoilValue(userIdxAtom);
  const profileIndicator = useRecoilValue(profileIndicatorAtom);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDeveloperModalVisible, setIsDeveloperModalVisible] = useState<boolean>(false);
  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState<number>(0);

  const [profileData, setProfileData] = useState<UserInfo>();
  const getData = () => {
    axios
      .get(`https://jaksimfriend.site/profiles/${userIdx}`)
      .then((response) => setProfileData(response.data.result[0]))
      .catch((error) => console.log(error));
  };

  const receiveReward = () => {
    // 광고보상받기
    axios
      .patch(`https://jaksimfriend.site/profiles/${userIdx}/reward`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, [profileIndicator]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        onLayout={(e) => {
          scrollViewContentHeight == 0 && setScrollViewContentHeight(e.nativeEvent.layout.height);
        }}
      >
        <View style={styles.headerWrapper}>
          <View>
            <Text style={styles.headerTitle}>프로필</Text>
          </View>
          <View style={styles.headerIconWrapper}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("ProfileEdit")}
            >
              <AntDesign name="edit" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SettingNav")}
              style={{ marginLeft: 12 }}
            >
              <AntDesign name="setting" size={24} />
              {/* Todo */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileView}>
          {profileData?.profile ? (
            <Image
              source={{
                uri: profileData?.profile,
              }}
              style={styles.image}
            />
          ) : (
            <View style={{ ...styles.image, backgroundColor: "black" }} />
          )}
          <View style={styles.profileRightView}>
            <View style={styles.nameView}>
              <Text style={styles.nickName}>{profileData?.nickName}</Text>
            </View>
            <Text style={styles.introduce}>{profileData?.promise}</Text>
          </View>
        </View>
        <LinearGradient style={styles.linearGradient} colors={[Color.violet[100], Color.blue[400]]}>
          <Text style={styles.pointTitleText}>내 캐시</Text>
          <Text style={styles.pointText}>{profileData?.point.toLocaleString()}C</Text>
          <View style={styles.pointButtonView}>
            <TouchableOpacity style={styles.pointButton} onPress={() => setIsModalVisible(true)}>
              <Text style={styles.pointButtonText}>초대하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pointButton, { marginHorizontal: 10 }]}
              onPress={() => {
                setIsDeveloperModalVisible(true);
                // getAds();
              }}
            >
              <Text style={styles.pointButtonText}>충전하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pointButton}
              onPress={() => {
                setIsDeveloperModalVisible(true);
              }}
            >
              <Text style={styles.pointButtonText}>인출하기</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View
          style={[
            styles.bottomView,
            {
              paddingBottom:
                profileData?.points && profileData?.points?.length < 4
                  ? scrollViewHeight - scrollViewContentHeight
                  : 30,
            },
          ]}
        >
          <Text style={styles.bottomTitle}>내역 보기</Text>
          <View>
            <ScrollView
              // bounces={false}
              onLayout={(e) => {
                setScrollViewHeight(e.nativeEvent.layout.height);
              }}
            >
              {profileData?.points?.length === 0 ? (
                <Text style={styles.emptyAlertText}>결제 내역이 없어요</Text>
              ) : (
                profileData?.points?.map((item: any, index: number) => (
                  <View key={index} style={styles.pointListRow}>
                    <View style={styles.pointIconView}>
                      <Ionicons
                        name={
                          pointIconName[
                            item.categoryName === "광고 보상"
                              ? 0
                              : item.categoryName === "친구 초대 보상"
                              ? 1
                              : item.categoryName === "챌린지 결제"
                              ? 2
                              : item.categoryName === "인출"
                              ? 3
                              : 4
                          ]
                        }
                        color={Color.blue[1100]}
                        size={24}
                      />
                    </View>
                    <View style={[styles.pointColumnView, { flex: 1 }]}>
                      <Text style={styles.pointTypeText}>{item.categoryName}</Text>
                      <Text style={styles.pointDateText}>{item.createAt}</Text>
                    </View>
                    <View style={styles.pointColumnView}>
                      <Text
                        style={[
                          styles.pointTypeText,
                          { color: Color.blue[100], textAlign: "right" },
                        ]}
                      >
                        {(item.point > 0 ? "+" : "") +
                          item.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        C
                      </Text>
                      <Text style={[styles.pointDateText, { textAlign: "right" }]}>
                        {item.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}C
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </View>
      {/* <ProfileModal visible={isModalVisible} setVisible={setIsModalVisible} /> */}
      <SelectModal
        visible={isModalVisible}
        title={`추천인 되고\n1,000C 받아가세요!`}
        body={
          <>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 17,
                color: "#101647",
                marginTop: 30,
                lineHeight: 25,
              }}
            >
              초대받은 사람이 추천인으로{"\n"}
              <Text style={{ color: "#044DE4" }}>내 닉네임</Text>을 입력하면{"\n"}1,000C를 받을 수
              있어요!
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 17, color: "#6F81A9", marginTop: 50 }}>
              앱 링크를 복사하시겠어요?
            </Text>
          </>
        }
        leftContent="취소"
        rightContent="링크 복사"
        leftFn={() => setIsModalVisible(false)}
        rightFn={() => {
          Clipboard.setString("https://www.apple.com/kr/app-store/");
          setIsModalVisible(false);
        }}
      />
      <ModalComponent
        isVisible={isDeveloperModalVisible}
        title="프로그램 개발중 입니다"
        body={
          <>
            <ActivityIndicator size={30} color={Color.blue[100]} />
            <Text
              style={{
                fontWeight: "400",
                fontSize: 17,
                color: Color.blue[1100],
                marginTop: 70,
                textAlign: "center",
              }}
            >
              현재 페이지는 준비중입니다.{`\n`}빠른 시일 내에 더욱 나은 모습으로 찾아뵙겠습니다.
            </Text>
          </>
        }
        closeFn={() => {
          setIsDeveloperModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: 11,
    backgroundColor: Color.white[200],
  },
  headerWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  headerIconWrapper: {
    flexDirection: "row",
  },
  profileView: {
    marginVertical: 35,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 13,
    resizeMode: "cover",
  },
  profileRightView: {
    marginLeft: 16,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  nameView: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickName: {
    fontSize: 22,
    color: Color.blue[1100],
    fontWeight: "700",
  },
  editButton: {
    marginLeft: 12,
  },
  introduce: {
    color: Color.blue[1100],
    fontSize: 17,
  },
  linearGradient: {
    width: "90%",
    paddingVertical: 16,
    paddingHorizontal: "3%",
    borderRadius: 13,
    alignSelf: "center",
  },
  pointTitleText: {
    color: Color.white[0],
    fontSize: 13,
  },
  pointText: {
    color: Color.white[0],
    fontSize: 34,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 30,
  },
  pointButtonView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  pointButton: {
    backgroundColor: "#FFFFFF4D",
    paddingVertical: 13,
    paddingHorizontal: "6.5%",
    borderRadius: 13,
  },
  pointButtonText: {
    color: Color.white[0],
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomView: {
    backgroundColor: Color.white[0],
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    marginTop: 30,
    elevation: 5,
    shadowColor: "#0F2D6B33",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 1,
    // shadowRadius: 16,
    // flex: 1,
  },
  bottomTitle: {
    color: Color.blue[1100],
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "600",
  },
  pointListRow: {
    borderBottomWidth: 1,
    borderColor: Color.gray[100],
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyAlertText: {
    color: Color.blue[900],
    fontSize: 16,
    marginTop: 70,
    textAlign: "center",
  },
  pointIconView: {
    backgroundColor: Color.white[100],
    padding: 8,
    borderRadius: 13,
    marginRight: 10,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  pointColumnView: {
    justifyContent: "space-between",
    paddingVertical: 1,
  },
  pointTypeText: {
    color: Color.blue[1100],
    fontSize: 16,
  },
  pointDateText: {
    color: Color.gray[100],
    fontSize: 12,
  },
});
