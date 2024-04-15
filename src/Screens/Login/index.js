import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StyleSheet,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  Button,
  Container,
  Input,
  Spacing,
  // CountryPickerInput,
} from '../../Components';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {onGoogleButtonPress} from '../../SocailLogins/index';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import ConfirmationPopup from '../../utils/ConfirmationPopUp';
import {CountryPickerInput} from '../../Components/commonComponents/CountryPickerInput';
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
import {signInPhone, signInEmail} from '../../Services/ApiList';
const specialCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
import {setItemInLocalStorage} from '../../Services/Api';
import Languages from '../../Language/i18n';
import styles from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';

const Login = () => {
  const {Colors} = useTheme();
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [TextInputPassword, setTextInputPassword] = useState('');
  // const [callingCode, setCallingCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [passwordPateren, setPasswordPateren] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('');
  const [message, setMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null); // State to track focused input

  const [callingCode, setCallingCode] = useState('+44');
  const [showCountryPickerModal, setShowCountryPickerModal] = useState('');
  const [countryNameCode, setCountryNameCode] = useState('GB');
  const [phoneNumber, setPhoneNumber] = useState('');
  const onCountrySelect = value => {
    setCountryNameCode(value.cca2);
    setCallingCode('+' + value.callingCode);
  };
  const handleFocus = input => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };
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

  const signInWithEmailAndPassword = async () => {
    setBtnLoading(true);
    const data = {
      emailOrUsername: email.trim(),
      password: password,
    };

    try {
      const response = await signInEmail(data);
      console.log('Response from signInEmail..: ', response);
      if (response?.data) {
        const {accessToken, id, email} = response?.data;
        setItemInLocalStorage('@UserToken', accessToken);
        setItemInLocalStorage(
          '@UserInfo',
          JSON.stringify(response?.data?.user),
        );

        setCurrentComponent('login');
        setLoading(false);
        navigation.navigate('Home');
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
    navigation.navigate('Home', {});
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = require('../EditProfile//countryCodes.json')['countries'];
  const [modalVisible, setModalVisible] = useState(false);
  const openCountryCodePicker = () => {
    setModalVisible(true);
  };

  const onSelectCountry = country => {
    setSelectedCountry(country);
    setModalVisible(false);
  };
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onSelectCountry(item)}>
      <View
        style={{
          flexDirection: 'row',

          margin: 2,
        }}>
        <Text>{item.emoji}</Text>
        <Text>{item.phone}</Text>
      </View>

      {item.code && <Text>{item.code}</Text>}
    </TouchableOpacity>
  );

  const handleSignUpPhoneNu = async () => {
    setBtnLoading(true);
    try {
      const data = {
        callingCode: selectedCountry ? selectedCountry.phone : '',
        phoneNumber: phoneNumber,
      };

      if (data.callingCode && data.phoneNumber) {
        // Call the API
        const response = await signInPhone(data);
        console.log('response.........rrrrrrrQQQ', response);
        if (response) {
          setCurrentComponent('signUpSuccess');
          navigation.navigate('Home');
        }
        // setUserData(response?.data);
        if (response?.data) {
          setMessage('User Registered Successfully');
          setCurrentComponent('signUpSuccess');
          navigation.navigate('Home');
        } else if (response?.response?.data?.message) {
          setMessage(response?.response?.data?.message);
          setCurrentComponent('signUpError');
          setBtnLoading(false);
          setLoading(false);
        }
      } else {
        setBtnLoading(false);
        setLoading(false);
        // Handle incomplete fields
        Alert.alert(
          'Please complete both calling code and phone number fields',
        );
        // setBtnLoading(false);
        // setLoading(false);
      }
    } catch (error) {
      console.error('SignUp Error:', error);
      setMessage('An error occurred during sign up');
      setCurrentComponent('signUpError');
      setLoading(false);
      setBtnLoading(true);
    }
    setBtnLoading(true);
    setLoading(false);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.MinViewScreen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.ScrollViewStyles}>
          <View style={styles.AccountView}>
            <Text style={styles.Loginheader}>{t('LoginAccount')}</Text>
            <Text style={styles.LoginText}>{t('Hello')}</Text>
          </View>
          <Spacing space={40} />
          <View style={styles.EmailPhoneView}>
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

          <Spacing space={10} />
          {selectedOption === 'email' && (
            <>
              <Spacing space={30} />
              <TouchableOpacity
                style={[
                  styles.touchablestyleE,
                  focusedInput === 'email' && styles.focusedInput,
                ]}
                onPress={() => handleFocus('email')}
                onBlur={handleBlur}>
                <View style={styles.emailView}>
                  <MatIcon
                    name="mail"
                    size={SF(20)}
                    style={styles.iconStylemail}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={t('Email_Error')}
                    value={email}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onFocus={() => handleFocus('email')} // Add onFocus event
                    onBlur={handleBlur}
                    onChangeText={text => {
                      setEmail(text), setSubmitted(true);
                    }}
                  />
                </View>
              </TouchableOpacity>

              {submitted && email == '' ? (
                <Text style={{fontSize: 12, color: 'red'}}>
                  {t('Email_Error')}
                </Text>
              ) : null}

              <Spacing space={1} />
              <TouchableOpacity
                style={[
                  styles.touchablestyleW,
                  focusedInput === 'password' && styles.focusedInput, // Apply focusedInput style when password field is focused
                ]}
                onPress={() => handleFocus('password')}
                onBlur={handleBlur}>
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
                    style={styles.iconStyleeye}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={t('Enteryourpassword')}
                    value={password}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onFocus={() => handleFocus('password')} // Add onFocus event
                    onBlur={handleBlur}
                    onChangeText={text => {
                      setPassword(text), setPasswordPateren(true);
                    }}
                    secureTextEntry={showPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <FontAwesome
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={SF(20)}
                      color={'#293170'}
                      style={styles.iconStyle}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {submitted && password == '' ? (
                <Text style={{fontSize: 12, color: 'red'}}>
                  Enter your password
                </Text>
              ) : null}

              <View style={{width: 150, marginLeft: 'auto'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPass')}>
                  <Text style={styles.ForgetPasswordStyles}>
                    {t('ForgotPassword')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Spacing space={20} />
              {buttonEnable ? (
                <TouchableOpacity
                  style={styles.touchablestyle}
                  onPress={signInWithEmailAndPassword}>
                  <View style={styles.signInView}>
                    {btnLoading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.btntext}>{t('SignIn')}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{...styles.touchablestyle, backgroundColor: '#ccc'}}>
                  <View style={styles.signInView}>
                    <Text style={styles.btntext}>{t('SignIn')}</Text>
                  </View>
                </View>
              )}
            </>
          )}
          {selectedOption === 'phonenumber' && (
            <>
              <Spacing space={30} />
              {/* <TouchableOpacity style={styles.touchablestyleW}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp(80),
                    paddingVertical: SH(8),
                  }}>
                  <TouchableOpacity
                    onPress={openCountryCodePicker}
                    style={{
                      borderRadius: 10,
                      backgroundColor: 'white',
                      elevation: 5,
                      marginHorizontal: wp(2),
                      paddingVertical: wp(2),
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: wp(3),
                        paddingRight: wp(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Icon
                        name="chevron-down"
                        size={30}
                        color={'black'}
                        style={{marginTop: hp(-1.2)}}
                      />
                      <Text style={{color: 'black'}}>
                        {selectedCountry ? selectedCountry.emoji : '🇺🇸'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  style={{height: 40}}
                  onRequestClose={() => setModalVisible(false)}>
                  <View style={styles.modalCallingCodeContainer}>
                    <FlatList
                      data={countries}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                    />
                  </View>
                </Modal>
              </TouchableOpacity> */}
              <CountryPickerInput
                countryNameCode={countryNameCode}
                callingCode={callingCode}
                onSelect={onCountrySelect}
                onChangeText={setPhoneNumber}
              />
              {submitted && phoneNumber == '' ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: SF(12),
                    marginLeft: 5,
                  }}>
                  {t('NUMBER_ERROR')}
                </Text>
              ) : submitted && phoneNumber.length <= 10 ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: SF(12),
                  }}>
                  must contain 10 numbers
                </Text>
              ) : null}
              <Spacing space={30} />
              {buttonEnable ? (
                <TouchableOpacity
                  style={styles.touchablestyle}
                  onPress={handleSignUpPhoneNu}>
                  <View style={styles.signInView}>
                    {btnLoading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.btntext}>{t('SignIn')}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{...styles.touchablestyle, backgroundColor: '#ccc'}}>
                  <View style={styles.signInView}>
                    <Text style={styles.btntext}>{t('SignIn')}</Text>
                  </View>
                </View>
              )}
            </>
          )}

          <Spacing space={SH(30)} />

          <TouchableOpacity onPress={onGoogleLogin}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.Signuptext}>{t('signupwith')}</Text>
              <Image
                source={images.google}
                size={SF(27)}
                style={styles.googleStyle}
              />
              <Text style={styles.googletext}>{t('Google')}</Text>
            </View>
            <Spacing space={SH(20)} />
          </TouchableOpacity>

          <View style={styles.NotRegisterView}>
            <Text style={styles.NotRegisterText}>{t('Notregister')}</Text>
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
          {/* <Modal
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
          </Modal> */}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
