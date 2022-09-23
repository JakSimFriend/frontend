import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { progressIndexAtom, reportModalOne, reportModalTwo, userIndexAtom } from "../../../common/atom";
import axios from "axios";

export default function ReportModalOne() {
  const progressIndex = useRecoilValue(progressIndexAtom);
  const modalVisible = useRecoilValue(reportModalOne);
  const userIdx = useRecoilValue(userIndexAtom);
  const setModalOneVisible = useSetRecoilState(reportModalOne);
  const setModalTwoVisible = useSetRecoilState(reportModalTwo);

  const postReport = () => {
    axios
      .post("https://jaksimfriend.site/settings/report", {
        userIdx: userIdx,
        challengeIdx: progressIndex,
        certificationIdx: 0,
      })
      .then(function (response) {
        console.log("성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>신고하시겠어요?</Text>
          <View style={styles.ButtonWrapper}>
            <TouchableOpacity
              style={styles.CancelButton}
              onPress={() => {
                setModalOneVisible(false);
              }}
            >
              <Text style={styles.CancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ReportButton}
              onPress={() => {
                setModalOneVisible(false);
                setModalTwoVisible(true);
              }}
            >
              <Text style={styles.ReportButtonText}>신고</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1016474D",
    justifyContent: "center",
    paddingHorizontal: 45,
  },
  container: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  text1: {
    fontSize: 17,
    marginBottom: 20,
  },
  ButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  CancelButton: {
    paddingVertical: 15,
    paddingHorizontal: 45,
    backgroundColor: "#F6F5FB",
    borderRadius: 15,
  },
  CancelButtonText: {
    color: "#6F81A9",
  },
  ReportButton: {
    paddingVertical: 15,
    paddingHorizontal: 45,
    backgroundColor: "#054DE4",
    borderRadius: 15,
  },
  ReportButtonText: {
    color: "#ffffff",
  },
});
