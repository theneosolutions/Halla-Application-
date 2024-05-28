import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Spacing } from '../../Components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import { CountryPickerInput } from '../../Components/commonComponents/CountryPickerInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { SH, SF } from '../../utils';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { signInPhone, signInEmail } from '../../Services/ApiList';
import { setItemInLocalStorage } from '../../Services/Api';
import styles from './styles';

const INITIAL_STATE = {
  email: '',
  password: '',
  phoneNumber: '',
  callingCode: '+996',
  countryNameCode: 'SA'
};

const Login = () => {
  const { Colors } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('email');
  const [buttonEnable, setButtonEnable] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const { email, password, phoneNumber } = formData;
    if (selectedOption === 'email') {
      setButtonEnable(email.trim() !== '' && password !== '');
    } else if (selectedOption === 'phoneNumber') {
      setButtonEnable(phoneNumber.length === 12);
    }
  }, [formData, selectedOption]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const signInWithEmailAndPassword = async () => {
    try {
      setBtnLoading(true);
      setSubmitted(true);

      const data = {
        emailOrUsername: formData?.email.trim(),
        password: formData?.password,
      };

      const response = await signInEmail(data);

      if (response.error) {
        console.error('Error:', response.error);
        console.log('Status code:', response.status);
        Snackbar.show({
          text: response.error,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      } else {
        const { accessToken, user } = response.data;
        // Store user token and info in local storage
        await Promise.all([
          setItemInLocalStorage('@UserToken', accessToken),
          setItemInLocalStorage('@UserInfo', JSON.stringify(user)),
        ]);
        // Navigate to Home screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (error) {
      const { message } = error;
      Snackbar.show({
        text: typeof message == 'string' ? message : message[0],
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });

    } finally {
      setBtnLoading(false);
      setSubmitted(false);
    }
  };


  const handleSignInPhoneNumber = async () => {
    setBtnLoading(true);
    setSubmitted(true);
    if (formData?.phoneNumber === '' || formData?.callingCode === '' || formData?.phoneNumber.length < 10) {
      // Show Snackbar if phone number or calling code field is empty
      Snackbar.show({
        text: 'Phone number is required',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      setBtnLoading(false);
      return false;
    }

    setBtnLoading(true);
    setSubmitted(true);
    try {
      const data = {
        callingCode: formData?.callingCode,
        phoneNumber: formData?.phoneNumber,
      };
      const response = await signInPhone(data);
      if (response.error) {
        Snackbar.show({
          text: response.error,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      } else {
        console.log('Response data:', response.data);
        navigation.navigate('SignInOTP', { phoneNumber: formData?.phoneNumber, callingCode: formData?.callingCode });
      }
    } catch (error) {
      const { message } = error;
      Snackbar.show({
        text: typeof message == 'string' ? message : message[0],
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });

      console.error('Error signing in:', error);
    } finally {
      setBtnLoading(false);
      setSubmitted(false);
    }
  };


  const onCountrySelect = value => {
    console.log("🚀 ~ onCountrySelect ~ value:", value)
    setFormData(prevState => ({
      ...prevState,
      countryNameCode: value.cca2,
      callingCode: '+' + value.callingCode,
    }));
  };

  const handleFocus = input => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
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
                    size={SF(17)}
                    style={styles.iconStylemail}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={t('Email_Error')}
                    value={formData.email}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    onChangeText={text =>
                      setFormData(prevState => ({
                        ...prevState,
                        email: text,
                      }))
                    }
                  />
                </View>
              </TouchableOpacity>

              {submitted && formData.email === '' ? (
                <Text style={{ fontSize: 12, color: 'red' }}>
                  {t('Email_Error')}
                </Text>
              ) : null}

              <Spacing space={1} />
              <TouchableOpacity
                style={[
                  styles.touchablestyleW,
                  focusedInput === 'password' && styles.focusedInput,
                ]}
                onPress={() => handleFocus('password')}
                onBlur={handleBlur}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '98%',
                    padding: SH(3),
                  }}>
                  <FontAwesome
                    name="lock"
                    size={SF(18)}
                    style={styles.iconStyleeye}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={t('Enteryourpassword')}
                    value={formData.password}
                    color={'black'}
                    placeholderTextColor={'black'}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    onChangeText={text =>
                      setFormData(prevState => ({
                        ...prevState,
                        password: text,
                      }))
                    }
                    secureTextEntry={showPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <FontAwesome
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={SF(17)}
                      color={'#293170'}
                      style={styles.iconStyle}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {submitted && formData.password === '' ? (
                <Text style={{ fontSize: 12, color: 'red' }}>
                  Enter your password
                </Text>
              ) : null}

              <View style={{ width: 160, marginLeft: 'auto', marginVertical: 5 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
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
                <View style={{ ...styles.touchablestyleDisable }}>
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
              <CountryPickerInput
                countryNameCode={formData.countryNameCode}
                callingCode={formData.callingCode}
                onSelect={onCountrySelect}
                onChangeText={phoneNumber =>
                  setFormData(prevState => ({
                    ...prevState,
                    phoneNumber: phoneNumber,
                  }))
                }
              />
              {submitted && formData.phoneNumber === '' ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: SF(12),
                    marginLeft: 5,
                  }}>
                  {t('NUMBER_ERROR')}
                </Text>
              ) : submitted && formData.phoneNumber.length < 10 ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: SF(12),
                  }}>
                 Phone number must contain 10 numbers
                </Text>
              ) : null}
              <Spacing space={30} />

              <TouchableOpacity
                style={styles.touchablestyle}
                onPress={handleSignInPhoneNumber}>
                <View style={styles.signInView}>
                    {btnLoading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.btntext}>{t('SignIn')}</Text>
                    )}
                  </View>
              </TouchableOpacity>
            </>
          )}

          <Spacing space={SH(30)} />

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

        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
