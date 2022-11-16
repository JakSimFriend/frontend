import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { SignInAtom, userIdxAtom } from "../../common/atom";
import { GradientButtons } from "../atoms/GradientButtons";
import SignInModal from "../organisms/Modal/SignInModal";

export const BirthDay = () => {
  const [visible, setModalVisible] = useRecoilState(SignInAtom);

  const GREY = "#6F81A9";
  const [dateSelected, setDateSelected] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [dateInfo, setDateInfo] = useState("");
  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = (date: Date) => {
    setDate(moment(date).format(`YYYY년 MM월 DD일`));
    setDateInfo(moment(date).format(`YYYY-MM-DD`));
    setDateSelected(true);
    hideTimePicker();
  };
  useEffect(() => {
    showTimePicker();
  }, []);

  const userIdx = useRecoilValue(userIdxAtom);
  const postBirthDay = () => {
    axios
      .post("https://yenie.shop/users/birth", {
        userIdx: userIdx,
        birth: dateInfo,
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const jakSimStart = () => {
    postBirthDay();
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <Title>생년월일을 적어주세요!</Title>
        <SubTitle>작심친구에서 맞춤 서비스를 제공해드려요!</SubTitle>
        <View>
          {Platform.OS === "ios" ? (
            <TextInput
              placeholderTextColor={GREY}
              style={styles.dropDownBox}
              placeholder="생년월일"
              value={date}
              onChangeText={setDate}
              onPressIn={() => {
                showTimePicker();
              }}
              editable={false}
            />
          ) : (
            <Pressable
              onPress={() => {
                showTimePicker();
              }}
            >
              <TextInput
                placeholderTextColor={GREY}
                style={styles.dropDownBox}
                placeholder="생년월일"
                value={date}
                onChangeText={setDate}
                editable={false}
              />
            </Pressable>
          )}
        </View>
        {dateSelected ? (
          <GradientWrapper>
            <GradientButtons onPress={jakSimStart} Title="작심하러 갈게요" />
          </GradientWrapper>
        ) : (
          <StartButton onPress={jakSimStart} disabled>
            <Text style={{ color: "#6F81A9" }}>작심하러 갈게요</Text>
          </StartButton>
        )}

        {/* modal picker에서 community피커예시로 변경 */}
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideTimePicker}
          modalStyleIOS={{ marginBottom: "50%", paddingHorizontal: "5%" }}
          confirmTextIOS="확인"
        />
      </Wrapper>
      <SignInModal visible={visible} />
    </SafeAreaView>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 5% 0 5%;
`;
const Title = styled.Text`
  font-size: 30px;
  font-weight: 400;
`;
const SubTitle = styled.Text`
  margin-top: 20px;
  font-size: 15px;
`;
const GradientWrapper = styled.TouchableOpacity`
  align-self: center;
  width: 80%;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
`;
const StartButton = styled.TouchableOpacity`
  margin-top: 40px;
  padding: 15px 0;
  background-color: #f6f5fb;
  border-radius: 15px;
  align-items: center;
  align-self: center;
  width: 80%;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
`;
const styles = StyleSheet.create({
  dropDownBox: {
    marginTop: 50,
    paddingVertical: 55,
    width: "90%",
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#F5F5FB",
  },
});
