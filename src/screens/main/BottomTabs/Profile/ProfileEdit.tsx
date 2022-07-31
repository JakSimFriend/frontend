import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileNavParamList } from "../../../../navigation";
import Feather from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import ProfileEditModal from "../../../../components/organisms/Modal/ProfileEditModal";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileIndicatorAtom, userIndexAtom } from "../../../../../atom";

type ImageType = {
  name?: string | undefined;
  type?: string | undefined;
  uri?: string | undefined;
};

export default function ProfileEdit({ navigation }: StackScreenProps<ProfileNavParamList>) {
  const [profileIndicator, setProfileIndicator] = useRecoilState(profileIndicatorAtom);
  const userIdx = useRecoilValue(userIndexAtom);
  const [promise, setPromise] = useState("");
  const [disable, setDisable] = useState(true);
  const [textInputBorderColor, setTextInputBorderColor] = useState("#6F81A9");
  const [modalVisible, setModalVisible] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const [image, setImage] = useState<ImageType>({
    uri: "",
    type: "image/jpeg",
    name: "test",
  });
  const singleTap = Gesture.Tap().onStart(() => {
    textInputRef.current?.blur();
  });

  const onChangeText = (text: string) => {
    text.slice();
    if (text.length > 10) setTextInputBorderColor("#D75858");
    else {
      setTextInputBorderColor("#044DE4");
      setDisable(false);
    }
  };

  const [datas, setDatas]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://jaksimfriend.site/profiles/${userIdx}/edit`)
      .then(function (response) {
        setDatas(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const postPromise = () => {
    axios
      .post(`https://jaksimfriend.site/profiles/promise`, {
        userIdx: userIdx,
        promise: promise,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const UploadImage = async () => {
    launchImageLibrary({ selectionLimit: 1, mediaType: "photo" }, (res: any) => {
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.errorCode) {
        console.log("ImagePicker Error: ", res.errorCode);
      } else if (res.assets) {
        setImage({
          uri:
            Platform.OS === "android"
              ? res.assets[0].uri
              : res.assets[0].uri.replace("file://", ""),
          name: res.assets[0].fileName,
          type: res.assets[0].type,
        });
      }
      setDisable(false);
    });
  };
  
  const postPhoto = () => {
    const formdata = new FormData();
    formdata.append("images", image);
    const headers = {
      "Content-Type": "multipart/form-data; boundary=someArbitraryUniqueString",
    };
    axios
      .post(`https://jaksimfriend.site/profiles/${userIdx}/image`, formdata, { headers: headers })
      .then((response) => {
        if (response) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };
  const onPressComplete = () => {
    postPhoto();
    postPromise();
    textInputRef.current?.blur();
    setModalVisible(true);
    setTextInputBorderColor("#6F81A9");
    setProfileIndicator(!profileIndicator);
  };
  return (
    <GestureDetector gesture={singleTap}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.topView}>
          <Text style={styles.topText}>프로필 수정</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#101647" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressComplete} disabled={disable}>
            <Text style={styles.finishText}>완료</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.imageView}>
            <Image source={{ uri: image.uri ? image.uri : datas.profile }} style={styles.image} />
            <TouchableOpacity style={styles.cameraIconView} onPress={UploadImage}>
              <Icon name="camera-outline" color="#044DE4" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textInputTitle}>작심 다짐하기</Text>
          <TextInput
            placeholder={datas.promise}
            style={[styles.textInput, { borderColor: textInputBorderColor }]}
            onChange={(e) => onChangeText(e.nativeEvent.text)}
            value={promise}
            onChangeText={setPromise}
            ref={textInputRef}
          />
          <View style={styles.guideView}>
            <Text
              style={[
                styles.guideText,
                { color: textInputBorderColor == "#D75858" ? "#101647" : textInputBorderColor },
              ]}
            >
              · 최대 10자 이하만 사용할 수 있어요
            </Text>
            <Feather name="check" size={16} color={textInputBorderColor} />
          </View>
        </View>
        <ProfileEditModal visible={modalVisible} setVisible={setModalVisible} />
      </SafeAreaView>
    </GestureDetector>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  },
  finishText: {
    color: "#6F81A9",
    fontSize: 17,
  },
  bottomView: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#0F2D6B33",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    marginTop: 90,
    flex: 1,
  },
  imageView: {
    marginTop: -60,
    alignSelf: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 13,
  },
  cameraIconView: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5FB",
    borderRadius: 13,
    position: "absolute",
    bottom: -10,
    right: -20,
  },
  textInputTitle: {
    color: "#6F81A9",
    marginTop: 50,
    marginBottom: 6,
    fontSize: 15,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 17,
    borderRadius: 10,
    backgroundColor: "#F5F5FB",
    borderWidth: 1,
  },
  guideView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  guideText: {
    fontSize: 12,
    textAlignVertical: "center",
  },
});
