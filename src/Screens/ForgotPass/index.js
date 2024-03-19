import React, {useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

import images from '../../index';
import IconF from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {SH, SF, SW, Colors} from '../../utils';
import Login from '../../styles/CommonStyle/LoginScreenStyle';
import {useTranslation} from 'react-i18next';
import Languages from '../../Language/i18n';
import styles from './styles';
const ForgotPass = ({navigation}) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.Container}>
      <View
        style={styles.firstHalfView}>
        <Text
          style={styles.forgotstyle}>
          {t('ForgotPassword')}
        </Text>
        <Image source={images.halalogo} style={styles.imgstyleS} />
      </View>
      <View
        style={styles.secondHalfView}>
        <TouchableOpacity
          style={styles.touchablestyleW}
          onPress={() => navigation.navigate('Forgotemail')}>
          <View style={{flexDirection: 'row'}}>
            <FontC
              size={SF(20)}
              name="email-outline"
              style={styles.Iconstyle}
              color={'black'}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.btntextB}>{t('ResetviaEmail')}</Text>
              <Text style={styles.btntextS}>
                Link reset will be send to your email address
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={SplashStyl.touchablestyleW}
          onPress={() => navigation.navigate('Forgotemail')}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              size={SF(20)}
              name="phone"
              style={SplashStyl.Iconstyle}
              color={'black'}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={SplashStyl.btntextB}>{t('SendviaSMS')}</Text>
              <Text style={SplashStyl.btntextS}>
                Link reset will be send to your email address
              </Text>
            </View>
     
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.1,
          //backgroundColor: 'pink',
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <TouchableOpacity
          style={SplashStyl.touchablestyle}
          onPress={() => navigation.navigate('OTPVerify')}>
          <Text style={SplashStyl.btntext}>{t('SendRequest')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPass;
