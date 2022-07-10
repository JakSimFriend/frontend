import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogoutModal from "../../../components/organisms/LogoutModal";
import WithdrawalModal from "../../../components/organisms/WithdrawalModal";
import { SettingNavParamList } from "../../../navigators/SettingNav";

export const Setting = ({ navigation }: StackScreenProps<SettingNavParamList>) => {
  const [switchEnable, setSwitchEnable] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
        <View style={styles.topView}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons name='arrow-back' size={24} color='#101647' />
          </TouchableOpacity>
          <Text style={styles.topText}>설정</Text>
          <Ionicons name='arrow-back' size={24} color='#0000' />
        </View>
        <Text style={styles.title}>알림 설정</Text>
        <View style={styles.row}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name={'notifications' + (switchEnable ? '' : '-outline')} color={switchEnable ? '#044DE4' : '#101647'} size={24} />
            </View>
            <Text style={styles.text}>미달성 도전작심 알림 받기</Text>
          </View>
          <Switch value={switchEnable} onValueChange={setSwitchEnable}
            trackColor={{ true: '#044DE4', false: '#F5F5FB' }} thumbColor={switchEnable ? '#fff' : '#BFC7D7'}
            style={{ width: 60 }} />
        </View>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
        <Text style={styles.title}>이용 설정</Text>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Notification')}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name='notifications-outline' color='#101647' size={24} />
            </View>
            <Text style={styles.text}>공지 사항</Text>
          </View>
          <Ionicons name='chevron-forward' color='#101647' size={18} />
        </TouchableOpacity>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Complaint')}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name='chatbubble-outline' color='#101647' size={24} />
            </View>
            <Text style={styles.text}>문의하기</Text>
          </View>
          <Ionicons name='chevron-forward' color='#101647' size={18} />
        </TouchableOpacity>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('TOS')}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name='settings-outline' color='#101647' size={24} />
            </View>
            <Text style={styles.text}>이용 약관</Text>
          </View>
          <Ionicons name='chevron-forward' color='#101647' size={18} />
        </TouchableOpacity>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name='settings-outline' color='#101647' size={24} />
            </View>
            <Text style={styles.text}>개인 정보 처리 방침</Text>
          </View>
          <Ionicons name='chevron-forward' color='#101647' size={18} />
        </TouchableOpacity>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChallengeTOS')}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name='settings-outline' color='#101647' size={24} />
            </View>
            <Text style={styles.text}>도전작심 개설 약관</Text>
          </View>
          <Ionicons name='chevron-forward' color='#101647' size={18} />
        </TouchableOpacity>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
        <TouchableOpacity style={styles.row} onPress={() => setLogoutModalVisible(true)}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name='log-out-outline' color='#101647' size={24} />
            </View>
            <Text style={styles.text}>로그아웃</Text>
          </View>
          <Ionicons name='chevron-forward' color='#101647' size={18} />
        </TouchableOpacity>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
        <TouchableOpacity style={styles.row} onPress={() => setWithdrawalModalVisible(true)}>
          <View style={styles.leftView}>
            <View style={styles.iconView}>
              <Ionicons name='person-remove-outline' color='#101647' size={24} />
            </View>
            <Text style={styles.text}>회원 탈퇴</Text>
          </View>
          <Ionicons name='chevron-forward' color='#101647' size={18} />
        </TouchableOpacity>
        <View style={{ height: 1, width: '100%', backgroundColor: '#F5F5FB', marginTop: 10 }} />
      </ScrollView>
      <LogoutModal visible={logoutModalVisible} setVisible={setLogoutModalVisible} />
      <WithdrawalModal visible={withdrawalModalVisible} setVisible={setWithdrawalModalVisible} />
    </SafeAreaView>
  );
};

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
  title: {
    color: '#101647',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 20
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
  text: {
    paddingLeft: 10,
    color: '#101647',
    fontWeight: '400',
    fontSize: 17,
  }
})