import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileModal from "../../../components/organisms/ProfileModal";
import { ProfileNavParamList } from "../../../navigators";

type ProfileDataType = {
  image: string;
  nickName: string;
  introduce: string;
  point: number;
  pointList: {
    type: number;
    date: string;
    value: number;
    total: number;
  }[];
};

export const Profile = ({ navigation }: StackScreenProps<ProfileNavParamList>) => {
  const [profileData, setProfileData] = useState<ProfileDataType>({
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1600px-A_black_image.jpg?20201103073518",
    nickName: "수화",
    introduce: "친구야, 나랑 작심하자!",
    point: 12000,
    pointList: [
      {
        type: 0,
        date: "2022/06/26",
        value: 15000,
        total: 25000,
      },
      {
        type: 1,
        date: "2022/05/15",
        value: 10000,
        total: 15000,
      },
      {
        type: 2,
        date: "2022/05/14",
        value: 3000,
        total: 5000,
      },
      {
        type: 3,
        date: "2022/05/13",
        value: -10000,
        total: 2000,
      },
      {
        type: 4,
        date: "2022/05/12",
        value: 10000,
        total: 12000,
      },
    ],
  });

  const pointType = ["광고 보상", "친구 초대 보상", "챌린지 결제", "인출", "챌린지 보상"];
  const pointIconName = ["gift-outline", "person-add-outline", "receipt-outline", "wallet-outline", "flag-outline"]; //Ionicons

  const [modalVisible, setModalVisible] = useState(false);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={{ flex: 1 }} bounces={false} onLayout={(e) => { setScrollViewHeight(e.nativeEvent.layout.height); }}>
        <View onLayout={(e) => { scrollViewContentHeight == 0 && setScrollViewContentHeight(e.nativeEvent.layout.height) }}>
          <TouchableOpacity onPress={() => navigation.navigate('SettingNav')}>
            <Text style={styles.setting}>설정</Text>
          </TouchableOpacity>
          <View style={styles.profileView}>
            <Image
              source={{
                uri: profileData.image,
              }}
              style={styles.image}
            />
            <View style={styles.profileRightView}>
              <View style={styles.nameView}>
                <Text style={styles.nickName}>{profileData.nickName}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileEdit')}>
                  <AntDesign name="edit" size={20} color="#101647" />
                </TouchableOpacity>
              </View>
              <Text style={styles.introduce}>{profileData.introduce}</Text>
            </View>
          </View>
          <LinearGradient style={styles.linearGradient} colors={["#947BEA", "#1151E5"]}>
            <Text style={styles.pointTitleText}>내 캐시</Text>
            <Text style={styles.pointText}>{profileData.point.toLocaleString("ko-KR")}C</Text>
            <View style={styles.pointButtonView}>
              <TouchableOpacity style={styles.pointButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.pointButtonText}>초대하기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.pointButton, { marginHorizontal: 10 }]}>
                <Text style={styles.pointButtonText}>충전하기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pointButton}>
                <Text style={styles.pointButtonText}>인출하기</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={[styles.bottomView, { paddingBottom: scrollViewContentHeight > scrollViewHeight ? 30 : scrollViewHeight - scrollViewContentHeight }]}>
            <Text style={styles.bottomTitle}>내역 보기</Text>
            {profileData.pointList.length == 0 ? (
              <Text style={styles.emptyAlertText}>결제 내역이 없어요</Text>
            ) : (
              profileData.pointList.map((v, i) => (
                <View key={i} style={styles.pointListRow}>
                  <View style={styles.pointIconView}>
                    {v.type == -1 ? (
                      <Image
                        source={require("../../../assets/coinIcon.png")}
                        style={styles.coinIcon}
                      />
                    ) : (
                      <Ionicons name={pointIconName[v.type]} color="#101647" size={24} />
                    )}
                  </View>
                  <View style={[styles.pointColumnView, { flex: 1 }]}>
                    <Text style={styles.pointTypeText}>{pointType[v.type]}</Text>
                    <Text style={styles.pointDateText}>{v.date}</Text>
                  </View>
                  <View style={styles.pointColumnView}>
                    <Text style={[styles.pointTypeText, { color: "#044DE4", textAlign: "right" }]}>
                      {(v.value > 0 ? "+" : "") + v.value.toLocaleString("ko-KR")}C
                    </Text>
                    <Text style={[styles.pointDateText, { textAlign: "right" }]}>
                      {v.total.toLocaleString("ko-KR")}C
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
    marginVertical: 50,
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
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 13,
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
    justifyContent: "space-between",
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
    shadowColor: '#0F2D6B33',
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
    fontWeight: '600'
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
