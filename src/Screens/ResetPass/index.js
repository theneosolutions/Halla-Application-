import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import images from '../../index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {SH, SF, SW, Colors} from '../../utils';
import Languages from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
import {resetpass} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';

const ResetPass = ({navigation, route}) => {
  const {email, otp} = route.params;

  console.log('email=========', email);
  console.log('otp=========', otp);
  const [password1, setPassword1] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setpassword2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  //console.log('otp=========', otp);
  //   useEffect(() => {
  //     setTimeout(() => {
  //       //navigation.navigate('RegistrationScreen');
  //     }, 1000);
  //   }, [navigation]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {t, i18n} = useTranslation();

  const resetpassword = async () => {
    const token = await getFromLocalStorage('@UserToken');
    // console.log('response=======', typeof token);
    const data = {
      password1: password1,
      password2: password2,
      email: email,
      otp: parseFloat(otp.join('')),
    };
    console.log('data=======', data);
    const response = await resetpass(data);
    console.log('resetPassword==========', response);
    navigation.navigate('ResetPassDone');
  };
  const otpverifyfunction = () => {
    resetpassword();
    navigation.navigate('ResetPassDone');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={SplashStyl.Container}>
        <View
          style={{
            flex: 0.6,
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
              margin: 3,
            }}>
            {t('ResetPassword')}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontWeight: '500',
              justifyContent: 'center',
              alignItem: 'center',
              textAlign: 'center',
              fontSize: SF(13),
              margin: 20,
            }}>
            {t('resetpasstext')}
          </Text>
          <Image
            source={images.halalogo}
            style={{
              height: SH(100),
              width: SW(50),
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: SH(5),
            }}
          />
          {/* <Image source={images.halalogo} style={SplashStyl.imgstyle} /> */}
        </View>

        <View
          style={{
            flex: 0.1,
            //backgroundColor: 'red',
            width: '100%',
            justifyContent: 'center',
            alignItem: 'center',
          }}>
          <TouchableOpacity
            style={SplashStyl.touchablestyleW}
            //onPress={() => navigation.navigate('Forgotemail')}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(20)}
                style={SplashStyl.iconStyleeye}
                color={Colors.black}
              />
              <TextInput
                style={SplashStyl.input}
                placeholder={t('Enteryourpassword')}
                value={password1}
                onChangeText={setPassword1}
                placeholderTextColor={'black'}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={SF(20)}
                  style={SplashStyl.iconStyle}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={SplashStyl.touchablestyleW}
            //onPress={() => navigation.navigate('Forgotemail')}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(20)}
                style={SplashStyl.iconStyleeye}
                color={Colors.black}
              />
              <TextInput
                style={SplashStyl.input}
                placeholder={t('Enteryourpassword')}
                value={password2}
                onChangeText={setpassword2}
                placeholderTextColor={'black'}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={SF(20)}
                  style={SplashStyl.iconStyle}
                  color={Colors.black}
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
        <View
          style={{
            flex: 0.3,
            //backgroundColor: 'pink',
            width: '100%',
            justifyContent: 'center',
            alignItem: 'center',
          }}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  password1 === password2 ? '#293170' : 'lightgray',
              },
            ]}
            disabled={password1 !== password2}
            onPress={resetpassword}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderTopLeftRadius: SF(15),
    borderBottomRightRadius: SF(15),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
export default ResetPass;
