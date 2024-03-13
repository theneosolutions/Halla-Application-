import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, Container, Input, Spacing} from '../../Components';

import Login from '../../styles/CommonStyle/LoginScreenStyle';
import Style from '../../styles/CommonStyle/Style';
import IconA from 'react-native-vector-icons/AntDesign';
import {SH, SF, SW, Colors} from '../../utils';
import IconG from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import images from '../../index';
import {useTranslation} from 'react-i18next';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
//import usePushNotification from '../../utils/PushNotification_helper';
// import {
//   NotificationServices,
//   requestUserPermission,
// } from '../../utils/PushNotification_helper';

//import {initializeApp} from 'firebase/app';
//import {firebaseConfig} from '../../config/firebase';
const AppleLogin = () => {
  const [selectedButton, setSelectedButton] = useState('appleId');
  const [isAppleIdSelected, setAppleIdSelected] = useState(true);
  const [isPhoneNumberSelected, setPhoneNumberSelected] = useState(false);
  const handleAppleIdClick = () => {
    setAppleIdSelected(true);
    setPhoneNumberSelected(false);
  };

  const handlePhoneNumberClick = () => {
    setAppleIdSelected(false);
    setPhoneNumberSelected(true);
  };
  const handleButtonPress = buttonType => {
    setSelectedButton(buttonType);
  };
  const {Colors} = useTheme();
  //const Login = useMemo(() => Login(Colors), [Colors]);
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [TextInputPassword, setTextInputPassword] = useState('');

  const onChangeText = text => {
    if (text === 'TextInputPassword')
      setpasswordVisibility(!passwordVisibility);
  };
  const {t} = useTranslation();

  const OnRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };
  ///////////////
  // const {
  //   requestUserPermission,
  //   getFCMToken,
  //   listenToForegroundNotifications,
  //   onNotificationOpenedAppFromBackground,
  //   onNotificationOpenedAppFromQuit,
  // } = usePushNotification();

  // useEffect(() => {
  //   const setupPushNotifications = async () => {
  //     try {
  //       // Request permission and get FCM token
  //       await requestUserPermission();
  //       await getFCMToken();

  //       // Listen to foreground notifications
  //       const unsubscribeForeground = listenToForegroundNotifications();

  //       // Listen to background notifications
  //       const unsubscribeBackground = onNotificationOpenedAppFromBackground();

  //       // Listen to notifications opened from quit state
  //       const unsubscribeQuit = onNotificationOpenedAppFromQuit();

  //       return () => {
  //         // Clean up subscriptions when the component unmounts
  //         unsubscribeForeground();
  //         unsubscribeBackground();
  //         unsubscribeQuit();
  //       };
  //     } catch (error) {
  //       console.error('Error setting up push notifications:', error);
  //     }
  //   };

  //   setupPushNotifications();
  // }, []);

  // const handleLogin = () => {
  //   // Your login logic here
  //   navigation.navigate('Home');
  // };

  ///////////////
  // useEffect(() => {
  //   //   NotificationServices();
  //   requestUserPermission();
  // }, []);
  return (
    <View style={Login.MinViewScreen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewStyles}>
        <View style={Login.AccountView}>
          <Text style={Login.Loginheader}>{t('Login Account ')}</Text>
          <Text style={Login.LoginText}>
            {t('Hello , welcome back to our account !')}
          </Text>
        </View>

        <Spacing space={SH(60)} />
        <View style={Login.appleloginview}>
          <TouchableOpacity
            onPress={() => handleButtonPress('appleId')}
            style={{
              backgroundColor:
                selectedButton === 'appleId' ? '#293170' : 'white',
            }}>
            <Text
              style={[
                Login.appleidtext,

                selectedButton === 'appleId' && {color: 'black'},
              ]}>
              Apple ID
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleButtonPress('phoneNumber')}
            style={{
              backgroundColor:
                selectedButton === 'phoneNumber' ? '#293170' : 'white',
            }}>
            <Text
              style={[
                Login.phoneNutext,
                selectedButton === 'phoneNumber' && {color: 'black'},
              ]}>
              Phone Number
            </Text>
          </TouchableOpacity>
        </View>

        <Spacing space={SH(20)} />

        <View style={Style.FlexRowPassword}>
          <View style={Login.InputSpaceView}>
            <Input
              inputStyle={Style.InputStyles}
              placeholder={
                selectedButton === 'phoneNumber' ? 'Phone Number' : 'Apple ID'
              }
              onChangeText={value => setMobileNumber(value)}
              value={mobileNumber}
              inputType={
                selectedButton === 'phoneNumber' ? 'numeric' : 'default'
              }
              maxLength={10}
            />
          </View>
        </View>
        <Spacing space={SH(1)} />

        <View style={Style.FlexRowPassword}>
          <Input
            inputStyle={Style.InputStyles}
            name="password"
            value={TextInputPassword}
            placeholder={t('Password_Text')}
            autoCapitalize="none"
            autoCorrect={false}
            //placeholderTextColor={Colors.gray_text_color}
            textContentType="newPassword"
            secureTextEntry={passwordVisibility}
            enablesReturnKeyAutomatically
            onChangeText={text => setTextInputPassword(text)}
          />
        </View>

        <Spacing space={SH(1)} />
        <View stylw={{width: '40%', backgroundColor: 'red'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={Login.ForgetPasswordStyles}>
              {t('Forgot Password?')}
            </Text>
          </TouchableOpacity>
        </View>
        <Spacing space={SH(10)} />
        {/* <TouchableOpacity
        // onPress={onGoogleLogin}
        >
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={images.google}
              size={SF(27)}
              style={Login.googleimg}
            />
            <Text style={Login.googletext}>Login</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={SplashStyl.touchablestyle}
          onPress={() => navigation.navigate('GoogleLogin')}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: '5%',
              justifyContent: 'center',
            }}>
            {/* <IconF
              size={SF(27)}
              name="apple"
              style={SplashStyl.Iconstyle}
              color={'white'}
            /> */}
            <Text style={SplashStyl.btntext}>Login</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={Login.LoginView}
          onPress={() => navigation.navigate('Home')}>
          <Text style={Login.btntext}>Login</Text>
        </TouchableOpacity> */}

        <View>
          <Text style={Login.Signuptext}>Or sign up with</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <IconA size={SF(27)} name="apple1" style={Login.blackapple} />
          <Text style={Login.appletext}>Apple</Text>
        </View>

        <View style={Login.NotRegisterView}>
          <Text>Not register yet?</Text>
          <Text style={Login.NotRegisterText}>Create Account</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default AppleLogin;
