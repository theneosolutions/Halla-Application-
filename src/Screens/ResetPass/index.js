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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';

import {SH, SF, SW, Colors} from '../../utils';
import Languages from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
import {resetpass} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
import styles from './styles';

const ResetPass = ({navigation, route}) => {
  const {email, otp} = route.params;

  console.log('email=========', email);
  console.log('otp=========', otp);
  const [password1, setPassword1] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setpassword2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);

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
     
      <View style={styles.Container}>
        <View
          style={styles.firstHalfView}>
          <Text
            style={styles.boldText}>
            {t('ResetPassword')}
          </Text>
          <Text
            style={styles.lightText}>
            {t('resetpasstext')}
          </Text>
          <Image
            source={images.halalogo}
            style={styles.imgstyle}
          />
       
        </View>

        <View
          style={styles.touchableView}>
          <TouchableOpacity
            style={styles.touchablestyleW}
            //onPress={() => navigation.navigate('Forgotemail')}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(20)}
                style={styles.iconStyleeye}
                color={Colors.black}
              />
              <TextInput
                style={styles.input}
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
                  style={styles.iconStyle}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchablestyleW}
            //onPress={() => navigation.navigate('Forgotemail')}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(20)}
                style={styles.iconStyleeye}
                color={Colors.black}
              />
              <TextInput
                style={styles.input}
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
                  style={styles.iconStyle}
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
          style={styles.ButtonView}>
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

export default ResetPass;
