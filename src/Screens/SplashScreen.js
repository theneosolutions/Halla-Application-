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
import usePushNotification from '../utils/PushNotification_helper';
import {useTranslation} from 'react-i18next';
import images from '../index';
import SplashStyl from '../styles/CommonStyle/SplashStyl';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../Language/english';
import ar from '../Language/arabic';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

///////////////onbutton notification//foreground message //////////
const onDisplayNotification = async () => {
  try {
    if (Platform.OS === 'android') {
      const permissionStatus = await notifee.requestPermission();
     
    }
  
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'welcome to app',
      body: 'hay  hiiii',
      android: {
        channelId,
          pressAction: {
          id: 'default',
        },
      },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

///////////////////////////////////////
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
/////////////////////messageing//////////

const backgroundImages = [
  require('../images/backgroundimgone.jpg'),
  require('../images/backgroundimgfour.jpg'),
  require('../images/backgroundimgfifth.jpg'),
  // Add more images here
];

// Initialize i18next
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
  //const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [language, setLanguage] = useState('en');
  const {t, i18n} = useTranslation();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'; // Toggle between English and Arabic
    i18n.changeLanguage(newLanguage); // Change the application language
    setLanguage(newLanguage); // Update the selected language state
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBackgroundIndex(
        prevIndex => (prevIndex + 1) % backgroundImages.length,
      );
    }, 2000); // Change background image every 2 seconds

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, []);


  const DisplayNotify = () => {
    // onDisplayNotification();
    navigation.navigate('RegistrationScreen');
  };


  // const checkToken = async () => {
    // try {
    //   const token = await AsyncStorage.getItem('@UserToken');
    //   if (token !== null) {
    //     // Token exists, navigate to HomeScreen
    //     navigation.navigate('Home');
    //   } else {
    //     // Token doesn't exist, navigate to GoogleLoginScreen
    //     navigation.navigate('GoogleLogin');
    //   }
    // } catch (error) {
    //   console.error('Error retrieving token:', error);
    // }
  // };
  // useEffect(() => {
  //   checkToken();
  // }, []);
  return (
    
      <View style={SplashStyl.Container}>
        <TouchableOpacity
          onPress={toggleLanguage}
          style={SplashStyl.SwitchStyle}>
          {language === 'en' ? (
            <>
              <Image
                source={require('../images/engLang.png')}
                style={SplashStyl.SwitchImage}
              />
              <Text>Eng</Text>
            </>
          ) : (
            <>
              <Image
                source={require('../images/arabLang.png')}
                style={SplashStyl.SwitchImage}
              />
              <Text>عربى</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={SplashStyl.logoContainer}>
          <Image source={images.halalogo} style={SplashStyl.imgstyle} />
        </View>

        <View style={SplashStyl.buttonContainer}>
          <TouchableOpacity
            style={SplashStyl.touchablestyle}
            onPress={DisplayNotify}>
            {/* // onPress={() => navigation.navigate('RegistrationScreen')}> */}
            <Text style={SplashStyl.btntext}>{t('started')}</Text>
          </TouchableOpacity>
        </View>
      </View>
   
  );
};



export default SplashScreen;
