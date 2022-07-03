import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingNavParamList } from '../../../navigators/SettingNav';

export default function PrivacyPolicy({ navigation }: StackScreenProps<SettingNavParamList>) {
    const text = `개인정보처리방침`

    return <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
            <View style={styles.topView}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name='arrow-back' size={24} color='#101647' />
                </TouchableOpacity>
                <Text style={styles.topText}>개인 정보 처리 방침</Text>
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