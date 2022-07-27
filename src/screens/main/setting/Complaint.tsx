import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SettingNavParamList } from "../../../navigators/SettingNav";
import axios from "axios";

export default function Complaint({ navigation }: StackScreenProps<SettingNavParamList>) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(title.length == 0 || content.length == 0);
  }, [title, content]);

//   const post = () => {
//     axios
//       .post("https://jaksimfriend.site/my-challenges/reward", {
//         title: title,
//         content:content,
//         userIdx:16
//       })
//       .then(function (response) {
//         console.log("성공");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.topView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#101647" />
          </TouchableOpacity>
          <Text style={styles.topText}>공지사항</Text>
          <Ionicons name="arrow-back" size={24} color="#0000" />
        </View>
        <View style={styles.row}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name="chatbubble" color="#044DE4" size={24} />
            </View>
            <Text style={styles.text}>문의하기</Text>
          </View>
        </View>
        <Text style={styles.label}>제목</Text>
        <TextInput style={styles.textInput} value={title} onChangeText={setTitle} />
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={[styles.textInput, { height: 280 }]}
          value={content}
          onChangeText={setContent}
          multiline={true}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonDisabled ? "#F5F5FB" : "#044DE4" }]}
        disabled={buttonDisabled}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, { color: buttonDisabled ? "#6F81A9" : "#fff" }]}>
          전송하기
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  topText: {
    color: "#101647",
    fontSize: 17,
    fontWeight: "600",
    alignSelf: "center",
  },
  title: {
    color: "#101647",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    backgroundColor: "#F5F5FB",
    borderRadius: 13,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingLeft: 10,
    color: "#101647",
    fontWeight: "400",
    fontSize: 17,
  },
  label: {
    marginTop: 30,
    fontSize: 15,
    color: "#6F81A9",
  },
  textInput: {
    fontSize: 17,
    color: "#6F81A9",
    paddingTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 6,
    borderRadius: 10,
    borderColor: "#BFC7D7",
    borderWidth: 1,
  },
  button: {
    position: "absolute",
    bottom: 32,
    left: 20,
    right: 20,
    borderRadius: 13,
    backgroundColor: "#F5F5FB",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 20,
  },
});
