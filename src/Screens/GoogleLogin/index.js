import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Spacing} from '../../Components';

import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import {onGoogleButtonPress} from '../../SocailLogins/index';
import Login from '../../styles/CommonStyle/LoginScreenStyle';
import Style from '../../styles/CommonStyle/Style';

import ConfirmationPopup from '../../utils/ConfirmationPopUp';
// import {
//   NotificationServices,
//   requestUserPermission,
// } from '../../utils/PushNotification_helper';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import images from '../../index';
import {setItemInLocalStorage} from '../../Services/Api';
import {signInEmail, signInPhone} from '../../Services/ApiList';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {SF, SH, SW} from '../../utils';
const specialCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
// import {setItemInLocalStorage} from '../../Services/Api';
const GoogleLogin = () => {
  const {Colors} = useTheme();
  const {t, i18n} = useTranslation();
  //const Login = useMemo(() => Login(Colors), [Colors]);
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [TextInputPassword, setTextInputPassword] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('email');
  const [email, setEmail] = useState('maryamubaid711@gmail.com');
  const [password, setPassword] = useState('Aaa111@#');
  const [showPassword, setShowPassword] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [passwordPateren, setPasswordPateren] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('');
  const [message, setMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    if (selectedOption === 'email') {
      // Enable button if email and password are valid
      setButtonEnable(email !== '' && password !== '');
    } else if (selectedOption === 'phoneNumber') {
      // Enable button if phone number is valid
      setButtonEnable(phoneNumber.length === 10);
      // navigation.navigate('OTPVerify');
    }
  }, [email, password, phoneNumber]);

  const backtoscreen = () => {
    setCurrentComponent('');
    navigation.navigate('Home');
  };

  const onChangeText = text => {
    if (text === 'TextInputPassword')
      setpasswordVisibility(!passwordVisibility);
  };
  // const {t} = useTranslation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // do something with userInfo
    } catch (error) {
      console.log(error);
    }
  };
  const onGoogleLogin = () => {
    onGoogleButtonPress()
      .then(res => {
        console.log(
          '🚀 ~ file: index.js:71 ~ onGoogleButtonPress ~ res.data:',
          res.data,
        );
        // setCredentials({
        //   ...credentials,
        //   email: res?.data?.user?.email,
        //   password:res?.data?.user?.password
        // });
      })
      .catch(err => {
        // console.log(
        //   '🚀 ~ file: index.js:74 ~ onGoogleButtonPress ~ err.data:',
        //   err.data,
        // );
      });
  };

  const signipwithPhoneNumber = async () => {
    setBtnLoading(true);

    const data = {
      callingCode: '+92',
      phoneNumber: phoneNumber,
    };

    try {
      const response = await signInPhone(data);
      // console.log(
      //   'Response from signInEmail::: .',
      //   response.response.data.statusCode,
      // );

      if (response.response.data.statusCode == 200) {
        navigation.navigate('OTPVerify');
      } else {
        Snackbar.show({
          text: response.response.data.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      console.error('Error signing in:', error);
      Snackbar.show({
        text: 'Something wend wrong, please try again',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
  };
  // const setUserData = async data => {
  //   const userObject = {
  //     accessToken: data.accessToken,
  //     id: data.user.id,
  //     email: data.user.email,
  //     lastName: data.user.lastName,
  //     firstName: data.user.firstName,
  //     username: data.user.username,
  //     profilePhoto: data.user.profilePhoto,
  //   };
  //   console.log('==================', userObject);
  //   dispatchUserData(userObject);
  //   await setItemInLocalStorage('@UserToken', userObject.accessToken);
  //   await setItemInLocalStorage('@UserInfo', JSON.stringify(userObject));
  //   console.log('userObjectuserObject', userObject);
  // };
  const signInWithEmailAndPassword = async () => {
    setBtnLoading(true);
    const data = {
      // emailOrUsername: email,
      // password: password,
      emailOrUsername: email,
      password: password,
    };

    try {
      const response = await signInEmail(data);
      console.log('Response from signInEmail..: ', response);
      // setUserData(response?.data);
      if (response?.data) {
        // setMessage(response?.data?.message);
        const {accessToken, id, email} = response?.data;
        // new method to set data in async storage

        setItemInLocalStorage('@UserToken', accessToken);
        setItemInLocalStorage(
          '@UserInfo',
          JSON.stringify(response?.data?.user),
        );
        // setItemInLocalStorage('@UserId', response?.data?.user?.id);
        setCurrentComponent('login');

        // Success message received from the API, navigate to Home screen or perform other actions
        // navigation.navigate('Home');
      } else if (response?.response?.data?.message) {
        Snackbar.show({
          text: 'Email or password is invalid',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
        // Display an alert for invalid credentials
        // Alert.alert('Error', 'Invalid credentials');
      }
      setBtnLoading(false);
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong please try again',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      setBtnLoading(false);
      console.log('Error signing in:', error);
      //Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  const handleProceed = () => {
    // Navigate to the GoogleLogin screen
    navigation.navigate('GoogleLogin');
  };
  const closeModalAndNavigate = () => {
    // Close the success modal
    setSuccessModalVisible(false);
    // Navigate to the Home screen
    navigation.navigate('Home');
  };

  const handleSignIn = async () => {
    if (selectedOption === 'email') {
      // Call signInEmail method
      await signInWithEmailAndPassword();

      //const response = await signInEmail({email, password});
      // Handle response
    } else if (selectedOption === 'phoneNumber') {
      await signipwithPhoneNumber();

      // Call signInPhone method
      // const response = await signInPhone({callingCode: '+92', phoneNumber});
      // Handle response
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={Login.MinViewScreen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.ScrollViewStyles}>
          <View style={Login.AccountView}>
            <Text style={Login.Loginheader}>{t('LoginAccount')}</Text>
            <Text style={Login.LoginText}>{t('Hello')}</Text>
          </View>
          <Spacing space={40} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              width: '80%',
              overflow: 'hidden',
              // height: 57,
              borderColor: 'black',
              borderBottomRightRadius: 22,
              borderTopLeftRadius: 22,
            }}>
            <TouchableOpacity
              onPress={() => setSelectedOption('email')}
              style={{
                width: '50%',
                height: 57,
                // borderWidth: 1,
                // borderColor: '#293170',
                borderTopLeftRadius: 20,
                overflow: 'hidden',
                backgroundColor:
                  selectedOption === 'email' ? '#293170' : 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color={selectedOption === 'email' ? 'white' : 'black'}
                // style={SplashStyl.iconStylemail}
              />
              <Text
                style={{
                  color: selectedOption === 'email' ? 'white' : 'black',
                  marginLeft: 10,
                  overflow: 'hidden',
                }}>
                {t('Email')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedOption('phonenumber')}
              style={{
                width: '50%',
                height: 57,
                borderBottomRightRadius: 20,
                backgroundColor:
                  selectedOption === 'phonenumber' ? '#293170' : 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather
                name="phone"
                size={20}
                color={selectedOption === 'phonenumber' ? 'white' : 'black'}
                // style={SplashStyl.iconStylemail}
              />
              <Text
                style={{
                  color: selectedOption === 'phonenumber' ? 'white' : 'black',
                  marginLeft: 10,
                }}>
                {t('PhoneNumber')}
              </Text>
            </TouchableOpacity>
          </View>

          <Spacing space={20} />
          {selectedOption === 'email' && (
            <>
              <Spacing space={30} />
              <TouchableOpacity
                style={SplashStyl.touchablestyleW}
                //onPress={() => navigation.navigate('Forgotemail')}
              >
                <View
                  style={{flexDirection: 'row', width: '98%', padding: SH(5)}}>
                  <MatIcon
                    name="mail"
                    size={SF(20)}
                    style={SplashStyl.iconStylemail}
                  />
                  <TextInput
                    style={SplashStyl.input}
                    placeholder={t('Email_Error')}
                    value={email}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onChangeText={text => {
                      setEmail(text), setSubmitted(true);
                    }}
                    // secureTextEntry={!showPassword}
                  />

                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <FontAwesome
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={SF(20)}
                      style={SplashStyl.iconStyle}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {submitted && email == '' ? (
                <Text style={{fontSize: 12, color: 'red'}}>
                  {t('Email_Error')}
                </Text>
              ) : null}

              <Spacing space={1} />
              <TouchableOpacity
                style={SplashStyl.touchablestyleW}
                //onPress={() => navigation.navigate('Forgotemail')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    padding: SW(6),
                    paddingLeft: SW(5),
                    width: '100%',
                  }}>
                  <FontAwesome
                    name="lock"
                    size={SF(20)}
                    style={SplashStyl.iconStyleeye}
                    // color={'black'}
                  />
                  <TextInput
                    style={SplashStyl.input}
                    placeholder={t('Enteryourpassword')}
                    value={password}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onChangeText={text => {
                      setPassword(text), setPasswordPateren(true);
                    }}
                    secureTextEntry={showPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <FontAwesome
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={SF(20)}
                      style={SplashStyl.iconStyle}
                      // color={'black'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {submitted && password == '' ? (
                <Text style={styles.error}>Enter your password</Text>
              ) : null}

              <Spacing space={1} />
            </>
          )}
          {selectedOption === 'phonenumber' && (
            <>
              <TouchableOpacity
                style={SplashStyl.touchablestyleW}
                //onPress={() => navigation.navigate('Forgotemail')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '98%',
                    paddingVertical: SH(8),
                  }}>
                  <MatIcon
                    name="phone"
                    size={SF(20)}
                    style={SplashStyl.iconStylemail}
                    color={'black'}
                  />

                  <TextInput
                    style={SplashStyl.input}
                    placeholder={t('PhoneNumber')}
                    value={phoneNumber}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onChangeText={val => {
                      setPhoneNumber(val), setSubmitted(true);
                    }}
                    // secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <FontAwesome
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={SF(20)}
                      style={SplashStyl.iconStyle}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {submitted && phoneNumber == '' ? (
                <Text
                  style={{
                    //...mainStyle.errorText,
                    color: 'red',
                  }}>
                  {t('NUMBER_ERROR')}
                </Text>
              ) : submitted && phoneNumber.length >= 12 ? (
                <Text
                  style={{
                    //...mainStyle.errorText,
                    color: 'red',
                  }}>
                  must contain 10 numbers
                </Text>
              ) : null}

              <Spacing space={10} />
            </>
          )}
          <View style={{width: 150, marginLeft: 'auto'}}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
              <Text style={Login.ForgetPasswordStyles}>
                {t('ForgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
            <Text style={Login.ForgetPasswordStyles}>
              {t('ForgotPassword')}
            </Text>
          </TouchableOpacity> */}
          <Spacing space={SH(20)} />

          {buttonEnable ? (
            <TouchableOpacity
              style={SplashStyl.touchablestyle}
              // onPress={handleSignUp}>
              onPress={handleSignIn}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: '5%',
                  justifyContent: 'center',
                  height: SH(60),
                  alignItems: 'center',
                }}>
                {btnLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={SplashStyl.btntext}>{t('SignIn')}</Text>
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{...SplashStyl.touchablestyle, backgroundColor: '#ccc'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: '5%',
                  justifyContent: 'center',
                  height: SH(55),
                  alignItems: 'center',
                }}>
                <Text style={SplashStyl.btntext}>{t('SignIn')}</Text>
              </View>
            </View>
          )}
          <Spacing space={SH(10)} />

          <TouchableOpacity onPress={onGoogleLogin}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={Login.Signuptext}>{t('signupwith')}</Text>
              <Image
                source={images.google}
                size={SF(27)}
                style={{
                  height: 16,
                  width: 16,
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 3,
                }}
              />
              <Text style={Login.googletext}>{t('Google')}</Text>
            </View>
            <Spacing space={SH(20)} />
          </TouchableOpacity>

          <View style={Login.NotRegisterView}>
            <Text style={Login.NotRegisterText}>{t('Notregister')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: 'black',
                  paddingLeft: 2,
                }}>
                {t('Createaccount')}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={currentComponent == 'login'}
            onRequestClose={() => {
              setCurrentComponent('');
            }}>
            <ConfirmationPopup
              title={'User Successfully Login'}
              message={message}
              confirmBtn={'Proceed'}
              cancelBtn={'cancel'}
              callback={backtoscreen}
              setCurrentComponent={setCurrentComponent}
            />
          </Modal>
        </ScrollView>
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
export default GoogleLogin;
