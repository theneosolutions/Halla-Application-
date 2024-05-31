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
import { loginWithGoogle } from '../../Services/ApiList';

const RegistrationScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [opacity] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(false);

  const onGoogleLogin = () => {
    setLoading(true);
    onGoogleButtonPress()
      .then(async (idToken) => {
        if (idToken) {
          const response = await loginWithGoogle({ idToken })
          if(response?.data?.accessToken) {
            setItemInLocalStorage('@UserToken', response?.data?.accessToken),
            setItemInLocalStorage('@UserInfo', JSON.stringify(response?.data?.user)),
            setLoading(false);
            navigation.navigate('Home');
          }
        }
      })
      .catch(err => {
        console.log('Error during Google sign-in:', err.message);
        setLoading(false);
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
              onPress={onGoogleLogin}
              disabled={loading}>
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
