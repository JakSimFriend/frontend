import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import Entypo from "react-native-vector-icons/Entypo";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Progress from "react-native-progress";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createdModalAtom, submitButtonAtom } from "../../../../atom";
import CreatedModal1 from "../../../components/organisms/CreatedModal";

export const ChallengeOpenTwo = () => {
  const submitButtonDisable = useSetRecoilState(submitButtonAtom);
  const GREY = "#6F81A9";
  const [startDate, setStartDate] = useState(""); // 시작 날짜
  const [endDate, setEndDate] = useState(""); // 종료 날짜
  const [endProgress, setEndProgress] = useState(0.666); // progressbar

  const [date, setDate] = useState(""); // 날짜
  const [number, setNumber] = useState("0"); // 횟수
  const [summedNumber, setSummedNumber] = useState("0"); // 총 횟수
  const [time, setTime] = useState(""); // 시간

  // DropDown
  const [open1, setOpen1] = useState(false); // 첫번째 dropdown
  const [open2, setOpen2] = useState(false); // 두번째 dropdown
  const [items1, setItems1] = useState([
    { label: "1일", value: "14" },
    { label: "1주일", value: "7" },
    { label: "2주일", value: "1" },
  ]);
  const [items2, setItems2] = useState([
    { label: "1회", value: "1" },
    { label: "2회", value: "2" },
    { label: "3회", value: "3" },
    { label: "4회", value: "4" },
    { label: "5회", value: "5" },
    { label: "6회", value: "6" },
    { label: "7회", value: "7" },
  ]);
  const hideDropDown = () => {
    if (open1 === true) setOpen1(false);
    if (open2 === true) setOpen2(false);
  };

  // DateTimePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleDateConfirm = (date: Date) => {
    setStartDate(moment(date).format(`YYYY월-MM-DD`));
    setEndDate(moment(date).add(14, "days").format(`YYYY-MM-DD`));
    hideDatePicker();
  };
  const handleTimeConfirm = (time: Date) => {
    setTime(moment(time).format("h:mm"));
    hideTimePicker();
  };

  useEffect(() => {
    if (startDate && date && number && time) {
      setEndProgress(1);
      submitButtonDisable(false);
    }
    if (date && number) setSummedNumber((parseInt(date) * parseInt(number)).toString());
  }, [setNumber, handleTimeConfirm]);
  useEffect(() => {
    submitButtonDisable(true);
  }, []);
  const Width = Dimensions.get("window").width;
  // CreatedModalVisible
  const modalVisible = useRecoilValue(createdModalAtom);
  return (
    <TouchableWithoutFeedback onPress={hideDropDown}>
      <Wrapper>
        <Progress.Bar style={styles.progressBar} progress={endProgress} width={Width} height={2} />
        <Text style={styles.title}>도전작심 시간을 정해주세요</Text>
        <Text style={styles.subTitle}>모집 기간을 고려해서 정해주세요</Text>
        <View style={styles.textInputOneView}>
          {Platform.OS === "ios" ? (
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
                hideDropDown();
              }}
            >
              <TextInput
                value={startDate}
                style={[styles.startInput, { width: "100%" }]}
                placeholder="시작 날짜"
                placeholderTextColor={"#6F81A9"}
                editable={false}
                onSubmitEditing={() => {
                  console.warn("끝");
                }}
              />
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={() => {
                showDatePicker();
                hideDropDown();
              }}
            >
              <TextInput
                value={startDate}
                style={styles.startInput}
                placeholder="시작 날짜"
                placeholderTextColor={"#6F81A9"}
                editable={false}
              />
            </Pressable>
          )}

          <TextInput
            value={endDate}
            style={styles.endInput}
            placeholder="종료 날짜"
            placeholderTextColor={"#6F81A9"}
            editable={false}
          />
        </View>
        <View style={styles.guideView}>
          <Text style={[styles.guideText, { color: GREY }]}>
            <Entypo name="dot-single" />
            도전 작심 기간은 2주 동안으로 고정되어 있어요
          </Text>
        </View>
        <View style={styles.guideView}>
          <Text style={[styles.guideText, { color: GREY }]}>
            <Entypo name="dot-single" />
            시작 날짜까지 4명이 모이지 않으면 시작할 수 없어요
          </Text>
        </View>
        <View style={styles.guideView}>
          <Text style={[styles.guideText, { color: GREY }]}>
            <Entypo name="dot-single" />
            시작 날짜 이후에는 추가 인원을 받을 수 없어요
          </Text>
        </View>
        <VerifyTitle>
          인증 시간을 정해주세요<VerifyBlue> (총 {summedNumber}회 인증)</VerifyBlue>
        </VerifyTitle>
        <View style={styles.textInputView}>
          <DropDownPicker
            style={styles.dropDownBox}
            placeholderStyle={{ color: "#6F81A9" }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            selectedItemContainerStyle={styles.dropDownSelected}
            tickIconStyle={styles.dropDownTick}
            placeholder="날짜"
            onSelectItem={() => {
              setOpen2(true);
            }}
            onOpen={() => {
              setOpen2(false);
            }}
            open={open1}
            value={date}
            items={items1}
            setOpen={setOpen1}
            setValue={setDate}
            setItems={setItems1}
            autoScroll={true}
          />
          <DropDownPicker
            style={styles.dropDownBox}
            placeholderStyle={{ color: "#6F81A9" }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            selectedItemContainerStyle={styles.dropDownSelected}
            tickIconStyle={styles.dropDownTick}
            placeholder="횟수"
            onSelectItem={() => {
              setTimePickerVisibility(true);
            }}
            onOpen={() => {
              setOpen1(false);
            }}
            open={open2}
            value={number}
            items={items2}
            setOpen={setOpen2}
            setValue={setNumber}
            setItems={setItems2}
            autoScroll={true}
          />
          {Platform.OS === "ios" ? (
            <TextInput
              placeholderTextColor={GREY}
              style={styles.dropDownBox}
              placeholder="시간"
              value={time}
              onChangeText={setTime}
              onPressIn={() => {
                showTimePicker();
                hideDropDown();
              }}
              editable={false}
            />
          ) : (
            <Pressable
              onPress={() => {
                showTimePicker();
                hideDropDown();
              }}
            >
              <TextInput
                placeholderTextColor={GREY}
                style={styles.dropDownBox}
                placeholder="시간"
                value={time}
                onChangeText={setTime}
                editable={false}
              />
            </Pressable>
          )}
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          accentColor="#054DE4"
          confirmTextIOS="날짜 선택하기"
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
          modalStyleIOS={{ marginBottom: "50%", paddingHorizontal: "5%" }}
          locale="en_GB"
          confirmTextIOS="시간 설정하기"
        />
        <CreatedModal1 visible={modalVisible} />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0px 5%;
`;
const VerifyTitle = styled.Text`
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
`;
const VerifyBlue = styled.Text`
  font-weight: 300;
  color: blue;
`;
const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: -20,
    borderColor: "#fff",
  },
  title: {
    marginTop: 40,
    fontSize: 23,
    fontWeight: "600",
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 40,
    fontSize: 12,
  },
  textInputView: {
    flexDirection: "row",
    marginBottom: 10,
    width: "35%",
  },
  textInputOneView: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  startInput: {
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: "12%",
    color: "#101647",
    backgroundColor: "#F5F5FB",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 0.2,
    marginBottom: 20,
  },
  endInput: {
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: "12%",
    color: "#101647",
    backgroundColor: "#BFC7D7",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0.2,
    marginBottom: 20,
  },
  guideView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  guideText: {
    fontWeight: "400",
    fontSize: 12,
    color: "#6F81A9",
  },
  dropDownBox: {
    marginTop: 20,
    marginRight: 10,
    paddingHorizontal: 15,
    color: "#101647",
    borderColor: "#BFC7D7",
    backgroundColor: "#F5F5FB",
    borderRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderWidth: 1,
    width: 110,
  },
  dropDownContainerStyle: {
    width: 110,
    marginTop: 40,
    borderWidth: 0,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: "visible",
    shadowColor: "#c4c7cc",
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  dropDownSelected: {
    backgroundColor: "#BFC7D7",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  dropDownTick: {
    tintColor: "#0C53E2",
    backgroundColor: "#BFC7D7",
  },
});
