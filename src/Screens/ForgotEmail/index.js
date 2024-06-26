import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import images from '../../index';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import {SH, SF, SW, Colors} from '../../utils';
import {confirmemail} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Snackbar from 'react-native-snackbar';
const Forgotemail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    if (!email) {
      // Show Snackbar if phone number or calling code field is empty
      Snackbar.show({
        text: 'email is required',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#293170',
      });
      return false;
    }
    // setBtnLoading(true);
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);
    setError('');

    const data = {
      email: email,
      token: token,
    };
    console.log('data=======', data);
    try {
      const response = await confirmemail(data);

      console.log('confirmemail==========', response);
      navigation.navigate('OTPVerify', {email});
    } catch (error) {
      console.error('Error confirming email:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.Container}>
          <View style={styles.firstHalfView}>
            <Text style={styles.forgotstyle}> Forgot Password</Text>
            {/* <Text style={styles.textStyle}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sintvelit officia consequat duis enim velit mollit.
            </Text> */}
            <View style={styles.imageview}>
              <Image source={images.halalogo} style={styles.imgstyle} />
            </View>
          </View>
          <Text style={styles.LabelEmail}> {t('Email')} </Text>

          <TouchableOpacity
            style={styles.touchablestyleW}
            onPress={() => navigation.navigate('Forgotemail')}>
            <View style={{flexDirection: 'row'}}>
              <FontC
                size={SF(17)}
                name="email-outline"
                style={styles.Iconstyle}
                color={'#293170'}
              />
              <TextInput
                style={styles.input}
                placeholder={t('Email')}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'black'}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.ContinuTouchView}>
            <TouchableOpacity
              style={styles.touchablestyle}
              onPress={() => forgotpass()}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.btntext}>{t('Continue')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Forgotemail;
