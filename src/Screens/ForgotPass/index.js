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
const ForgotPass = ({navigation}) => {
  const {t, i18n} = useTranslation();
  //   useEffect(() => {
  //     setTimeout(() => {
  //       //navigation.navigate('RegistrationScreen');
  //     }, 1000);
  //   }, [navigation]);

  return (
    <View style={SplashStyl.Container}>
      <View
        style={{
          flex: 0.4,
          //backgroundColor: 'green',
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <Text
          style={{
            color: '#293170',
            fontWeight: '800',
            justifyContent: 'center',
            alignItem: 'center',
            textAlign: 'center',
            fontSize: SF(20),
            margin: 20,
          }}>
          {t('ForgotPassword')}
        </Text>
        <Image source={images.halalogo} style={SplashStyl.imgstyleS} />
      </View>

      {/* <Text>Event Management made easy</Text> */}
      <View
        style={{
          flex: 0.4,
          //backgroundColor: 'red',
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <TouchableOpacity
          style={SplashStyl.touchablestyleW}
          onPress={() => navigation.navigate('Forgotemail')}>
          <View style={{flexDirection: 'row'}}>
            <FontC
              size={SF(20)}
              name="email-outline"
              style={SplashStyl.Iconstyle}
              color={'black'}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={SplashStyl.btntextB}>{t('ResetviaEmail')}</Text>
              <Text style={SplashStyl.btntextS}>
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
            {/* <Text style={SplashStyl.btntextB}>{t('SendviaSMS')}</Text> */}
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

        {/* <View style={Login.NotRegisterView}>
          <Text style={Login.NotRegisterText}>{t('Notregister')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={Login.NotRegisterText}>{t('Createaccount')}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default ForgotPass;
