import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../../index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SH, SF, SW, Colors} from '../../utils';
import Languages from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
import {resetPass, resetPassViaPhone} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
import styles from './styles';
import Snackbar from 'react-native-snackbar';
const ResetPass = ({navigation, route}) => {
  const {forgotType } = route.params;

  console.log('email=========', route.params?.email);
  console.log('otp=========', route.params?.otp);
  const [password1, setPassword1] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [password2, setpassword2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1); // Toggle visibility for password 1
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2); // Toggle visibility for password 2
  };
  const {t, i18n} = useTranslation();

  const resetpassword = async () => {
    let data;
    console.log('data=========00=', data)
    if (!password1 || !password2) {
      // Show Snackbar if phone number or calling code field is empty
      Snackbar.show({
        text: 'email is required',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#293170',
      });
      return false;
    }
    const token = await getFromLocalStorage('@UserToken');
    if (forgotType == 'email') {
      data = {
        password1: password1,
        password2: password2,
        email: route.params?.email,
        otp: parseFloat(route.params?.otp.join('')),
      };
      console.log('data=======', data);
      const response = await resetPass(data);
      console.log('resetPassword==========', response);
      navigation.navigate('ResetPassDone');
    }

    if (forgotType == 'phone') {
      data = {
        password1: password1,
        password2: password2,
        callingCode: route.params?.callingCode,
        phoneNumber: route.params?.phoneNumber,
        otp: route.params?.otp,
      };
console.log('data==========', data)
      const response = await resetPassViaPhone(data);
      console.log('resetPassViaPhone==========', response);
      navigation.navigate('ResetPassDone');
    }
  };
  const otpverifyfunction = () => {
    resetpassword();
    navigation.navigate('ResetPassDone');
  };

  console.log('route.params', route.params)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Container}>
        <View style={styles.firstHalfView}>
          <Text style={styles.boldText}>{t('ResetPassword')}</Text>
          {/* <Text style={styles.lightText}>{t('resetpasstext')}</Text> */}
          <Image source={images.halalogo} style={styles.imgstyle} />
        </View>

        <View style={styles.touchableView}>
          <TouchableOpacity style={styles.touchablestyleW}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(17)}
                style={styles.iconStyleeye}
                color={Colors.black}
              />
              <TextInput
                style={styles.input}
                placeholder={t('Reset your password')}
                value={password1}
                onChangeText={setPassword1}
                placeholderTextColor={'black'}
                secureTextEntry={!showPassword1}
              />
              <TouchableOpacity onPress={togglePasswordVisibility1}>
                <FontAwesome
                  name={showPassword1 ? 'eye' : 'eye-slash'}
                  size={SF(17)}
                  style={styles.iconStyle}
                  color={'#293170'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchablestyleW}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(17)}
                style={styles.iconStyleeye}
                color={Colors.black}
              />
              <TextInput
                style={styles.input}
                placeholder={t('Reset your password')}
                value={password2}
                onChangeText={setpassword2}
                placeholderTextColor={'black'}
                secureTextEntry={!showPassword2}
              />
              <TouchableOpacity onPress={togglePasswordVisibility2}>
                <FontAwesome
                  name={showPassword2 ? 'eye' : 'eye-slash'}
                  size={SF(17)}
                  style={styles.iconStyle}
                  color={'#293170'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {submitted && password2 == '' ? (
            <Text style={styles.error}>Confirm your password</Text>
          ) : password1 != password2 ? (
            <Text style={{fontSize: 12, color: 'red', marginLeft: 40}}>
              Password not matched
            </Text>
          ) : null}
        </View>
        <View style={styles.ButtonView}>
          <TouchableOpacity
            style={[styles.button]}
            // disabled={password1 !== password2}
            onPress={resetpassword}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPass;
