import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SettingNavParamList } from "../../../navigators/SettingNav";

type NotificationDetailData = {
    title: string;
    time: string;
    content: string;
}

export default function NotificationDetail({ navigation }: StackScreenProps<SettingNavParamList>) {
    const [data, setData] = useState<NotificationDetailData>({
        title: '공지 사항 제목',
        time: '2022/01/20 10:00',
        content: '공지 사항 내용',
    });

    return <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.topView}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name='arrow-back' size={24} color='#101647' />
                </TouchableOpacity>
                <Text style={styles.topText}>공지사항</Text>
                <Ionicons name='arrow-back' size={24} color='#0000' />
            </View>
            <View style={styles.row}>
                <View style={styles.leftView}>
                    <View style={styles.iconView}>
                        <Ionicons name='notifications' color='#044DE4' size={24} />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.title}>{data?.title}</Text>
                        <Text style={styles.time}>{data?.time}</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
            <Text style={styles.content}>{data.content}</Text>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    topText: {
        color: '#101647',
        fontSize: 17,
        fontWeight: '600',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    leftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconView: {
        backgroundColor: '#F5F5FB',
        borderRadius: 13,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView: {
        paddingLeft: 10,
    },
    title: {
        color: '#101647',
        fontWeight: '400',
        fontSize: 17,
    },
    time: {
        color: '#BFC7D7',
        fontSize: 13,
        fontWeight: '400',
    },
    content: {
        marginTop: 20,
        color: '#101647',
        fontSize: 17,
    }
})