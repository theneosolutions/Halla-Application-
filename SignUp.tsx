import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TextInput, StyleSheet, Modal } from 'react-native';
import Header from '../../Components/Header/Header';
import DatePicker from 'react-native-date-picker';
import COLORS from '../../Constants/Colors';
import { useTranslation } from 'react-i18next';
import { getDateFormat, setCredentials, setItemInLocalStorage, showErrorToast, showSuccessToast, toastConfig } from '../../Utills/Helper';
import mainStyle from '../../Components/MainStyle';
import { useAppSelector } from '../../Redux/ReduxHelper';
import { RouteProp } from '@react-navigation/native';
import { yaqeenApi } from '../../Services/ApiList';
import Toast from 'react-native-toast-message';
import ConfirmationPopup from '../../Utills/ConfirmationPopUp';
import Feather from 'react-native-vector-icons/Feather';

type props = {
  navigation: any,
  route: StackRoutProps;
}

type RootStackParamList = {
  StackNavigation: {
    components: {
      toggleButton: string,
      lottieFile: string,
      text: string,
    },
    button: [
      {
        id: string,
        navigationLink: string,
        name: string
      }
    ]
  };
};

type StackRoutProps = RouteProp<RootStackParamList, 'StackNavigation'>;

const SignUp: React.FC<props> = ({ navigation, route }) => {
  const { button } = route.params;
  const botton1 = button.find((data) => data.id === "SignUp_Next");
  const selector = useAppSelector();
  const { brandColor } = selector;
  const [idNumber, setIdNumber] = useState<string>('');
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentComponent, setCurrentComponent] = useState('');
  const [fromDate, setFromDate] = useState('');
  const date = getDateFormat(fromDate)
  const [fromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState('');
  const specialCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const [passwordPateren, setPasswordPateren] = useState<boolean>(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const saudiNumberFormat = "Number in this formate: +966 5x xxx xxxx";
  const [isAgeValid, setIsAgeValid] = useState('');
  const [enable, setEnable] = useState(false);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (idNumber != '' && !specialCharacters.test(idNumber) && (idNumber.startsWith('1') || idNumber.startsWith('2')) && !specialCharacters.test(phoneNumber) && isAgeValid >= '18' && phoneNumber.length == 9 && phoneNumber.startsWith('5') && idNumber.length == 10 && phoneNumber != '' && fromDate != '' && pinCode.length >= 8 && (/[a-z]/.test(pinCode)) && (/[A-Z]/.test(pinCode)) && (specialCharacters.test(pinCode)) && (/[0-9]/.test(pinCode))) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }, [idNumber, phoneNumber, fromDate, pinCode, isAgeValid]);

  const onSubmitClick = async () => {
    // navigation.navigate(botton1?.navigationLink, { idNumber, phoneNumber, date, pinCode });return
    setCurrentComponent('tahaqoq')
    setButtonEnable(false)
  }
  const callApi = async (type: string) => {
    if (type == 'rightBtn') {

      try {
        const mobile = "+966".concat(phoneNumber);
        console.log('mobile======', mobile);
        const response = await yaqeenApi(idNumber, mobile);
        console.log('yaqeenApi=========', response);
        // setIdNumber('');
        // setPhoneNumber('');
        // setFromDate('');
        // setPinCode('');
        setButtonEnable(false)
        if (response?.data?.data?.isOwner === "false") {
          showErrorToast(response?.data?.message, 7000)
        } else if (response?.data?.data?.isOwner == "true") {
          const start = new Date();
          await setItemInLocalStorage('@LastApiCallTime', start.toISOString());
          setCredentials(idNumber, pinCode)
          showSuccessToast(response?.data?.message, 7000)
          setTimeout(() => {
            navigation.navigate(botton1?.navigationLink, { idNumber, phoneNumber, date, pinCode });
          }, 3000);

        }
      } catch (error) {
        console.log('error', error)
        showErrorToast('Api not responsed', 20000)
      };
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ ...mainStyle.mainView, backgroundColor: brandColor.Secondary }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={mainStyle.headerView}>
          <Header onPress={() => navigation.goBack()} />
        </View>
        <View style={mainStyle.subView}>
          <ScrollView showsVerticalScrollIndicator={false} >

            <Text style={{ ...mainStyle.headerText, color: brandColor.Quaternary, marginVertical: 20 }}>{t('CREATE_ACCOUNT')}</Text>
            <View style={styles.mainContainer}>
              <View style={styles.formGroup}>
                <Text style={{ ...mainStyle.textField, color: brandColor.Quaternary }}>{t('ID_NUMBER')}</Text>
                <View style={{ ...mainStyle.textView, backgroundColor: brandColor.Quinary }}>
                  <TextInput selectTextOnFocus={true} style={{ ...mainStyle.inputText, color: brandColor.Quaternary, }} keyboardType="number-pad" placeholder={t('ENTER_ID_NUMBER')}
                    placeholderTextColor={brandColor.Tertiary} editable={true} value={idNumber} maxLength={10} onChangeText={val => { setIdNumber(val), setSubmitted(true) }}
                    blurOnSubmit={false} underlineColorAndroid="transparent" />
                </View>
                {(submitted && idNumber == '') ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>{t('ENTER_ID_NUMBER')}</Text>
                ) : submitted && !idNumber.startsWith('1') && !idNumber.startsWith('2') ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>IdNumber is Invalid</Text>
                ) : submitted && idNumber.length != 10 ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>{t('MUST_TEN')}</Text>
                ) : submitted && specialCharacters.test(idNumber) ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>Only Numbers Allow</Text>
                ) : null}
              </View>

              <View style={styles.formGroup}>
                <Text style={{ ...mainStyle.textField, color: brandColor.Quaternary }}>{t('MOBILE_NUMBER')}</Text>
                <View style={{ ...mainStyle.textView, backgroundColor: brandColor.Quinary }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, color: brandColor.Quaternary, }}>+966</Text>
                    <TextInput selectTextOnFocus={true} style={{ ...mainStyle.inputText, color: brandColor.Quaternary, }} keyboardType="number-pad" placeholder="Enter your Phone number"
                      placeholderTextColor={brandColor.Tertiary} maxLength={9} editable={true} value={phoneNumber}
                      onChangeText={val => { setPhoneNumber(val), setSubmitted(true) }}
                      blurOnSubmit={false} underlineColorAndroid="transparent" />
                  </View>
                </View>
                {submitted && phoneNumber == '' ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>{t('NUMBER_ERROR')}</Text>
                ) : submitted && !phoneNumber.startsWith('5') ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>
                    {saudiNumberFormat}
                  </Text>
                ) : submitted && phoneNumber.length != 9 ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>
                    {saudiNumberFormat}
                  </Text>
                ) : submitted && specialCharacters.test(phoneNumber) ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>Only Numbers Allow</Text>
                ) : null}

              </View>
              <View style={styles.formGroup}>
                <Text style={{ ...mainStyle.textField, color: brandColor.Quaternary }}>{t('DOB')}</Text>
                <View>
                  <TouchableOpacity style={{ ...mainStyle.textView, backgroundColor: brandColor.Quinary }} onPress={() => setFromDatePickerVisibility(true)}>
                    {fromDate != '' ? (
                      <Text style={{ ...mainStyle.inputText, color: brandColor.Quaternary, alignSelf: 'center', }}>{getDateFormat(fromDate)}</Text>
                    ) : (
                      <Text style={{ ...mainStyle.inputText, alignSelf: 'center', color: brandColor.Tertiary }}>{t('DATE_FORMATE')}</Text>
                    )}
                  </TouchableOpacity>
                </View>
                {submitted && fromDate == '' ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>{t('ENTER_DATE')}</Text>
                ) : submitted && isAgeValid < '18' ? (
                  <Text style={{ ...mainStyle.errorText, color: brandColor.ErrorColor, }}>Your age is less than 18</Text>
                ) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={{ ...mainStyle.textField, color: brandColor.Quaternary }}>{t('PASSWORD')}</Text>
                <View style={{ ...mainStyle.textView, backgroundColor: brandColor.Quinary, alignItems: 'center' }}>
                  <TextInput selectTextOnFocus={true} style={{ ...mainStyle.inputText, width: '90%', color: brandColor.Quaternary, }} keyboardType='numbers-and-punctuation'
                    placeholder={t('ENTER_PIN')} secureTextEntry={enable} placeholderTextColor={brandColor.Tertiary} editable={true} value={pinCode}
                    onChangeText={val => { setPinCode(val), setPasswordPateren(true) }} blurOnSubmit={false} underlineColorAndroid="transparent" />
                  {enable == false ? (
                    <TouchableOpacity onPress={() => { setEnable(true) }}>
                      <Feather name="eye" color={brandColor.Quaternary} size={20} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => { setEnable(false) }}>
                      <Feather name="eye-off" color={brandColor.Quaternary} size={20} />
                    </TouchableOpacity>
                  )}
                </View>
                {(passwordPateren && (pinCode == '' || (!/[a-z]/.test(pinCode)) || (!/[A-Z]/.test(pinCode)) ||
                  (!/[0-9]/.test(pinCode)) || (!specialCharacters.test(pinCode)) || !(pinCode.length >= 8))
                ) ? (
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {pinCode.length >= 8 && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: pinCode.length >= 8 ? 'green' : brandColor.ErrorColor, marginLeft: pinCode.length >= 8 ? 10 : 0 }}>{t('MINIMUM_CHARACTER')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/[0-9]/.test(pinCode) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: /[0-9]/.test(pinCode) ? 'green' : brandColor.ErrorColor, marginLeft: /[0-9]/.test(pinCode) ? 10 : 0 }}>{t('PASSWORD_ERROR')}{t('NUMBER')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/[a-z]/.test(pinCode) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: /[a-z]/.test(pinCode) ? 'green' : brandColor.ErrorColor, marginLeft: /[a-z]/.test(pinCode) ? 10 : 0 }}>{t('PASSWORD_ERROR')}{t('LOWER_CASE')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/[A-Z]/.test(pinCode) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: /[A-Z]/.test(pinCode) ? 'green' : brandColor.ErrorColor, marginLeft: /[A-Z]/.test(pinCode) ? 10 : 0 }}>{t('PASSWORD_ERROR')}{t('UPPER_CASE')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {specialCharacters.test(pinCode) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: specialCharacters.test(pinCode) ? 'green' : brandColor.ErrorColor, marginLeft: specialCharacters.test(pinCode) ? 10 : 0 }}>{t('PASSWORD_ERROR')}{t('SPECIAL_CHARACTER')}</Text>
                    </View>
                  </View>

                ) : null}
              </View>
              {buttonEnable ? (
                <TouchableOpacity style={{ ...mainStyle.footerBtn, backgroundColor: brandColor.Primary, marginTop: 30 }} onPress={() => onSubmitClick()}>
                  <Text style={{ ...mainStyle.footerBtnTxt, color: brandColor.Secondary }}>{t('NEXT')}</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ ...mainStyle.footerBtn, backgroundColor: 'rgba(238, 238, 237, 700)', marginTop: 30 }}>
                  <Text style={{ ...mainStyle.footerBtnTxt, color: brandColor.Secondary }}>{t('NEXT')}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <Toast config={toastConfig} />
        <DatePicker style={styles.datePickerStyle} modal open={fromDatePickerVisible} mode='date' date={new Date()} maximumDate={new Date()} minimumDate={new Date('1900-01-01')}
          onCancel={() => {
            setFromDatePickerVisibility(false);
          }}
          onConfirm={res => {
            setFromDatePickerVisibility(false);
            setSubmitted(true)
            setFromDate(res);
            const age = calculateAge(res);
            setIsAgeValid(age.toString())
          }} />
        <Modal animationType='slide' transparent={true} visible={currentComponent == 'tahaqoq'} onRequestClose={() => {
          setCurrentComponent('')
        }}>
          <ConfirmationPopup title={'Verification from Tahaqoq!'} message={'Are you sure you want to varified your account from tahaqoq'} confirmBtn={'Proceed'} cancelBtn={'No'} callback={callApi} setCurrentComponent={setCurrentComponent} />
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 0,
    height: '100%',
  },
  topView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  ModalContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: COLORS.Secondary,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 41,
    elevation: 1,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
  },
  datePickerStyle: {
    borderRadius: 20,
    backgroundColor: 'pink', // Example background color
    // Add other styling properties as needed
  }
});

export default SignUp;
