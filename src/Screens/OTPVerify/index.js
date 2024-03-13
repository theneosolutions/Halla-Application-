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
import IconF from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {SH, SF, SW, Colors} from '../../utils';
import {useTranslation} from 'react-i18next';
import Languages from '../../Language/i18n';
import {otpVerify, otpResend} from '../../Services/ApiList';
import {Spacing} from '../../Components/index';
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

  // const otpverifyfunction = async () => {
  //   try {
  //     const otpValue = parseInt(otp.join(''));
  //     const data = {
  //       callingCode: '+92',
  //       phoneNumber: '123456789', // Replace with actual phone number
  //       otp: otpValue,
  //     };
  //     const response = await otpVerify(data);
  //     console.log('Response from otpverify:', response);
  //     // Assuming response contains success status
  //     if (response.success) {
  //       // Navigate to the ResetPass screen upon successful OTP verification
  //       // navigation.navigate('ResetPass');
  //     } else {
  //       Alert.alert('Error', 'Invalid OTP. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error);
  //     Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
  //   }
  // };
  return (
    <View style={SplashStyl.Container}>
      <View
        style={{
          flex: 0.4,
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
            margin: 5,
          }}>
          {t('EnterYourCode')}
        </Text>
        <Text
          style={{
            color: 'gray',
            fontWeight: '400',
            justifyContent: 'center',
            alignItem: 'center',
            textAlign: 'center',
            fontSize: SF(15),
            margin: 20,
          }}>
          {t('OTPtext')}
        </Text>
        <Image
          source={images.halalogo}
          style={{
            height: SH(100),
            width: SW(50),
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: SH(2),
          }}
        />
      </View>

      {/* <Text>Event Management made easy</Text> */}
      <View
        style={{
          flex: 0.2,
          // backgroundColor: 'lightgray',
          width: '82%',
          justifyContent: 'center',
          alignItem: 'center',
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {otp.map((digit, index) => (
            <TextInput
              placeholder="-"
              key={index}
              ref={ref => (otpTextInputRefs.current[index] = ref)}
              style={{
                //borderWidth: 1.5,
                borderBottomWidth: 1.5,
                borderColor: '#293170',
                borderRadius: 5,
                paddingHorizontal: 10,
                margin: 5,
                width: 60,
                textAlign: 'center',
              }}
              value={digit}
              onChangeText={text => handleOTPChange(index, text)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
          {/* <TouchableOpacity onPress={handleResendOTP}>
            <Text style={{textDecorationLine: 'underline', color: 'blue'}}>
              Resend OTP
            </Text>
          </TouchableOpacity> */}
        </View>
        <Spacing space={SH(30)} />
        <TouchableOpacity
        // onPress={handleResendOTP}
        >
          <Text
            style={{
              alignItem: 'center',
              textAlign: 'center',
              color: 'black',
            }}>
            {t('CodeExpires')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={handleResendOTP}
        >
          <View style={{flexDirection: 'row', textAlign: 'center'}}>
            <Text style={{marginLeft: SF(90), marginTop: SH(14)}}>
              {t('dontrecevidOTP')}
            </Text>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: 'blue',
                alignItem: 'center',
                textAlign: 'center',
                marginLeft: SF(5),
                marginTop: SH(14),
              }}>
              {t('ResendOTP')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={SplashStyl.touchablestyleW}
          onPress={() => navigation.navigate('RegistrationScreen')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItem: 'center',
            }}>
            <IconF
              size={SF(27)}
              name="apple"
              style={SplashStyl.Iconstyle}
              color={'white'}
            />
            <Text style={SplashStyl.btntextB}>Send via SMS</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          flex: 0.1,
          // backgroundColor: 'pink',
          width: '90%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <TouchableOpacity
          style={SplashStyl.touchablestyle}
          //onPress={otpverifyfunction}
          onPress={() => navigation.navigate('ResetPass', {email, otp})}>
          <Text style={SplashStyl.btntext}>{t('Continue')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPVerify;
