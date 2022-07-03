import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ProfileNavParamList } from "../../navigators";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary } from "react-native-image-picker";
import ProfileEditModal from "../../components/organisms/ProfileEditModal";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type DataType = {
    image: string,
    introduce: string
}

type ImageType = {
    fileName?: string | undefined,
    type?: string | undefined,
    uri?: string | undefined,
}

export default function ProfileEdit({ navigation }: StackScreenProps<ProfileNavParamList>) {
    const [data, setData] = useState<DataType>({
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1600px-A_black_image.jpg?20201103073518',
        introduce: "친구야, 나랑 작심하자!"
    })
    const [image, setImage] = useState<ImageType>({
        uri: data.image,
        type: '',
        fileName: data.image
    })
    const [textInputBorderColor, setTextInputBorderColor] = useState('#6F81A9')
    const [modalVisible, setModalVisible] = useState(false)
    const textInputRef = useRef<TextInput>(null)

    const onChangeText = (text: string) => {
        text.slice()
        if (text.length > 10)
            setTextInputBorderColor('#D75858')
        else
            setTextInputBorderColor('#044DE4')
    }

    const onPressComplete = () => {
        textInputRef.current?.blur()
        setModalVisible(true)
        setTextInputBorderColor('#6F81A9')
    }

    const onPressCamera = () => launchImageLibrary({ selectionLimit: 1, mediaType: 'photo' }, (response) => {
        textInputRef.current?.blur()
        if (response.assets) {
            setImage(response.assets[0])
        }
    })

    const singleTap = Gesture.Tap()
        .onStart(() => {
            textInputRef.current?.blur()
        });

    return <GestureDetector gesture={singleTap}>
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.topView}>
                <Text style={styles.topText}>프로필 수정</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back' size={24} color='#101647' />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressComplete}>
                    <Text style={styles.finishText}>완료</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomView}>
                <View style={styles.imageView}>
                    <Image source={{ uri: image.uri }} style={styles.image} />
                    <TouchableOpacity style={styles.cameraIconView} onPress={onPressCamera}>
                        <Icon name='camera-outline' color='#044DE4' size={24} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.textInputTitle}>작심 다짐하기</Text>
                <TextInput style={[styles.textInput, { borderColor: textInputBorderColor }]}
                    onChange={(e) => onChangeText(e.nativeEvent.text)} ref={textInputRef} />
                < View style={styles.guideView}>
                    <Text style={[styles.guideText, { color: textInputBorderColor == '#D75858' ? '#101647' : textInputBorderColor }]}>
                        <Entypo name='dot-single' /> 최대 10자 이하만 적을 수 있어요
                    </Text>
                    <Feather name="check" size={16} color={textInputBorderColor} />
                </View>
            </View>
            <ProfileEditModal visible={modalVisible} setVisible={setModalVisible} />
        </SafeAreaView >
    </GestureDetector>
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    topText: {
        color: '#101647',
        fontSize: 17,
        position: 'absolute',
        width: width,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10
    },
    finishText: {
        color: '#6F81A9',
        fontSize: 17
    },
    bottomView: {
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#0F2D6B33',
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
        alignSelf: 'center'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 13,
    },
    cameraIconView: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5FB',
        borderRadius: 13,
        position: 'absolute',
        bottom: -10,
        right: -20
    },
    textInputTitle: {
        color: '#6F81A9',
        marginTop: 50,
        marginBottom: 6,
        fontSize: 15
    },
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 17,
        borderRadius: 10,
        backgroundColor: '#F5F5FB',
        borderWidth: 1
    },
    guideView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    guideText: {
        fontSize: 12,
        textAlignVertical: 'center'
    }
})