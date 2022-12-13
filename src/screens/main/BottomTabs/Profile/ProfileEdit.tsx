import { StackScreenProps } from "@react-navigation/stack";
import { Color } from "@src/assets/color";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import Feather from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRecoilState, useRecoilValue } from "recoil";

import { profileIndicatorAtom, userIdxAtom } from "../../../../common/atom";
import { ProfileNavParamList } from "../../../../navigation";

type ImageType = {
  base64?: string;
  name?: string | undefined;
  type?: string | undefined;
  uri?: string | undefined;
};

export default function ProfileEdit({ navigation }: StackScreenProps<ProfileNavParamList>) {
  const [profileIndicator, setProfileIndicator] = useRecoilState(profileIndicatorAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const [promise, setPromise] = useState("");
  const [disable, setDisable] = useState(true);
  const [textInputBorderColor, setTextInputBorderColor] = useState("#6F81A9");
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
    text.trim();
    if (text.length > 10) {
      setTextInputBorderColor("#D75858");
      setDisable(true);
    } else {
      setTextInputBorderColor("#044DE4");
      setDisable(false);
    }
  };

  const [data, setData]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://eddy-pl.com/api/profiles/${userIdx}/edit`)
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const postPromise = () => {
    axios
      .post(`https://eddy-pl.com/api/profiles/promise`, {
        userIdx: userIdx,
        promise: promise,
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const UploadImage = async () => {
    launchImageLibrary(
      { selectionLimit: 1, mediaType: "photo", includeBase64: true },
      (res: any) => {
        if (res.didCancel) {
          console.log("User cancelled image picker");
        } else if (res.errorCode) {
          console.log("ImagePicker Error: ", res.errorCode);
        } else if (res.assets) {
          setImage({
            ...res.assets[0],
            uri:
              Platform.OS === "android"
                ? res.assets[0].uri
                : res.assets[0].uri.replace("file://", ""),
            name: res.assets[0].fileName,
            type: res.assets[0].type,
          });
        }
        setDisable(false);
      },
    );
  };

  const postPhoto = () => {
    if (!image.uri) return;
    return axios
      .post(`https://eddy-pl.com/file/image`, {
        image: image.base64,
        type: image.type,
        category: "profile",
        primaryKey: userIdx,
      })
      .then(({ data }) =>
        axios
          .post(
            `https://eddy-pl.com/api/profiles/${userIdx}/image`,
            { url: data.imageUrl },
            { headers: { "Content-Type": "application/json" } },
          )
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }),
      )
      .catch((err) => console.log(err));
  };
  const onPressComplete = () => {
    Promise.all([postPhoto(), postPromise(), setProfileIndicator(!profileIndicator)]).then(() =>
      navigation.navigate("Profile"),
    );
  };
  return (
    <GestureDetector gesture={singleTap}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#101647" />
            </TouchableOpacity>
            <Text style={styles.title}>프로필 수정</Text>
          </View>
          <TouchableOpacity onPress={onPressComplete} disabled={disable}>
            <Ionicons
              name="checkmark"
              size={24}
              color={!disable ? Color.blue[300] : Color.gray[600]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.imageView}>
            {data?.profile ? (
              <Image source={{ uri: data.profile }} style={styles.image} />
            ) : (
              <View style={{ ...styles.image, ...styles.emptyImage }} />
            )}
            <TouchableOpacity style={styles.cameraIconView} onPress={UploadImage}>
              <Icon name="camera-outline" color="#044DE4" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textInputTitle}>작심 다짐하기</Text>
          <TextInput
            placeholder={data?.promise}
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
      </SafeAreaView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    marginLeft: 20,
    fontWeight: "bold",
  },
  finishText: {
    color: "#6F81A9",
    fontSize: 17,
  },
  body: {
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
    position: "absolute",
    top: -60,
    alignSelf: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 13,
  },
  emptyImage: {
    backgroundColor: "black",
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
    marginTop: 100,
    marginBottom: 6,
    fontSize: 15,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 6,
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
