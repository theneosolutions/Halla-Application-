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
// import styles from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';

const ForgotPhone = () => {
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

  const [callingCode, setCallingCode] = useState('+996');
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
      setButtonEnable(phoneNumber.length === 12);
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
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
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

  const handleSignInPhoneNu = async () => {
    if (!phoneNumber || !callingCode) {
      // Show Snackbar if phone number or calling code field is empty
      Snackbar.show({
        text: 'Phone number is required',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#293170',
      });
      return false;
    }

    setBtnLoading(true);
    try {
      const data = {
        callingCode: callingCode,
        phoneNumber: phoneNumber,
      };
      console.log('data----', data);
      const response = await signInPhone(data);
      console.log('response', response);
      if (response) {
        // setMessage(response?.data?.message);
        // setCurrentComponent('signUpSuccess');
        navigation.navigate('ForgotPassSMSOTP', {forgotType: 'phone', phoneNumber, callingCode});
      }
      setBtnLoading(false);

      // if (data.callingCode && data.phoneNumber) {
      //   // Call the API

      //   console.log('response.........rrrrrrrQQQ', response);
      //   if (response) {
      //     setCurrentComponent('signUpSuccess');
      //     navigation.navigate('Home');
      //   }
      //   // setUserData(response?.data);
      //   if (response?.data) {
      //     setMessage('User Registered Successfully');
      //     setCurrentComponent('signUpSuccess');
      //     navigation.navigate('Home');
      //   } else if (response?.response?.data?.message) {
      //     setMessage(response?.response?.data?.message);
      //     setCurrentComponent('signUpError');
      //     setBtnLoading(false);
      //     setLoading(false);
      //   }
      // } else {
      //   setBtnLoading(false);
      //   setLoading(false);
      //   // Handle incomplete fields
      //   Alert.alert(
      //     'Please complete both calling code and phone number fields',
      //   );
      //   // setBtnLoading(false);
      //   // setLoading(false);
      // }
    } catch (error) {
      console.error('SignUp Error:', error);
      setMessage('An error occurred during sign up');
      setCurrentComponent('signUpError');
      setLoading(false);
      setBtnLoading(false);
    }
    // setBtnLoading(true);
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
            <Text style={styles.Loginheader}>Enter Phone Number</Text>
          </View>


          {/* <View style={styles.firstHalfView}>
            <Text style={styles.forgotstyle}>Forgot Password</Text>
            <View style={styles.imageview}>
              <Image source={images.halalogo} style={styles.imgstyle} />
            </View>
          </View> */}

          <Spacing space={50} />

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

          <TouchableOpacity
            style={styles.touchablestyle}
            onPress={() => {
              handleSignInPhoneNu();
            }}>
            <View style={styles.signInView}>
              {/* {btnLoading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : ( */}
              <Text style={styles.btntext}>{t('SignIn')}</Text>
              {/* )} */}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  MinViewScreen: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  ScrollViewStyles: {
    width: '100%',
    height: 'auto',
  },
  AccountView: {
    height: SH(150),
    marginTop: SH(60),
    justifyContent: 'center',
    alignItem: 'center',
  },
  Loginheader: {
    fontSize: SF(25),
    color: 'black',
    fontWeight: '800',
    textAlign: 'center',
    // fontFamily: Fonts.Poppins_Medium,
  },

  firstHalfView: {
    height: SH(350),

    width: '100%',
    justifyContent: 'center',
    alignItem: 'center',
    // backgroundColor: 'gray',
  },
  forgotstyle: {
    color: '#293170',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: SF(20),
    margin: 5,
  },
  focusedInput: {
    borderWidth: 1, // Add border
    borderRadius: 5, // Add border radius
    borderColor: '#293170', // Set border color when focused
    elevation: 5, // Add elevation for depth
  },
  LoginText: {
    fontSize: SF(13),
    paddingVertical: 10,
    //justifyContent: 'flex-start',
    color: 'black',
    paddingLeft: SH(10),
    fontWeight: '500',
    textAlign: 'center',
    // color: Colors.theme_background_han_Purple,
    // textAlign: 'center',
    // fontFamily: Fonts.Poppins_Medium,
  },
  EmailPhoneView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    width: '85%',
    overflow: 'hidden',
    // height: 57,
    borderColor: 'black',
    borderBottomRightRadius: 22,
    borderTopLeftRadius: 22,
  },
  inputView: {
    flexDirection: 'row',
    width: '98%',
    padding: SH(8),
  },
  createaccount: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
    paddingLeft: 2,
  },
  googleicon: {
    height: 16,
    width: 16,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 3,
  },
  container: {
    padding: 20,
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
  signInView: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    height: SH(55),
    alignItems: 'center',
  },
  iconStylemail: {
    paddingTop: 10,
    marginLeft: 10,
    color: '#293170',
  },
  iconStyleeye: {
    paddingTop: 12,
    marginLeft: 10,
    color: '#293170',
  },
  touchablestyleP: {
    width: '9%',
    alignSelf: 'center',
    marginVertical: 5,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderColor: '#293170',
    borderWidth: 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
  },

  touchablestyleW: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 5,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderColor: '#293170',
    borderWidth: 0.6,
    backgroundColor: 'white',
    //borderBottomLeftRadius: SF(4),
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
  },

  touchablestyleE: {
    width: '96%',
    alignSelf: 'center',
    marginVertical: 5,
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderColor: '#293170',
    borderWidth: 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
  },

  iconStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // padding: SH(30),
  },
  googletext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingTop: SF(10),
    fontWeight: '600',
    color: 'black',
  },
  Signuptext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingTop: SF(10),
    color: 'black',
  },
  NotRegisterText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingLeft: SF(6),
    fontWeight: '400',
    color: 'black',
  },
  NotRegisterView: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'black',
  },
  ForgetPasswordStyles: {
    // fontFamily: Fonts.Poppins_Medium,
    color: Colors.darkBlue,
    fontSize: SF(15),
    fontWeight: '600',
    paddingLeft: SH(25),
  },
  btntext: {
    color: 'white',
    fontSize: SF(15),
    fontWeight: '500',
  },
  touchablestyle: {
    alignSelf: 'center',
    width: SW(320),
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    //marginTop: SH(250),
  },
  input: {
    width: '80%',
    paddingHorizontal: 2,
    paddingVertical: 1,
    margin: SH(3),
    color: 'black',
  },
  inputPhonNu: {
    width: '86%',
    paddingHorizontal: 5,
    paddingVertical: 1,
    margin: SH(3),
    color: 'black',
    marginTop: SH(4),
  },
  modalCallingCodeContainer: {
    backgroundColor: 'white',
    width: 200,
    height: 200,
    padding: 10,
    borderRadius: 10,
    marginTop: 260,
    elevation: 5,
    marginLeft: 30,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  countryEmoji: {
    marginRight: 10,
    fontSize: 20,
  },
  countryText: {
    fontSize: 16,
  },
  countryCode: {
    marginLeft: 'auto',
    fontSize: 16,
    color: '#666666',
  },
  emailView: {
    flexDirection: 'row',
    width: '98%',
    padding: SH(5),
  },
  googleStyle: {
    height: 16,
    width: 16,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 3,
  },
});
export default ForgotPhone;
