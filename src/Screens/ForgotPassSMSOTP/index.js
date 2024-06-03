import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import images from '../../index';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import {SH, SF, SW, Colors} from '../../utils';
import {useTranslation} from 'react-i18next';
import Languages from '../../Language/i18n';
import {otpVerify, forgotPasswordOtpVerifyPhone} from '../../Services/ApiList';
import {Spacing} from '../../Components/index';
import Snackbar from 'react-native-snackbar';
const ForgotPassOTP = ({navigation, route}) => {
  const {phoneNumber, callingCode} = route.params;
  console.log('emailOOOO', callingCode);
  const {t, i18n} = useTranslation();
  const [otp, setOTP] = useState(['', '', '', '']);
  const otpTextInputRefs = useRef([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (index < otp.length - 1 && value) {
      otpTextInputRefs.current[index + 1].focus();
    }
  };

  const handleSignUpOTPVerify = async () => {
    setBtnLoading(true);

    try {
      const otpValue = parseInt(otp.join(''));
      // console.log('🚀 ~ handleSignUpOTPVerify ~ otpValue:', typeof otpValue);
      // console.log('🚀 ~ handleSignUpOTPVerify ~ otpValue:', otpValue);
      const data = {
        callingCode: callingCode,
        phoneNumber: phoneNumber,
        otp: otpValue,
      };
      console.log('🚀 ~ handleSignUpOTPVerify ~ data:', data);
      const response = await forgotPasswordOtpVerifyPhone(data);
      console.log('response.......', response?.data);
      if (response?.data) {
        // navigation.navigate('ResetPass');
        navigation.navigate('ResetPass', {forgotType:'phone', callingCode, phoneNumber, otp: otpValue});
      }
      // navigation.navigate('Login');
    } catch (error) {
      //   console.error('OTP Verification Error:', error);
      //   Alert.alert('Error', 'An error occurred during OTP verification');
    }
    setBtnLoading(false);
  };
  const isOTPComplete = () => {
    return otp.every(digit => digit !== ''); // Check if every digit of OTP is filled
  };
  return (
    <View style={styles.Container}>
      <View style={styles.firstView}>
        <Text style={styles.boldstyle}>{t('EnterYourCode')}</Text>
        <Text style={styles.lighttext}>{t('OTPtext')}</Text>
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

        <View style={styles.dontreviewopt}>
          <Text style={styles.lighttextgray}>{t('Didn`t recevid OTP')}</Text>
          <TouchableOpacity>
            <Text style={styles.underlinetext}>{t('ResendOTP')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.touchablestyle}
        // onPress={handleSignUpOTPVerify}
        onPress={() => {
          if (isOTPComplete()) {
            // If OTP is completely filled, hit the API
            handleSignUpOTPVerify();
          } else {
            // If OTP is not complete, show a Snackbar
            Snackbar.show({
              text: 'Fill the OTP first',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: '#293170',
            });
          }
        }}
        disabled={btnLoading}>
        <Text style={styles.btntext}>
          Continue
          {/* {btnLoading ? 'Verifying...' : t('Continue')} */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  firstView: {
    height: 300,
    //  backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItem: 'center',
  },
  boldstyle: {
    color: '#293170',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: SF(20),
    marginTop: 15,
    // paddingVertical:20
  },
  lighttext: {
    color: 'gray',
    fontWeight: '500',
    justifyContent: 'center',
    alignItem: 'center',
    textAlign: 'center',
    fontSize: SF(15),
    margin: 20,
  },
  imgstyle: {
    height: SH(130),
    width: SW(60),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SH(2),
  },
  optView: {
    height: 180,
    // backgroundColor: 'lightgray',
    width: '82%',
    justifyContent: 'center',
    alignItem: 'center',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  dontreviewopt: {
    flexDirection: 'row',
    textAlign: 'center',
    // width: SW(210),
  },
  lighttextgray: {
    textAlign: 'center',
    alignSelf: 'center',

    marginLeft: SF(60),
    marginTop: SH(14),
    color: 'black',
    fontWeight: '500',
  },
  underlinetext: {
    textDecorationLine: 'underline',
    padding: 10,
    color: '#293170',
    alignItem: 'center',
    textAlign: 'center',
    // marginLeft: SF(5),
    marginTop: SH(14),
  },
  textinputstyle: {
    borderBottomWidth: 1.5,
    borderColor: '#293170',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 5,
    width: 60,
    textAlign: 'center',
  },
  btnView: {
    height: SH(120),
  },
  codeExpireStyle: {
    alignItem: 'center',
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
  },
  touchablestyle: {
    //height: SH(50),
    //width: '100%',
    alignSelf: 'center',
    width: SW(300),
    //justifyContent: 'center',
    //alignContent: 'center',
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    //marginTop: SH(250),
  },
  btntext: {
    color: 'white',
    fontSize: SF(16),
    fontWeight: '700',
    alignSelf: 'center',
    paddingVertical: 15,
  },
});
export default ForgotPassOTP;
