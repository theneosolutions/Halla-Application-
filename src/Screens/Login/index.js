
import React, {useState, useMemo, useEffect} from 'react';
import {View,Text,ScrollView,Image,TextInput,TouchableOpacity,
  TouchableWithoutFeedback,Keyboard,Alert,StyleSheet,
  Modal,ActivityIndicator} from 'react-native';
import {Button, Container, Input, Spacing} from '../../Components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {onGoogleButtonPress} from '../../SocailLogins/index';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import ConfirmationPopup from '../../utils/ConfirmationPopUp';
// import {
//   NotificationServices,
//   requestUserPermission,
// } from '../../utils/PushNotification_helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {SH, SF, SW, Colors} from '../../utils';
import {useNavigation, useTheme} from '@react-navigation/native';
import images from '../../index';
import {useTranslation} from 'react-i18next';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {signInPhone, signInEmail} from '../../Services/ApiList';
const specialCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
import {setItemInLocalStorage} from '../../Services/Api';
import Languages from '../../Language/i18n';
import styles from './styles';

const Login = () => {
  const {Colors} = useTheme();
  const {t, i18n} = useTranslation();

  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [TextInputPassword, setTextInputPassword] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('email');
  const [email, setEmail] = useState('maryamubaid711+176@gmail.com');
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
  
      setButtonEnable(email !== '' && password !== '');
    } else if (selectedOption === 'phoneNumber') {
   
      setButtonEnable(phoneNumber.length === 10);
   
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
    
      })
      .catch(err => {
        console.log('errerrrrrr');
        
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

  const signInWithEmailAndPassword = async () => {
    setBtnLoading(true);
    const data = {
      emailOrUsername: email,
      password: password,
    };

    try {
      const response = await signInEmail(data);
      console.log('Response from signInEmail..: ', response);
        if (response?.data) {
       const {accessToken, id, email} = response?.data;
        setItemInLocalStorage('@UserToken', accessToken);
        setItemInLocalStorage('@UserInfo', JSON.stringify(response?.data?.user));
        setCurrentComponent('login');

      } else if (response?.response?.data?.message) {
        Snackbar.show({
          text: 'Email or password is invalid',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
       
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
      
    }
  };
  const handleProceed = () => {

    navigation.navigate('GoogleLogin');
  };
  const closeModalAndNavigate = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Home');
  };

  const handleSignIn = async () => {
    if (selectedOption === 'email') {
      await signInWithEmailAndPassword();

    } else if (selectedOption === 'phoneNumber') {
      await signipwithPhoneNumber();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.MinViewScreen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.ScrollViewStyles}>
          <View style={styles.AccountView}>
            <Text style={styles.Loginheader}>{t('LoginAccount')}</Text>
            <Text style={styles.LoginText}>{t('Hello')}</Text>
          </View>
          <Spacing space={40} />
          <View
            style={styles.EmailPhoneView}>
            <TouchableOpacity
              onPress={() => setSelectedOption('email')}
              style={{
                width: '50%',
                height: 57,
                borderTopLeftRadius: 20,
                overflow: 'hidden', 
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  selectedOption === 'email' ? '#293170' : 'white',
               
              }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color={selectedOption === 'email' ? 'white' : 'black'}
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
                style={styles.touchablestyleW}
              >
                <View
                  style={{flexDirection: 'row', width: '98%', padding: SH(5)}}>
                  <MatIcon
                    name="mail"
                    size={SF(20)}
                    style={SplashStyl.iconStylemail}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={t('Email_Error')}
                    value={email}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onChangeText={text => {
                      setEmail(text), setSubmitted(true);
                    }}
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
                style={styles.touchablestyleW}
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
                  />
                  <TextInput
                    style={styles.input}
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
                style={styles.touchablestyleW}>
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
                    style={styles.input}
                    placeholder={t('PhoneNumber')}
                    value={phoneNumber}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onChangeText={val => {
                      setPhoneNumber(val), setSubmitted(true);
                    }}
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
               
                    color: 'red',
                  }}>
                  {t('NUMBER_ERROR')}
                </Text>
              ) : submitted && phoneNumber.length >= 12 ? (
                <Text
                  style={{
              
                    color: 'red',
                  }}>
                  must contain 10 numbers
                </Text>
              ) : null}

              <Spacing space={10} />
            </>
          )}
          <View style={{width:150,marginLeft:'auto'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
            <Text style={styles.ForgetPasswordStyles}>
              {t('ForgotPassword')}
            </Text>
          </TouchableOpacity> 
          </View>
          <Spacing space={SH(20)} />

          {buttonEnable ? (
            <TouchableOpacity
              style={styles.touchablestyle}
              onPress={handleSignIn}>
              <View
                style={styles.signInView}>
                {btnLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (

                  <Text style={styles.btntext}>{t('SignIn')}</Text>
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{...styles.touchablestyle,backgroundColor: '#ccc'}}>
              <View
                style={styles.signInView}>
                <Text style={styles.btntext}>{t('SignIn')}</Text>
              </View>
            </View>
          )}
          <Spacing space={SH(10)} />

          <TouchableOpacity onPress={onGoogleLogin}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.Signuptext}>{t('signupwith')}</Text>
              <Image
                source={images.google}
                size={SF(27)}
                style={{height:16,width:16,marginTop:10,marginLeft:10,marginRight:3}}
              />
              <Text style={styles.googletext}>{t('Google')}</Text>
            </View>
            <Spacing space={SH(20)} />
          </TouchableOpacity>

          <View style={styles.NotRegisterView}>
            <Text style={styles.NotRegisterText}>{t('Notregister')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{fontSize:13,fontWeight:'600',color:'black',paddingLeft:2}}>{t('Createaccount')}</Text>
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

export default Login;
