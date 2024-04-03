import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/AntDesign';
import Egypto from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {SH, SW, SF} from '../../utils';
import {getPakageById} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
const PaymentDetails = ({route}) => {
  // const {id} = route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {pakageid} = route.params;

  console.log('dddppppppp------', pakageid);
  //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedContacts, setSelectedContacts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [packageData, setPackageData] = useState(null);
  const [price, setPrice] = useState([]);
  const [guest, setGuest] = useState([]);
  const toggleContactSelection = () => {
    setIsChecked(!isChecked);
    setButtonDisabled(!isChecked); // Enable/disable button based on checkbox state
  };

  const handleGetPakageId = async () => {
    try {
      const response = await getPakageById(pakageid);
      console.log('response---------------paymentmethod', response?.data);
      setPrice(response?.data?.data?.price);
      // console.log('price---', price);
      setGuest(response?.data?.numberOfGuest);
      // console.log('numberOfGuest', guest);
      if (response?.data?.statusCode === 400) {
        // Display error message using Alert
        // Alert.alert('Error', response?.data?.message);

        Alert.alert('Error', response?.data?.message);
      }
      setPackageData(response?.data);
      console.log('packageData', packageData);
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  };

  useEffect(() => {
    handleGetPakageId();
  }, []);

  const handleButtonClick = () => {
    if (isChecked) {
      navigation.navigate('WebViewScreen', {packageData: packageData});
    } else {
      // Handle case when checkbox is not checked
      console.log('Checkbox is not checked');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconF size={SF(20)} name="left" style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add guest</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.heading}>Payment </Text>
      </View>

      <View style={styles.totalGuestView}>
        <Text style={styles.subHeading}>Total Guests</Text>
        <Text style={styles.subHeading}>10</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.totalView}>
        <Text style={styles.subHeading}>Total </Text>
        <Text style={styles.subHeading}>79SAR</Text>
      </View>
      <View style={styles.AddguestView}></View>
      <View style={styles.agreeWith}>
        <TouchableOpacity
          onPress={toggleContactSelection}
          style={styles.checkbox}>
          {isChecked ? (
            <IconF name="checksquare" size={25} color="#293170" />
          ) : (
            <Icon name="square-o" size={25} color="#293170" />
          )}
        </TouchableOpacity>
        <Text style={styles.agreeHeading}>
          I agree with Halla
          <Text style={styles.privacypolicy}>Terms of services</Text> and
          <Text style={styles.privacypolicy}>Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          {backgroundColor: isChecked ? '#293170' : '#ccc'},
        ]}
        onPress={handleButtonClick}
        // style={[
        //   styles.continueButton,
        //   {backgroundColor: isChecked ? '#293170' : '#ccc'},
        // ]}
        // onPress={() => {
        //   {
        //     isChecked && (
        //       <View style={styles.webViewContainer}>
        //         <WebView
        //           source={{uri: 'https://example.com'}} // Specify your URI here
        //           style={styles.webView}
        //         />
        //       </View>
        //     );
        //   }
        // }}
        disabled={!isChecked}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffff',
    padding: SW(10),
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: SF(20),
    color: 'black',
  },
  headerIcon: {
    marginLeft: 10,
    marginRight: 20,
    color: '#000',
  },
  headerIconRight: {
    marginRight: 10,
    color: '#000',
  },

  header: {
    marginBottom: 20,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  agreeHeading: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    width: 300,
    paddingVertical: 10,

    paddingHorizontal: 8,
  },
  agreeWith: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  AddguestView: {
    paddingVertical: 210,
    // backgroundColor: 'red',
  },
  totalGuestView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // borderBottomwidth: 1,
  },
  totalView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  line: {
    borderBottomWidthColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 8,
    padding: 0,
    width: 350,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  privacypolicy: {
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F4F5FE',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 12,
    marginHorizontal: 25,
  },
  closeIconContainer: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  closeIcon: {
    color: '#000',
  },
  guestDetails: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  name: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',
  },
  phoneNumber: {
    fontSize: 14,
    color: 'black',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#ccc',
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 50,
    // paddingHorizontal: 15,
    // paddingVertical: 6,
  },
  counterText: {
    fontSize: 18,
    color: '#000',
    marginTop: 2,
  },
  count: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalHeading: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  phoneInput: {
    flex: 1,
    marginRight: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    // height: '5%',

    backgroundColor: '#293170',
    justifyContent: 'center',
    alignItems: 'center',

    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  continueButton: {
    height: '7%',
    width: '70%',
    backgroundColor: '#293170',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 55,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  checkbox: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default PaymentDetails;

{
  /* {isChecked && ( */
}
// <WebView
//   source={{
//     uri: 'https://zain.d26sw7gpdqxzte.amplifyapp.com/payments?user=44&amount=20&description=test&callbackUrl=https://zain.d26sw7gpdqxzte.amplifyapp.com/payments/payments_redirect',
//   }}
//   startInLoadingState={true}
//   renderLoading={() => (
//     <ActivityIndicator
//       color="purple"
//       size="large"
//       style={styles.flexContainer}
//     />
//   )}

// />
// )}
