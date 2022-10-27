import Clipboard from "@react-native-clipboard/clipboard";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface NickNameModal4Props {
  visible: boolean;
  setVisible: (value: (value: boolean) => boolean) => void;
}

export default function ProfileModal({ visible, setVisible }: NickNameModal4Props) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>추천인 되고{"\n"}1,000C 받아가세요!</Text>
          <Text style={styles.text2}>
            초대받은 사람이 추천인으로{"\n"}
            <Text style={{ color: "#044DE4" }}>내 닉네임</Text>을 입력하면{"\n"}1,000C를 받을 수
            있어요!
          </Text>
          <Text style={styles.text3}>앱 링크를 복사하시겠어요?</Text>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible(() => false)}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                Clipboard.setString("https://www.apple.com/kr/app-store/");
                setVisible(() => false);
              }}
            >
              <Text style={styles.confirmButtonText}>링크 복사</Text>
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
    paddingTop: 30,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  text1: {
    fontWeight: "600",
    fontSize: 28,
    color: "#101647",
    lineHeight: 34,
  },
  text2: {
    fontWeight: "400",
    fontSize: 17,
    color: "#101647",
    marginTop: 30,
    lineHeight: 25,
  },
  text3: {
    fontWeight: "400",
    fontSize: 17,
    color: "#6F81A9",
    marginTop: 50,
  },
  bottomView: {
    marginTop: 20,
    flexDirection: "row",
  },
  cancelButton: {
    borderRadius: 10,
    marginRight: 4,
    backgroundColor: "#F5F5FB",
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#6F81A9",
  },
  confirmButton: {
    borderRadius: 10,
    marginLeft: 4,
    backgroundColor: "#044DE4",
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
