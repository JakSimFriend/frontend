import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingNavParamList } from '../../../navigators/SettingNav';

export default function TOS({ navigation }: StackScreenProps<SettingNavParamList>) {
    const text = `이용약관 내용 수정 중`

    return <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
            <View style={styles.topView}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name='arrow-back' size={24} color='#101647' />
                </TouchableOpacity>
                <Text style={styles.topText}>이용약관</Text>
                <Ionicons name='arrow-back' size={24} color='#0000' />
            </View>
            <Text style={styles.text}>{text}</Text>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    topText: {
        color: '#101647',
        fontSize: 17,
        fontWeight: '600',
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        color: '#101647',
        marginTop: 20,
    }
})