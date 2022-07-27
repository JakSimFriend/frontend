import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileModal from "../../../components/organisms/ProfileModal";
import { ProfileNavParamList } from "../../../navigators/Tabs/ProfileNav";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnDevelopModal from "../../../components/organisms/OnDevelopModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { onDevelopModalAtom } from "../../../../atom";
// import { TestIds, RewardedAd, RewardedAdEventType } from "@react-native-firebase/admob";

type ProfileDataType = {
  image: string;
};

export const Profile = ({ navigation }: StackScreenProps<ProfileNavParamList>) => {
  const [profileDatas, setProfileDatas]: any = useState([]);
  const [profilePoint, setProfilePoint] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/profiles/${userIdx}`)
        .then(function (response) {
          if (response.data.result === undefined) {
            console.log("워닝");
          } else {
            setProfileDatas(response.data.result[0]);
            setProfilePoint(response.data.result[0].point.toLocaleString("ko-KR"));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, []);

  const [profileData, setProfileData] = useState<ProfileDataType>({
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1600px-A_black_image.jpg?20201103073518",
  });

  const pointIconName = [
    "gift-outline",
    "person-add-outline",
    "receipt-outline",
    "wallet-outline",
    "flag-outline",
  ]; //Ionicons

  const [modalVisible, setModalVisible] = useState(false);
  const setModalTwoVisible = useSetRecoilState(onDevelopModalAtom);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);

  const receiveReward = () => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .patch(`https://jaksimfriend.site/profiles/${userIdx}/reward`)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  // 플랫폼에 따라 다른 app Id firebase.json에서가져오기
  // const appId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
  // const getAds = () => {
  //   try {
  //     //TestIds에 각 플랫폼 id넣어주면됨
  //     const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  //       requestNonPersonalizedAdsOnly: true,
  //     });
  //     rewarded.onAdEvent((type, error, reward) => {
  //       if (error) {
  //         console.log("동영상을 불러오는 중 오류가 발생했어요", error);
  //       }
  //       if (type === RewardedAdEventType.LOADED) {
  //         // 동영상 로드 완료
  //         rewarded.show(); // 동영상 광고 띄우기
  //       }
  //       if (type === RewardedAdEventType.EARNED_REWARD) {
  //         console.log("User earned reward of ", reward);
  //         receiveReward();
  //       }
  //     });
  //     rewarded.load();
  //   } catch (error) {
  //     console.log("catch error", error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        onLayout={(e) => {
          setScrollViewHeight(e.nativeEvent.layout.height);
        }}
      >
        <View
          onLayout={(e) => {
            scrollViewContentHeight == 0 && setScrollViewContentHeight(e.nativeEvent.layout.height);
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SettingNav")}>
            <Text style={styles.setting}>설정</Text>
          </TouchableOpacity>
          <View style={styles.profileView}>
            <Image
              source={{
                uri: profileDatas.profile ? profileDatas.profile : profileData.image,
              }}
              style={styles.image}
            />
            <View style={styles.profileRightView}>
              <View style={styles.nameView}>
                <Text style={styles.nickName}>{profileDatas.nickName}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate("ProfileEdit")}
                >
                  <AntDesign name="edit" size={20} color="#101647" />
                </TouchableOpacity>
              </View>
              <Text style={styles.introduce}>{profileDatas.promise}</Text>
            </View>
          </View>
          <LinearGradient style={styles.linearGradient} colors={["#947BEA", "#1151E5"]}>
            <Text style={styles.pointTitleText}>내 캐시</Text>
            <Text style={styles.pointText}>{profilePoint}C</Text>
            <View style={styles.pointButtonView}>
              <TouchableOpacity style={styles.pointButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.pointButtonText}>초대하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.pointButton, { marginHorizontal: 10 }]}
                onPress={() => {
                  setModalTwoVisible(true);
                }}
              >
                <Text style={styles.pointButtonText}>충전하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pointButton}
                onPress={() => {
                  setModalTwoVisible(true);
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
                  profileDatas.points?.length < 4 ? scrollViewHeight - scrollViewContentHeight : 30,
              },
            ]}
          >
            <Text style={styles.bottomTitle}>내역 보기</Text>
            {profileDatas.points?.length === 0 ? (
              <Text style={styles.emptyAlertText}>결제 내역이 없어요</Text>
            ) : (
              profileDatas.points?.map((item: any, index: number) => (
                <View key={index} style={styles.pointListRow}>
                  <View style={styles.pointIconView}>
                    {item.categoryName === "챌린지 결제" ? (
                      <Image
                        source={require("../../../assets/coinIcon.png")}
                        style={styles.coinIcon}
                      />
                    ) : (
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
                        color="#101647"
                        size={24}
                      />
                    )}
                  </View>
                  <View style={[styles.pointColumnView, { flex: 1 }]}>
                    <Text style={styles.pointTypeText}>{item.categoryName}</Text>
                    <Text style={styles.pointDateText}>{item.createAt}</Text>
                  </View>
                  <View style={styles.pointColumnView}>
                    <Text style={[styles.pointTypeText, { color: "#044DE4", textAlign: "right" }]}>
                      {(item.point > 0 ? "+" : "") + item.point.toLocaleString("ko-KR")}C
                    </Text>
                    <Text style={[styles.pointDateText, { textAlign: "right" }]}>
                      {item.balance.toLocaleString("ko-KR")}C
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      {/* <View style={{ position: 'absolute', backgroundColor: '#fff', bottom: 0, height: 200, width: '100%', zIndex: -1 }} /> */}
      <ProfileModal visible={modalVisible} setVisible={setModalVisible} />
      <OnDevelopModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  setting: {
    fontSize: 14,
    color: "#101647",
    marginVertical: 10,
    alignSelf: "flex-end",
    marginRight: 20,
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
    color: "#101647",
    fontWeight: "700",
  },
  editButton: {
    marginLeft: 12,
  },
  introduce: {
    color: "#101647",
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
    color: "#fff",
    fontSize: 13,
  },
  pointText: {
    color: "#fff",
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
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomView: {
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    marginTop: 30,
    elevation: 5,
    shadowColor: "#0F2D6B33",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 16,
    flex: 1,
  },
  bottomTitle: {
    color: "#101647",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "600",
  },
  pointListRow: {
    borderBottomWidth: 1,
    borderColor: "#BFC7D7",
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyAlertText: {
    color: "#6F81A9",
    fontSize: 16,
    marginTop: 70,
    textAlign: "center",
  },
  pointIconView: {
    backgroundColor: "#F5F5FB",
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
    color: "#101647",
    fontSize: 16,
  },
  pointDateText: {
    color: "#BFC7D7",
    fontSize: 12,
  },
});
