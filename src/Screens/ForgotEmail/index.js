import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import images from '../../index';
import IconF from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {SH, SF, SW, Colors} from '../../utils';
import {confirmemail} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
import {useTranslation} from 'react-i18next';
const Forgotemail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getFromLocalStorage('@UserToken');
        console.log('getItem=======', storedToken);
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const forgotpass = async () => {
    const data = {
      email: email,
      token: token,
      //token: token,
      // password1: password1,
      // password2: password2,
      // resetToken: token,
    };
    console.log('data=======', data);
    const response = await confirmemail(data);

    console.log('confirmemail==========', response);
    navigation.navigate('OTPVerify', {email});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={SplashStyl.Container}>
        <View
          style={{
            flex: 0.4,

            width: '100%',
            justifyContent: 'center',
            alignItem: 'center',
            //backgroundColor: 'red',
          }}>
          <Text
            style={{
              color: '#293170',
              fontWeight: '800',
              justifyContent: 'center',
              alignItem: 'center',
              textAlign: 'center',
              fontSize: SF(20),
              margin: 10,
            }}>
            Forgot Password
          </Text>
          <Image source={images.halalogo} style={SplashStyl.imgstyleS} />
        </View>

        {/* <Text>Event Management made easy</Text> */}
        <View
          style={{
            flex: 0.1,
            //backgroundColor: 'green',
            width: '100%',
            justifyContent: 'center',
            marginLeft: 72,
          }}>
          <Text
            style={{
              justifyContent: 'space-between',
              alignItem: 'center',
              textAlign: 'center',
              fontSize: SF(12),
              width: '80%',
            }}>
            {t('forgotemilfirsttext')}
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
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
                size={SF(25)}
                name="email-outline"
                style={SplashStyl.Iconstyle}
                color={'black'}
              />
              <TextInput
                style={SplashStyl.input}
                placeholder={t('Email')}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'black'}
              />
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: SF(12), textAlign: 'center', color: 'black'}}>
            {t('forgotemailsecondtext')}
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            //backgroundColor: 'pink',
            width: '100%',
            justifyContent: 'center',
            alignItem: 'center',
          }}>
          <TouchableOpacity
            style={SplashStyl.touchablestyle}
            onPress={() => forgotpass()}

            // onPress={() => navigation.navigate('OTPVerify')}
          >
            <Text style={SplashStyl.btntext}>{t('Continue')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Forgotemail;
