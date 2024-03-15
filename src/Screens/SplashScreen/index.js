import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
} from 'react-native';
// import usePushNotification from '../utils/PushNotification_helper';
import {useTranslation} from 'react-i18next';
import images from '../../index';
// import SplashStyl from '../styles/CommonStyle/SplashStyl';
import styles from './styles';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../../Language/english';
import ar from '../../Language/arabic';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ///////////////onbutton notification//foreground message //////////
// const onDisplayNotification = async () => {
//   try {
//     if (Platform.OS === 'android') {
//       const permissionStatus = await notifee.requestPermission();
     
//     }
  
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });

//     await notifee.displayNotification({
//       title: 'welcome to app',
//       body: 'hay  hiiii',
//       android: {
//         channelId,
//           pressAction: {
//           id: 'default',
//         },
//       },
//     });
//   } catch (error) {
//     console.error('Error displaying notification:', error);
//   }
// };

// ///////////////////////////////////////
// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
// /////////////////////messageing//////////

// const backgroundImages = [
//   require('../images/backgroundimgone.jpg'),
//   require('../images/backgroundimgfour.jpg'),
//   require('../images/backgroundimgfifth.jpg'),
//   // Add more images here
// ];

// // Initialize i18next
// i18n.use(initReactI18next).init({
//   resources: {
//     en: {translation: en},
//     ar: {translation: ar},
//   },
//   lng: 'en', // default language
//   fallbackLng: 'en',
//   interpolation: {
//     escapeValue: false,
//   },
// });
i18n.use(initReactI18next).init({
    resources: {
      en: {translation: en},
      ar: {translation: ar},
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
  
 const SplashScreen = ({navigation}) => {
  const [language, setLanguage] = useState('en');
  const {t} = useTranslation();
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'; 
    i18n.changeLanguage(newLanguage); 
    setLanguage(newLanguage);
  };
  const DisplayNotify = () => {
    // onDisplayNotification();
    navigation.navigate('RegistrationScreen');
  };


//   // const checkToken = async () => {
//     // try {
//     //   const token = await AsyncStorage.getItem('@UserToken');
//     //   if (token !== null) {
//     //     // Token exists, navigate to HomeScreen
//     //     navigation.navigate('Home');
//     //   } else {
//     //     // Token doesn't exist, navigate to GoogleLoginScreen
//     //     navigation.navigate('GoogleLogin');
//     //   }
//     // } catch (error) {
//     //   console.error('Error retrieving token:', error);
//     // }
//   // };
//   // useEffect(() => {
//   //   checkToken();
//   // }, []);
  return (
    
      <View style={styles.Container}>
        <TouchableOpacity
          onPress={toggleLanguage}
          style={styles.SwitchStyle}>
          {language === 'en' ? (
            <>
              <Image
                source={require('../../images/engLang.png')}
                style={styles.SwitchImage}
              />
              <Text>Eng</Text>
            </>
          ) : (
            <>
              <Image
                source={require('../../images/arabLang.png')}
                style={styles.SwitchImage}
              />
              <Text>عربى</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={images.halalogo} style={styles.imgstyle} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.touchablestyle}
            onPress={DisplayNotify}>
            {/* // onPress={() => navigation.navigate('RegistrationScreen')}> */}
            <Text style={styles.btntext}>{t('started')}</Text>
          </TouchableOpacity>
        </View>
      </View>
   
  );
};
export default SplashScreen;
