import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';

import images from '../../index';
import {SH, SF, SW, Colors} from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import IconF from 'react-native-vector-icons/FontAwesome';
import Languages from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
import Login from '../../styles/CommonStyle/LoginScreenStyle';
import {onGoogleButtonPress} from '../../SocailLogins/index';

const RegistrationScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [opacity] = useState(new Animated.Value(1));

  const onGoogleLogin = () => {
    onGoogleButtonPress()
      .then(res => {
        console.log(
          '🚀 ~ file: index.js:71 ~ onGoogleButtonPress ~ res.data:',
          res.data,
        );
       
      })
      .catch(err => {
        console.log('errerrrrrr');
       
      });
  };

  return (
    <View style={SplashStyl.Container}>
      <View
        style={SplashStyl.HalfView}>
        <Image source={images.halalogo} style={SplashStyl.imgstyle} />
      </View>

   
      <View style={SplashStyl.buttonContainer}>
        {Platform.OS === 'ios' ? (
          <>
            <TouchableOpacity
              style={SplashStyl.touchablestyleIcon}
              onPress={() => navigation.navigate('AppleLogin')}>
              <View>
                <IconF
                  size={SF(20)}
                  name="apple"
                  style={SplashStyl.Iconstyle}
                  color={'white'}
                />
                <Text style={SplashStyl.btntext}>continue_with_apple</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={SplashStyl.touchablestyle}
              onPress={() => navigation.navigate('PhoneOrEmailLogin')}>
              <View>
                <IconF
                  size={SF(20)}
                  name="phone"
                  style={SplashStyl.Iconstyle}
                  color={'white'}
                />
                <Text style={SplashStyl.btntext}>
                  continue_with_phone_or_email
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{width: '90%'}}>
            <TouchableOpacity
              style={
                SplashStyl.touchablestyleIcon
              
                
                
              }
              onPress={() => navigation.navigate('GoogleLogin')}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: '10%',
                  justifyContent: 'center',
                }}>
                <IconF
                  size={SF(20)}
                  name="phone"
                  style={SplashStyl.Iconstyle}
                  color={'white'}
                />
                <Text style={SplashStyl.Continuebtntext}>
                  {t('continue_with_phone_or_email')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                SplashStyl.touchablestyleIcon
               
              }
              onPress={onGoogleLogin}>
            
              <Image
                source={images.google}
                size={SF(27)}
                style={SplashStyl.GoogleIconstyle}
              />
              <Text style={SplashStyl.btntext}>
                {t('continue_with_google')}
              </Text>
      
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{flexDirection: 'end'}}>
        <Image
          source={images.wallbackground}
          size={SF(27)}
          style={SplashStyl.googleimg}
        />
      </View>
    </View>
  );
};

export default RegistrationScreen;

