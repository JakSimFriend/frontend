import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import {
  HomeCalendarBlue,
  HomeClockBlue,
  HomeUserBlue,
  HomeCamera,
} from "../../../../../components/TabIcon";
import "moment/locale/ko";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

type RouteParams = {
  route: {
    params: {
      challengeIdx: number;
    };
  };
};

// startDate이 오늘 이후인 data만 fetch
export const BeforeStartPage = ({ route }: RouteParams) => {
  const { challengeIdx } = route.params;

  const [data, setData]: any = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/my-challenges/${challengeIdx}/${userIdx}/before-info`)
        .then(function (response) {
          setData(response.data.result[0]);
        })
        .catch(function (error) {
          console.warn(error);
        });
    });
  }, []);

  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.topView}>
        <Text style={styles.topText}>{data.title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101647" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BeforeStartPageInfo", {
              challengeIdx: challengeIdx,
            });
          }}
        >
          <Text style={{ color: "#054de4", fontSize: 16 }}>정보</Text>
        </TouchableOpacity>
      </View>
      <Wrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Calendar
            firstDay={1}
            initialDate={data.startDate}
            minDate={data.startDate}
            hideDayNames
            maxDate={moment(data.startDate).add(14, "days").format(`YYYY-MM-DD`)}
          />
          <View style={styles.spendingDateBox}>
            <Text style={styles.spendingDateText}>
              {moment(data.startDate, "YYYYMMDD").fromNow()}에 시작해요
            </Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoWrapper}>
              <Text style={{ color: "#6F81A9" }}>
                <HomeCalendarBlue /> {moment(data.startDate).format(`M월 D일`)} ~{" "}
                {moment(data.startDate).add(14, "days").format(`M월 D일`)}
              </Text>
              <Text style={{ marginTop: 10, color: "#6F81A9" }}>
                <HomeClockBlue /> {data.certification}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={{ color: "#6F81A9" }}>
                <HomeUserBlue /> {data.limited} 명
              </Text>
              <Text style={{ color: "#6F81A9", marginTop: 10 }}>
                <HomeCamera /> {data.deadline}
              </Text>
            </View>
          </View>
          <Text style={styles.membersTitle}>작심친구 {data.members?.length}</Text>
          {data.members?.map((item: any, index: number) => {
            return (
              <Friends key={index}>
                <Friend>
                  <Logo
                    resizeMode="contain"
                    source={{
                      uri: item.profile,
                    }}
                  />
                  <UserInfo>
                    <Name>{item.nickName}</Name>
                    <Promise>{item.promise}</Promise>
                  </UserInfo>
                </Friend>
              </Friends>
            );
          })}
        </ScrollView>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0 4%;
`;
const Friends = styled.View`
  flex-direction: column;
  margin-top: 15px;
`;
const Friend = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  border-bottom-color: #f6f5fb;
  border-bottom-width: 1px;
  padding-bottom: 10px;
`;
const Logo = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 20px;
  border-radius: 15px;
`;
const UserInfo = styled.View`
  flex-direction: column;
`;
const Name = styled.Text`
  font-weight: 600;
`;
const Promise = styled.Text`
  margin-top: 10px;
`;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  topText: {
    color: "#101647",
    fontSize: 17,
    position: "absolute",
    width: width,
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
    fontWeight: "500",
  },
  spendingDateBox: {
    paddingVertical: 20,
    marginHorizontal: 15,
    backgroundColor: "#6F81A9",
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  spendingDateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
  infoBox: {
    flexDirection: "row",
  },
  infoWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  membersTitle: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "600",
  },
});
