import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated } from 'react-native';
import images from '../../index';
import { SH, SF, SW, Colors } from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome';
import Languages from '../../Language/i18n';
import { useTranslation } from 'react-i18next';
import { onGoogleButtonPress } from '../../SocailLogins/index';
import {setItemInLocalStorage} from '../../Services/Api';
import styles from './styles';
const RegistrationScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [opacity] = useState(new Animated.Value(1));

  const onGoogleLogin = () => {
    onGoogleButtonPress()
      .then(res => {
        console.log('Google sign-in successful:', res);
        if (res?.data) {
          const {accessToken, id, email} = res?.data;
          setItemInLocalStorage('@UserToken', accessToken);
          setItemInLocalStorage(
            '@UserInfo',
            JSON.stringify(res?.data?.user),
          );
          navigation.navigate('Home');
          
        } else if (res?.response?.data?.message) {
          console.log("🚀 ~ onGoogleLogin ~ res?.response?.data?.message:", res?.response?.data?.message)
        }
        // Handle successful response here
      })
      .catch(err => {
        console.log('Error during Google sign-in:', err.message);
        // Handle error here
      });
  };

  return (
    <View style={styles.Container}>
      <View style={styles.HalfView}>
        <Image source={images.halalogo} style={styles.imgstyle} />
      </View>
      <View style={styles.buttonContainer}>
        
          <View style={{ width: '90%' }}>
            <TouchableOpacity
              style={styles.touchablestyleIcon}
              onPress={() => navigation.navigate('Login')}>
              <View
                style={{
                  flexDirection: 'row',
                  // paddingHorizontal: '10%',
                  justifyContent: 'center',
                }}>
                <IconF
                  size={SF(18)}
                  name="phone"
                  style={styles.Iconstyle}
                  color={'white'}
                />
                <Text style={styles.Continuebtntext}>
                  {t('continue_with_phone_or_email')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchablestyleIcon}
              onPress={onGoogleLogin}>
              <Image
                source={images.google}
                size={SF(27)}
                style={styles.GoogleIconstyle}
              />
              <Text style={styles.Continuebtntext}>
                {t('continue_with_google')}
              </Text>
            </TouchableOpacity>
          </View>
        
      </View>
      <View style={{ flexDirection: 'end' }}>
        <Image
          source={images.wallbackground}
          size={SF(27)}
          style={styles.googleimg}
        />
      </View>
    </View>
  );
};

export default RegistrationScreen;
