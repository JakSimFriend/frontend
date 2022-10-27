import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LogOutWithKakao } from "../../../components/molecules/authentication/LogoutButton";

export interface LogoutModalProps {
  visible: boolean;
  setVisible: (value: (value: boolean) => boolean) => void;
}

export default function LogoutModal({ visible, setVisible }: LogoutModalProps) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>로그아웃 하시겠어요?</Text>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible(() => false)}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <LogOutWithKakao />
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
    paddingTop: 26,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 13,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  text: {
    fontWeight: "400",
    fontSize: 17,
    color: "#101647",
    textAlign: "center",
  },
  bottomView: {
    marginTop: 31,
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
