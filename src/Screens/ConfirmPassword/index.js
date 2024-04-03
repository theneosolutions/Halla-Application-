import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import images from '../../index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SH, SF, SW, Colors} from '../../utils';
import Languages from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
import {getFromLocalStorage} from '../../Services/Api';
import styles from './styles';
import {updatepass} from '../../Services/ApiList';

const ConfimrPassword = ({navigation}) => {
  //   const {email, otp} = route.params;

  //   console.log('email=========', email);
  //   console.log('otp=========', otp);
  const [password1, setPassword1] = useState('');
  const [showPasswordone, setShowPasswordone] = useState(false);
  const [showPasswordtwo, setShowPasswordtwo] = useState(false);
  const [password2, setpassword2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [password, setPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPasswordone(!showPasswordone);
  };
  const togglePasswordVisibilitytwo = () => {
    setShowPasswordtwo(!showPasswordtwo);
  };
  const {t, i18n} = useTranslation();

  const HandleUpdatePassword = async () => {
    const token = await getFromLocalStorage('@UserToken');
    const data = {
      password1: password1,
      password2: password2,
      password: password,
    };
    console.log('data=======', data);
    const response = await resetpass(data);
    console.log('resetPassword==========', response);
    navigation.navigate('ResetPassDone');
  };
  // navigation.navigate('ResetPassDone');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Container}>
        <View style={styles.firstHalfView}>
          <Text style={styles.boldText}>Confirm Password</Text>
          <Text style={styles.lightText}>{t('resetpasstext')}</Text>

          <Image source={images.halalogo} style={styles.imgstyle} />
        </View>
        <ScrollView style={{flex: 1, marginTop: 30}}>
          <View style={styles.touchableView}>
            <TouchableOpacity style={styles.touchablestyleW}>
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
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor={'black'}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}></TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchablestyleW}>
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
                  secureTextEntry={!showPasswordone}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <FontAwesome
                    name={showPasswordone ? 'eye-slash' : 'eye'}
                    size={SF(20)}
                    style={styles.iconStyle}
                    color={Colors.black}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchablestyleW}>
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
                  secureTextEntry={!showPasswordtwo}
                />
                <TouchableOpacity onPress={togglePasswordVisibilitytwo}>
                  <FontAwesome
                    name={showPasswordtwo ? 'eye-slash' : 'eye'}
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
          <View style={styles.ButtonView}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    password1 === password2 ? '#293170' : 'lightgray',
                },
              ]}
              disabled={password1 !== password2}
              onPress={HandleUpdatePassword}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ConfimrPassword;
