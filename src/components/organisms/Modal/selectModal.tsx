import Clipboard from "@react-native-clipboard/clipboard";
import { Color } from "@src/assets/color";
import React from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface SelectModalProps {
  visible: boolean;
  title: string;
  body: React.ReactChild;
  leftFn: () => void;
  leftContent: string;
  rightFn: () => void;
  rightContent: string;
}

const SelectModal=({
  visible,
  title,
  body,
  leftFn,
  leftContent,
  rightFn,
  rightContent,
}: SelectModalProps)=> {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>{title}</Text>
          {body}
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => leftFn()}>
              <Text style={styles.cancelButtonText}>{leftContent}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => rightFn()}>
              <Text style={styles.confirmButtonText}>{rightContent}</Text>
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
    backgroundColor: Color.white[100],
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
    color: Color.black["blue"],
    lineHeight: 34,
  },
  text2: {
    fontWeight: "400",
    fontSize: 17,
    color: Color.black["blue"],
    marginTop: 30,
    lineHeight: 25,
  },
  text3: {
    fontWeight: "400",
    fontSize: 17,
    color: Color.blue[900],
    marginTop: 50,
  },
  bottomView: {
    marginTop: 20,
    flexDirection: "row",
  },
  cancelButton: {
    borderRadius: 10,
    marginRight: 4,
    backgroundColor: Color.white[100],
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: Color.blue[900],
  },
  confirmButton: {
    borderRadius: 10,
    marginLeft: 4,
    backgroundColor: Color.blue[100],
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: Color.white[100],
  },
});

export default SelectModal