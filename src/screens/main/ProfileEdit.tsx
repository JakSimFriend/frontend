import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileNavParamList } from "../../navigators";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import ProfileEditModal from "../../components/organisms/ProfileEditModal";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type DataType = {
  image: string;
  introduce: string;
};

type ImageType = {
  fileName?: string | undefined;
  type?: string | undefined;
  uri?: string | undefined;
};

export default function ProfileEdit({ navigation }: StackScreenProps<ProfileNavParamList>) {
  const [promise, setPromise] = useState("");
  const [data, setData] = useState<DataType>({
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1600px-A_black_image.jpg?20201103073518",
    introduce: "친구야, 나랑 작심하자!",
  });
  const [images, setImage] = useState<ImageType>({
    uri: data.image,
    type: "multipart/form-data",
    fileName: data.image,
  });
  const [textInputBorderColor, setTextInputBorderColor] = useState("#6F81A9");
  const [modalVisible, setModalVisible] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const onChangeText = (text: string) => {
    text.slice();
    if (text.length > 10) setTextInputBorderColor("#D75858");
    else setTextInputBorderColor("#044DE4");
  };

  const onPressComplete = () => {
    // postPromise();
    postPicture();
    textInputRef.current?.blur();
    setModalVisible(true);
    setTextInputBorderColor("#6F81A9");
  };

  const formdata = new FormData();
  const onPressCamera = () =>
    launchImageLibrary({ selectionLimit: 1, mediaType: "photo" }, (response) => {
      textInputRef.current?.blur();
      if (response.assets) {
        setImage(response.assets[0]);
        formdata.append("images", {
          images: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
      }
    });

  const singleTap = Gesture.Tap().onStart(() => {
    textInputRef.current?.blur();
  });

  const [datas, setDatas]: any = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/profiles/${userIdx}/edit`)
        .then(function (response) {
          setDatas(response.data.result);
        })
        .catch(function (error) {
          console.warn(error);
        });
    });
  }, []);

  const [userIndex, setUserIndex] = useState(0);
  AsyncStorage.getItem("userIdx", (err, result: any) => {
    setUserIndex(parseInt(result));
  });
  const postPromise = () => {
    axios
      .post(`https://jaksimfriend.site/profiles/promise`, {
        userIdx: userIndex,
        promise: promise,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  };
  const postPicture = async () => {
    // axios
    //   .post(
    //     `https://jaksimfriend.site/profiles/${userIndex}/image`,
    //     { body: formdata },
    //     {
    //       headers: { "content-type": "multipart/form-data" },
    //     },
    //   )
    //   .then(function (response) {
    //     console.warn(response.data);
    //   })
    //   .catch(function (error) {
    //     console.warn(error);
    //   });
    let res = await fetch(`https://jaksimfriend.site/profiles/${userIndex}/image`, {
      method: "post",
      body: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    let responseJson = await res.json();
    console.warn(responseJson);
  };

  return (
    <GestureDetector gesture={singleTap}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.topView}>
          <Text style={styles.topText}>프로필 수정</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#101647" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressComplete}>
            <Text style={styles.finishText}>완료</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.imageView}>
            
            {/* uri: datas.profile로 변경 */}
            <Image source={{ uri: images.uri }} style={styles.image} />
            <TouchableOpacity style={styles.cameraIconView} onPress={onPressCamera}>
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
              <Entypo name="dot-single" /> 최대 10자 이하만 적을 수 있어요
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
