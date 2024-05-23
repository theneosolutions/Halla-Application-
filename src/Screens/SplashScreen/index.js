import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import images from '../../index';
import styles from './styles';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../Language/english';
import ar from '../../Language/arabic';
import AsyncStorage from '@react-native-async-storage/async-storage';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const SplashScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@UserToken');
      if (token !== null) {
        // Token exists, navigate to HomeScreen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } 
    } catch (error) {
      console.error('Error retrieving token:', error);
    } finally {
      // Set loading to false once token check is completed
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    checkToken();
  }, []);

  // Display loading indicator with overlay while checking token
  if (loading) {
    return (
      <View style={styles.Container}>
        <TouchableOpacity onPress={toggleLanguage} style={styles.SwitchStyle}>
          {language === 'en' ? (
            <>
              <Image
                source={require('../../images/engLang.png')}
                style={styles.SwitchImage}
              />
              <Text style={styles.textStyle}>EN</Text>
            </>
          ) : (
            <>
              <Image
                source={require('../../images/arabLang.png')}
                style={styles.SwitchImage}
              />
              <Text style={styles.textStyle}>AR</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={images.halalogo} style={styles.imgstyle} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.touchablestyle}
            onPress={() => navigation.navigate('RegistrationScreen')}>
            <Text style={styles.btntext}>{t('started')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.overlayContainer}>
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={toggleLanguage} style={styles.SwitchStyle}>
        {language === 'en' ? (
          <>
            <Image
              source={require('../../images/engLang.png')}
              style={styles.SwitchImage}
            />
            <Text style={styles.textStyle}>EN</Text>
          </>
        ) : (
          <>
            <Image
              source={require('../../images/arabLang.png')}
              style={styles.SwitchImage}
            />
            <Text style={styles.textStyle}>AR</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={images.halalogo} style={styles.imgstyle} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.touchablestyle}
          onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text style={styles.btntext}>{t('started')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;