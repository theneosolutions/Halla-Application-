import React, {useState, useEffect} from 'react';
import {View,Text, ScrollView,Image,TextInput,TouchableOpacity,Alert,StyleSheet, TouchableWithoutFeedback,Keyboard,Modal,ActivityIndicator} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, Container, Input, Spacing} from '../../Components';
import Feather from 'react-native-vector-icons/Feather';
import Login from '../../styles/CommonStyle/LoginScreenStyle';
import Style from '../../styles/CommonStyle/Style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {SH, SF, SW, Colors} from '../../utils';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ConfirmationPopup from '../../utils/ConfirmationPopUp';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {signUp} from '../../Services/ApiList';
import {setItemInLocalStorage} from '../../Services/Api';
import {useAppDispatch} from '../../Services/redux/ReduxHelper';
const SignUp = () => {
  const {dispatchUserData} = useAppDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [currentComponent, setCurrentComponent] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setshowPassword1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [selectedOption, setSelectedOption] = useState('email');
  const [passwordPateren, setPasswordPateren] = useState(false);
  const specialCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [btnLoading, setBtnLoading] = useState(false);
  useEffect(() => {
    if (selectedOption === 'firstName') {
      // Enable button if email and password are valid
      setButtonEnable(email !== '' && firstName =='' &&lastName !== '' && password1 !== '' && password2 !== ''  );
    // } else if (selectedOption === 'phoneNumber') {
      // Enable button if phone number is valid
      // setButtonEnable(phoneNumber.length === 10);
      // navigation.navigate('OTPVerify');
    }
  }, [firstName,lastName, email,password1, password2]);
  // const backtoscreen = () => {
  //   setCurrentComponent('');
  //   navigation.navigate('Home');
  // };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityone = () => {
    setshowPassword1(!showPassword1);
  };
  useEffect(() => {
    if (
      firstName != '' &&
      // !specialCharacters.test(firstName) &&
      lastName != '' &&
      // !specialCharacters.test(lastName) &&
      email != '' &&
      password1.length >= 8 &&
      /[a-z]/.test(password1) &&
      /[A-Z]/.test(password1) &&
      specialCharacters.test(password1) &&
      /[0-9]/.test(password1) &&
      password1 == password2
    ) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [firstName, lastName, email, password1, password2]);
  const setUserData = async data => {
    const userObject = {
      accessToken: data.accessToken,
      id: data.user.id,
      email: data.user.email,
      lastName: data.user.lastName,
      firstName: data.user.firstName,
      username: data.user.username,
      profilePhoto: data.user.profilePhoto,
    };
    console.log('==================', userObject);
    dispatchUserData(userObject);
    await setItemInLocalStorage('@UserToken', userObject.accessToken);
    await setItemInLocalStorage('@UserInfo', JSON.stringify(userObject));
    console.log('userObjectuserObject============', userObject);
  };
  const handleSignUp = async () => {
    setBtnLoading(true);
    try {
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password1: password1,
        password2: password2,
        referredBy: 'abcde', // Assuming referredBy always "string"
      };
      setButtonEnable(false);
      const response = await signUp(data);
      setUserData(response?.data);
      console.log('signUpResponse======================', response);
      console.log('SignUp Response:', response?.data?.message);
      console.log('SignUp ============:', response?.response?.data?.message);
      if (response?.data) {
        setMessage('User Register Successfully');
    // setBtnLoading(false);
        setCurrentComponent('signUpSuccess');
      } else if (response?.response?.data?.message) {
        setMessage(response?.response?.data?.message);
        setCurrentComponent('signUpError');
      }
      setBtnLoading(false);
      // setButtonEnable(false);
    } catch (error) {
    setBtnLoading(false);
      console.error('SignUp Error:', error);
    }
    setButtonEnable(false);
  };
  const handleProceed = () => {
    // Navigate to the GoogleLogin screen
    navigation.navigate('GoogleLogin');
  };
  const backtoscreen = () => {
    setCurrentComponent('');
    // navigation.navigate('SignUp');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={Login.MinViewScreen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.ScrollViewStyles}>
          <View style={Login.AccountView}>
            <Text style={Login.Loginheader}>{t('SignUp')}</Text>
            <Text style={Login.LoginText}>{t('signuptext')}</Text>
          </View>
          <Spacing space={SH(60)} />
          <TouchableOpacity style={SplashStyl.touchablestyleW}>
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name="user"
                size={SF(20)}
                style={SplashStyl.iconStylemail}
                color={'#293170'}
              />
              <TextInput
                style={SplashStyl.withouticoninput}
                placeholder="FirstName"
                value={firstName}
                placeholderTextColor={'black'}
                onChangeText={val => {
                  setFirstName(val), setSubmitted(true);
                }}
              />
            </View>
          </TouchableOpacity>
          {submitted && firstName == '' ? (
            <Text style={styles.error}>Enter your name</Text>
          ) : null}
          <TouchableOpacity style={SplashStyl.touchablestyleW}>
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name="user"
                size={SF(20)}
                style={SplashStyl.iconStylemail}
                color={'black'}
              />
              <TextInput
                style={SplashStyl.withouticoninput}
                placeholder={t('lastName')}
                value={lastName}
                placeholderTextColor={'black'}
                onChangeText={val => {
                  setLastName(val), setSubmitted(true);
                }}
                // secureTextEntry={!showPassword}
              />
            </View>
          </TouchableOpacity>
          {submitted && lastName == '' ? (
            <Text style={styles.error}>Enter your last name</Text>
          ) : null}
          <TouchableOpacity style={SplashStyl.touchablestyleW}>
            <View style={{flexDirection: 'row'}}>
              <MatIcon
                name="mail"
                size={SF(20)}
                style={SplashStyl.iconStylemail}
                // color={'black'}
              />
              <TextInput
                style={SplashStyl.withouticoninput}
                placeholder={t('Enteremail')}
                value={email}
                placeholderTextColor={'black'}
                onChangeText={text => {
                  setEmail(text), setSubmitted(true);
                }}
                // secureTextEntry={!showPassword}
              />
            </View>
          </TouchableOpacity>
          {submitted && email == '' ? (
            <Text style={styles.error}>Enter your email.</Text>
          ) : null}
          <TouchableOpacity style={SplashStyl.touchablestyleW}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(20)}
                style={{
                  paddingVertical: SH(15),
                  paddingHorizontal: SW(3),
                  marginLeft: 8,
                  color: '#293170',
                }}
              />
              <TextInput
                style={SplashStyl.input}
                placeholder={t('Password_Text')}
                value={password1}
                placeholderTextColor={'black'}
                onChangeText={text => {
                  setPassword1(text), setPasswordPateren(true);
                }}
                secureTextEntry={showPassword1}
              />
              <TouchableOpacity onPress={togglePasswordVisibilityone}>
                <FontAwesome
                  name={showPassword1 ? 'eye-slash' : 'eye'}
                  size={SF(18)}
                  style={{
                    paddingHorizontal: 2,
                    marginRight: 12,
                    paddingVertical: 12,
                  }}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {passwordPateren &&
          (password1 == '' ||
            !/[a-z]/.test(password1) ||
            !/[A-Z]/.test(password1) ||
            !/[0-9]/.test(password1) ||
            !specialCharacters.test(password1) ||
            !(password1.length >= 8)) ? (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {password1.length >= 8 && (
                  <Feather name="check-circle" color="green" size={14} />
                )}
                <Text
                  style={{
                    fontSize: 12,
                    color: password1.length >= 8 ? 'green' : 'red',
                    marginLeft: password1.length >= 8 ? 10 : 0,
                  }}>
                  {t('MINIMUM_CHARACTER')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/[0-9]/.test(password1) && (
                  <Feather name="check-circle" color="green" size={14} />
                )}
                <Text
                  style={{
                    fontSize: 12,
                    color: /[0-9]/.test(password1) ? 'green' : 'red',
                    marginLeft: /[0-9]/.test(password1) ? 10 : 0,
                  }}>
                  {t('PASSWORD_ERROR')}
                  {t('NUMBER')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/[a-z]/.test(password1) && (
                  <Feather name="check-circle" color="green" size={14} />
                )}
                <Text
                  style={{
                    fontSize: 12,
                    color: /[a-z]/.test(password1) ? 'green' : 'red',
                    marginLeft: /[a-z]/.test(password1) ? 10 : 0,
                  }}>
                  {t('PASSWORD_ERROR')}
                  {t('LOWER_CASE')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/[A-Z]/.test(password1) && (
                  <Feather name="check-circle" color="green" size={14} />
                )}
                <Text
                  style={{
                    fontSize: 12,
                    color: /[A-Z]/.test(password1) ? 'green' : 'red',
                    marginLeft: /[A-Z]/.test(password1) ? 10 : 0,
                  }}>
                  {t('PASSWORD_ERROR')}
                  {t('UPPER_CASE')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {specialCharacters.test(password1) && (
                  <Feather name="check-circle" color="green" size={14} />
                )}
                <Text
                  style={{
                    fontSize: 12,
                    color: specialCharacters.test(password1) ? 'green' : 'red',
                    marginLeft: specialCharacters.test(password1) ? 10 : 0,
                  }}>
                  {t('PASSWORD_ERROR')}
                  {t('SPECIAL_CHARACTER')}
                </Text>
              </View>
            </View>
          ) : null}
          <TouchableOpacity
            style={SplashStyl.touchablestyleW}
            //onPress={() => navigation.navigate('Forgotemail')}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="lock"
                size={SF(20)}
                style={{
                  paddingVertical: SH(15),
                  paddingHorizontal: SW(3),
                  marginLeft: 8,
                  color: '#293170',
                }}
                color={'black'}
              />
              <TextInput
                style={SplashStyl.input}
                placeholder={t('Re_Type_Password_Text')}
                value={password2}
                placeholderTextColor={'black'}
                onChangeText={setPassword2}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={SF(18)}
                  style={{
                    paddingHorizontal: 2,
                    marginRight: 12,
                    paddingVertical: 8,
                    marginTop: SH(3),
                  }}
                  color={'#293170'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {submitted && password2 == '' ? (
            <Text style={styles.error}>Confirm your password</Text>
          ) : password1 != password2 ? (
            <Text style={styles.error}>
              Password not matched
            </Text>
          ) : null}
          <Spacing space={SH(20)} />
          <TouchableOpacity
  style={{
    ...SplashStyl.touchablestyle,
    backgroundColor: buttonEnable ? '#293170' : '#ccc',
  }}
  onPress={handleSignUp}
  disabled={!buttonEnable}>
  <View
    style={{
      flexDirection: 'row',
      paddingHorizontal: '5%',
      justifyContent: 'center',
      height:50
    }}>
    {btnLoading ? (
      <ActivityIndicator color="white" />
    ) : (
      <Text style={SplashStyl.btntext}>{t('SignUp')}</Text>
    )}
  </View>
</TouchableOpacity>
<Spacing space={SH(20)} />
          <View style={Login.NotRegisterView}>
            <Text style={Login.NotRegisterText}>{t('Haveanaccount')}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('GoogleLogin')}
              disabled={loading}>
              <Text style={Login.NotRegisterText}>{t('SignIn')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* {currentComponent === 'signUpSuccess' && ( */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={currentComponent == 'signUpSuccess'}
          onRequestClose={() => {
            setCurrentComponent('');
          }}>
          <ConfirmationPopup
            //title={'Registration Successfull'}
            message={message}
            confirmBtn={'Continue'}
            cancelBtn={'Cancel'}
            //onConfirm={deleteCallback}
            callback={handleProceed}
            setCurrentComponent={setCurrentComponent}
          />
        </Modal>
        {/* )} */}
        {/* {currentComponent === 'signUpError' && ( */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={currentComponent == 'signUpError'}
          onRequestClose={() => {
            setCurrentComponent('');
          }}>
          <ConfirmationPopup
            // title={'Email Already In Use'}
            message={message}
            confirmBtn={'Try Again'}
            cancelBtn={'cancel'}
            callback={backtoscreen}
            setCurrentComponent={setCurrentComponent}
          />
        </Modal>
        {/* )} */}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 90,
    borderColor: 'gray',
    width: '90%',
    borderWidth: 1,
    marginBottom: 10,
    // paddingHorizontal: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize:12
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
export default SignUp;