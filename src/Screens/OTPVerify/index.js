import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import images from '../../index';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import {SH, SF, SW, Colors} from '../../utils';
import {useTranslation} from 'react-i18next';
import Languages from '../../Language/i18n';
import {otpVerify, otpResend} from '../../Services/ApiList';
import {Spacing} from '../../Components/index';
import styles from './styles';
import Snackbar from 'react-native-snackbar';
const OTPVerify = ({navigation, route}) => {
  const {email} = route.params;
  console.log('emailOOOO', email);
  const {t, i18n} = useTranslation();
  const [otp, setOTP] = useState(['', '', '', '']);
  const otpTextInputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (index < otp.length - 1 && value) {
      otpTextInputRefs.current[index + 1].focus();
    }
  };
  const isOTPComplete = () => {
    return otp.every(digit => digit !== '');
  };
  return (
    <View style={styles.Container}>
      <View style={styles.firstView}>
        <Text style={styles.boldstyle}>{t('EnterYourCode')}</Text>
        {/* <Text style={styles.lighttext}>{t('OTPtext')}</Text> */}
        <Image source={images.halalogo} style={styles.imgstyle} />
      </View>

      <View style={styles.optView}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {otp.map((digit, index) => (
            <TextInput
              placeholder="-"
              key={index}
              ref={ref => (otpTextInputRefs.current[index] = ref)}
              style={styles.textinputstyle}
              value={digit}
              color={'black'}
              onChangeText={text => handleOTPChange(index, text)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        {/* <Text style={styles.codeExpireStyle}>{t('CodeExpires')}</Text> */}

        <View style={styles.dontreviewopt}>
          <Text style={styles.lighttextgray}>{t('dontrecevidOTP')}</Text>
          <TouchableOpacity>
            <Text style={styles.underlinetext}>{t('ResendOTP')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.touchablestyle}
        onPress={() => {
          if (isOTPComplete()) {
            navigation.navigate('ResetPass', {email, otp});
          } else {
            // Show error message if OTP is not complete
            Snackbar.show({
              text: 'Fill the otp first',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: '#293170',
            });
          }
        }}>
        <Text style={styles.btntext}>{t('Continue')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerify;
