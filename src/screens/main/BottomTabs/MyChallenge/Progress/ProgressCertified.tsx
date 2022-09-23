import React, { useState } from "react";
import { ImageBackground, Platform, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import Cameras from "react-native-vector-icons/AntDesign";
import { GradientButtons } from "../../../../../components/atoms/GradientButtons";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { CertifiedAtom, CertifiedFailAtom, userIndexAtom } from "../../../../../common/atom";
import CertifiedModal from "../../../../../components/organisms/Modal/CertifiedModal";
import CertifiedFailModal from "../../../../../components/organisms/Modal/CertifiedFailModal";

type RouteParams = {
  route: {
    params: {
      challengeIdx: number;
      certification: number;
    };
  };
};
type ImageType = {
  name?: string | undefined;
  type?: string | undefined;
  uri?: string | undefined;
};

export const ProgressCertified = ({ route }: RouteParams) => {
  const { challengeIdx, certification } = route.params;
  const navigation: any = useNavigation();
  const [certified, setCertified] = useState(false);
  const [modalVisible, setModalVisible] = useRecoilState(CertifiedAtom);
  const [modalTwoVisible, setModalTwoVisible] = useRecoilState(CertifiedFailAtom);
  const userIdx = useRecoilValue(userIndexAtom);
  const [modalIndex, setModalIndex] = useState(10);
  const [certifiedPercent, setCertifiedPercent]: any = useState([]);

  const [image, setImage] = useState<ImageType>({
    uri: "",
    type: "image/jpeg",
    name: "test",
  });
  const UploadImage = () => {
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
        setCertified(true);
      }
    });
  };
  const postPhoto = async () => {
    const formdata = new FormData();
    formdata.append("images", image);
    const headers = {
      "Content-Type": "multipart/form-data; boundary=someArbitraryUniqueString",
    };
    await axios
      .post(
        `https://jaksimfriend.site/my-challenges/${challengeIdx}/${userIdx}/certification`,
        formdata,
        { headers: headers },
      )
      .then((response) => {
        if (response.data.code === 3035) {
          setModalIndex(1);
        } else if (response.data.code === 1000) {
          setCertifiedPercent(response.data.result);
          setModalIndex(0);
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
  const openModal = () => {
    modalIndex === 0 ? setModalVisible(true) : setModalTwoVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <Title>사진 등록하기</Title>
        <SubTitle>오늘도 작심한 것을 인증해주세요!</SubTitle>
        <PhotoBox>
          <ImageBackground
            source={{ uri: image.uri }}
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
            borderRadius={15}
          />
          <Cameras name="camerao" size={25} color={"#054de4"} />
          <CameraText>도전작심 규칙을 참고하셔서{`\n`}인증할 수 있는 사진을 올려주세요!</CameraText>
        </PhotoBox>
        <InfoButton
          onPress={() => {
            navigation.navigate("ProgressPageInfo", {
              challengeIdx: challengeIdx,
            });
          }}
        >
          <InfoButtonText>도전작심 정보</InfoButtonText>
        </InfoButton>
        {certified ? (
          <GradientButtonWrapper>
            <GradientButtons
              onPress={() => {
                postPhoto();
                openModal();
              }}
              Title="인증 완료!"
            />
          </GradientButtonWrapper>
        ) : (
          <GradientButtonWrapper>
            <GradientButtons onPress={UploadImage} Title="사진 촬영해서 인증하기" />
          </GradientButtonWrapper>
        )}
      </Wrapper>
      <CertifiedModal visible={modalVisible} certifiedPercent={certifiedPercent} />
      <CertifiedFailModal visible={modalTwoVisible} />
    </SafeAreaView>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 70px 25px 0 25px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const SubTitle = styled.Text`
  margin-top: 20px;
  font-size: 13px;
`;
const PhotoBox = styled.View`
  margin-top: 30px;
  height: 50%;
  border-radius: 15px;
  background-color: #f6f5fb;
  align-items: center;
  justify-content: center;
`;
const CameraText = styled.Text`
  margin-top: 30px;
  text-align: center;
`;
const InfoButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #f6f5fb;
  border-radius: 15px;
  margin-top: 20px;
  align-items: center;
  align-self: center;
  width: 40%;
`;
const InfoButtonText = styled.Text`
  color: #6f81a9;
`;
const GradientButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  align-self: center;
  width: 90%;
  margin-bottom: 10%;
`;
