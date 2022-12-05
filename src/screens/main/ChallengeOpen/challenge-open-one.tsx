import { Color } from "@src/assets/color";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import Feather from "react-native-vector-icons/AntDesign";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";

import { infoAtom, nextButtonAtom, tagsAtom, titleAtom } from "../../../common/atom";

export const ChallengeOpenOne = () => {
  const nextButtonDisable = useSetRecoilState(nextButtonAtom);
  const setTitles = useSetRecoilState(titleAtom);
  const setInfos = useSetRecoilState(infoAtom);
  const setTags = useSetRecoilState(tagsAtom);

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const tags = [tag1, tag2, tag3];

  useEffect(() => {
    setTitles(title);
    setInfos(info);
    setTags(tags);
  }, [title, info, tag1, tag2, tag3]);

  // 박스 border색상
  const [borderColor, setBorderColor] = useState(Color.blue[900]);
  const [borderColor2, setBorderColor2] = useState(Color.blue[900]);
  const [borderColor3, setBorderColor3] = useState(Color.blue[900]);
  const [borderColor4, setBorderColor4] = useState(Color.blue[900]);
  const [borderColor5, setBorderColor5] = useState(Color.blue[900]);

  // 박스 및 설명(가이드)색상
  const [guideColor1, setGuideColor1] = useState(Color.blue[900]);
  const [guideColor2, setGuideColor2] = useState(Color.blue[900]);
  const [guideColor3, setGuideColor3] = useState(Color.blue[900]);
  const [guideColor4, setGuideColor4] = useState(Color.blue[900]);

  //제목이벤트
  const onChangeTitle = (title: string) => {
    if (title.length === 0) {
      setBorderColor(Color.blue[900]);
      setGuideColor1(Color.blue[900]);
      nextButtonDisable(true);
      return;
    }
    if (title.length > 10) {
      setGuideColor1(Color.blue[1100]);
      nextButtonDisable(true);
    } else {
      setGuideColor1(Color.blue[100]);
      setBorderColor(Color.blue[100]);
      if (guideColor2 === Color.blue[100]) nextButtonDisable(false);
    }
  };
  //설명이벤트
  const onChangeInfo = (info: string) => {
    if (info.length === 0) {
      setGuideColor2(Color.blue[900]);
      setBorderColor2(Color.blue[900]);
      nextButtonDisable(true);
      return;
    }
    if (info.length > 0) {
      setGuideColor2(Color.blue[100]);
      setBorderColor2(Color.blue[100]);
      if (guideColor1 === Color.blue[100]) nextButtonDisable(false);
      return;
    }
  };
  //태그이벤트
  const onChangeTag1 = (tags: string) => {
    if (tags.length === 0) {
      setGuideColor3(Color.blue[900]);
      setGuideColor4(Color.blue[900]);
      setBorderColor3(Color.blue[900]);
      nextButtonDisable(false);
      return;
    }
    if (tags.length > 4) {
      setGuideColor3(Color.blue[1100]);
      nextButtonDisable(true);
    } else {
      setGuideColor3(Color.blue[100]);
      setBorderColor3(Color.blue[100]);
      if (guideColor1 && guideColor2 && borderColor4 && borderColor5 === Color.blue[100])
        nextButtonDisable(false);
      if (checkGuide(tags) === false) {
        setGuideColor4(Color.blue[1100]);
        nextButtonDisable(true);
      } else {
        setGuideColor4(Color.blue[100]);
        setBorderColor3(Color.blue[100]);
        if (guideColor1 && guideColor2 && borderColor4 && borderColor5 === Color.blue[100])
          nextButtonDisable(false);
      }
    }
  };
  const onChangeTag2 = (tags: string) => {
    if (tags.length === 0) {
      setGuideColor3(Color.blue[900]);
      setGuideColor4(Color.blue[900]);
      setBorderColor4(Color.blue[900]);
      nextButtonDisable(false);
      return;
    }
    if (tags.length > 4) {
      setGuideColor3(Color.blue[1100]);
      nextButtonDisable(true);
    } else {
      setGuideColor3(Color.blue[100]);
      if (guideColor1 && guideColor2 && borderColor3 && borderColor5 === Color.blue[100])
        nextButtonDisable(false);
      setBorderColor4(Color.blue[100]);
      if (checkGuide(tags) === false) {
        setGuideColor4(Color.blue[1100]);
        nextButtonDisable(true);
      } else {
        setGuideColor4(Color.blue[100]);
        setBorderColor4(Color.blue[100]);
        if (guideColor1 && guideColor2 && borderColor3 && borderColor5 === Color.blue[100])
          nextButtonDisable(false);
      }
    }
  };
  const onChangeTag3 = (tags: string) => {
    if (tags.length === 0) {
      setGuideColor3(Color.blue[900]);
      setGuideColor4(Color.blue[900]);
      setBorderColor5(Color.blue[900]);
      nextButtonDisable(false);
      return;
    }
    if (tags.length > 4) {
      setGuideColor3(Color.blue[1100]);
      nextButtonDisable(true);
    } else {
      setGuideColor3(Color.blue[100]);
      setBorderColor5(Color.blue[100]);
      if (guideColor1 && guideColor2 && borderColor3 && borderColor4 === Color.blue[100])
        nextButtonDisable(false);
      if (checkGuide(tags) === false) {
        setGuideColor4(Color.blue[1100]);
        nextButtonDisable(true);
      } else {
        setGuideColor4(Color.blue[100]);
        setBorderColor4(Color.blue[100]);
        if (guideColor1 && guideColor2 && borderColor3 && borderColor4 === Color.blue[100])
          nextButtonDisable(false);
      }
    }
  };

  const infoRef = useRef<TextInput | any>(null);
  const tagOneRef = useRef<TextInput | any>(null);
  const tagTwoRef = useRef<TextInput | any>(null);
  const tagThreeRef = useRef<TextInput | any>(null);
  useEffect(() => {
    nextButtonDisable(true);
  }, []);
  return (
    <Wrapper>
      <Progress.Bar style={styles.progressBar} progress={0.6} width={390} height={2} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>도전작심을 설명해주세요</Text>
          <SubTitle>제목</SubTitle>
          <View style={styles.textInputView}>
            <TextInput
              autoFocus
              autoCapitalize="sentences"
              placeholderTextColor={Color.blue[900]}
              style={[styles.titleTextInput, { borderColor: borderColor }]}
              value={title}
              onChangeText={setTitle}
              onChange={(e) => {
                onChangeTitle(e.nativeEvent.text);
              }}
              returnKeyType="next"
              onSubmitEditing={() => infoRef.current?.focus()}
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
          <View style={styles.guideView}>
            <Text style={[styles.guideText, { color: guideColor1 }]}>
              · 최대 10자 이하만 사용할 수 있어요
            </Text>
            <Feather name="check" size={16} />
          </View>
          <SubTitle>설명</SubTitle>
          <View style={styles.textInputView}>
            <TextInput
              ref={infoRef}
              placeholderTextColor={Color.blue[900]}
              style={[styles.infoTextInput, { borderColor: borderColor2 }]}
              value={info}
              onChangeText={setInfo}
              onChange={(e) => {
                onChangeInfo(e.nativeEvent.text);
              }}
              returnKeyType="next"
              onSubmitEditing={() => tagOneRef.current?.focus()}
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
          <View style={styles.guideView}>
            <Text style={[styles.guideText, { color: guideColor2 }]}>
              · 어떻게 인증 사진을 찍어야 하는지 알려주시면 좋아요
            </Text>
          </View>
          <TagTitle1>
            태그를 다시겠어요?<Option> (선택 사항)</Option>
          </TagTitle1>
          <TagTitle2>다른 작심친구들이 도전작심에 대해 알기 쉬워질 거에요</TagTitle2>
          <Tag>태그</Tag>
          <View style={styles.textInputView}>
            <TagsTextInput
              ref={tagOneRef}
              placeholderTextColor={Color.blue[900]}
              style={{ borderColor: borderColor3 }}
              value={tag1}
              onChangeText={setTag1}
              onChange={(e) => {
                onChangeTag1(e.nativeEvent.text);
              }}
              placeholder="#"
              maxLength={5}
              returnKeyType="next"
              onSubmitEditing={() => tagTwoRef.current?.focus()}
              autoCorrect={false}
              spellCheck={false}
            />
            <TagsTextInput
              ref={tagTwoRef}
              placeholderTextColor={Color.blue[900]}
              style={{ borderColor: borderColor4 }}
              value={tag2}
              onChangeText={setTag2}
              onChange={(e) => {
                onChangeTag2(e.nativeEvent.text);
              }}
              placeholder="#"
              maxLength={5}
              returnKeyType="next"
              onSubmitEditing={() => tagThreeRef.current?.focus()}
              autoCorrect={false}
              spellCheck={false}
            />
            <TagsTextInput
              ref={tagThreeRef}
              placeholderTextColor={Color.blue[900]}
              style={{ borderColor: borderColor5 }}
              value={tag3}
              onChangeText={setTag3}
              onChange={(e) => {
                onChangeTag3(e.nativeEvent.text);
              }}
              placeholder="#"
              maxLength={5}
              returnKeyType="done"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
          <View style={styles.lastView}>
            <Text style={[styles.guideText, { color: guideColor3 }]}>
              · 최대 4자 이하만 사용할 수 있어요
            </Text>
            <Feather name="check" size={16} />
          </View>
          <View style={styles.guideView}>
            <Text style={[styles.guideText, { color: guideColor4, marginBottom: 80 }]}>
              · 영문, 특수문자, 띄어쓰기는 빼주세요
            </Text>
            <Feather name="check" size={16} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

const checkGuide = (tags: string) => {
  const korRule = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
  return korRule.test(tags);
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0 5%;
`;
const SubTitle = styled.Text`
  color: Color.blue[900];
  font-size: 15px;
  margin-bottom: 10px;
`;
const TagTitle1 = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;
const Option = styled.Text`
  font-weight: 300;
  color: blue;
`;
const TagTitle2 = styled.Text`
  font-size: 13px;
  margin-top: 10px;
`;
const Tag = styled.Text`
  color: Color.blue[900];
  font-size: 15px;
  margin-top: 30px;
`;
const TagsTextInput = styled.TextInput`
  margin: 10px 5px 0 0;
  padding: 15px;
  background-color: #f5f5fb;
  border-radius: 10px;
  border-width: 1px;
  width: 32%;
  justify-content: space-between;
`;
const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: -25,
    borderColor: "#fff",
  },
  header: {
    fontSize: 20,
    color: "#101647",
    fontWeight: "600",
    marginTop: 40,
    marginBottom: 40,
  },
  textInputView: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  titleTextInput: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    color: "#101647",
    backgroundColor: "#F5F5FB",
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  infoTextInput: {
    paddingTop: 10,
    paddingBottom: 80,
    paddingHorizontal: 10,
    color: "#101647",
    backgroundColor: "#F5F5FB",
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  guideView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginRight: 10,
  },
  lastView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginRight: 10,
  },
  guideText: {
    fontWeight: "400",
    fontSize: 12,
    color: "#6F81A9",
  },
});
