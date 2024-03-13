import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  FlatList,
  TextInput,PermissionsAndroid,
  StyleSheet
} from 'react-native';
import {getFromLocalStorage, setItemInLocalStorage} from '../../Services/Api';
// import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/AntDesign';
import IconG from 'react-native-vector-icons/Ionicons';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import Style from '../../styles/CommonStyle/Style';
import Egypto from 'react-native-vector-icons/Entypo';
import {
  SH,
  SW,
  SF,
  MessageBox,
  OurService,
  HiNewsViewdata,
  Colors,Alert
} from '../../utils';
import images from '../../index';
// import RouteName from '../../../routes/RouteName';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import {addEventGuests,getEventWithUserId} from '../../Services/ApiList';
import Contacts from 'react-native-contacts';
// import { Alert } from '../../../node_modules/react-native/types/index';

const AddNewGuest = props => {
  const {Colors} = useTheme();
  const {eventId} = props.route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalcontent, setmodalcontent] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  // const [UserId] = useState(getFromLocalStorage('@UserId'))
  const [UserId, setUserId] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const GettingtokenString = await getFromLocalStorage('@UserId');
        const Gettingtoken = JSON.parse(GettingtokenString);
        if (Gettingtoken && Gettingtoken.user && Gettingtoken.user.id) {
          setUserId(Gettingtoken.user.id);
        } else {
          console.error('UserId not found in local storage.');
        }
      } catch (error) {
        console.error('Error retrieving UserId from local storage:', error);
      }
    };

    fetchUserId();
  }, []);
 

  const [contacts, setContacts] = useState([{
    name:"Mubashar Ahmed",
    callingCode:"+92",
    phoneNumber:"3043757526"
  },
  {
    name:"M",
    callingCode:"+92",
    phoneNumber:"3341854302"
  }]);
  useEffect(() => {
    // Contacts.getAll().then(contacts => {
    //   console.log("🚀 ~ Contacts.getAll ~ contacts:", contacts)
    //   setContacts(contacts);
    // });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setModalVisible(false);
      setmodalcontent(0);
    });
  }, [navigation]);
  // Sample data for the FlatList
  const addEventGuestIntoList = async(contactInfo) =>{
    const newNumber = contactInfo.callingCode+contactInfo.phoneNumber;
    const isAlreadySelected = []
    selectedContacts.map((item)=>{
      let fullNumber =  item.callingCode+item.phoneNumber;
      if(fullNumber == newNumber){
        isAlreadySelected.push(item)
      }
    })
    if(isAlreadySelected?.length > 0){
      console.log("🚀 ~ addEventGuestIntoList ~ isAlreadySelected:", isAlreadySelected)
      setSelectedContacts(selectedContacts.filter((item)=> `${item?.callingCode}${item?.phoneNumber}` != `${isAlreadySelected[0]?.callingCode}${isAlreadySelected[0]?.phoneNumber}` ))
    }else {
      setSelectedContacts((prevContacts) => [...prevContacts,contactInfo])
      console.log("🚀 ~ addEventGuestIntoList ~ newNumber:", newNumber)
    }
  }
 

  const recentconversationItem = ({item:contactInfo}) => {
    console.log("🚀 ~ recentconversationItem ~ contactInfo:", contactInfo)
    const newNumber = contactInfo.callingCode+contactInfo.phoneNumber;
    const isAlreadySelected = []
    selectedContacts.map((item)=>{
      let fullNumber =  item.callingCode+item.phoneNumber;
      if(fullNumber == newNumber){
        isAlreadySelected.push(item)
      }
    })

   

    return (
      <TouchableOpacity onPress={()=>addEventGuestIntoList(contactInfo)}>
   <View style={MessagingStyles.recentconversationtem} >
  
       <View style={{flexDirection: 'column'}}>
         <Text style={MessagingStyles.whatsNewTextfirst}>{contactInfo.name}</Text>
         <Text style={MessagingStyles.whatsNewText}>{`${contactInfo.callingCode}${contactInfo.phoneNumber}`}</Text>
       </View>
      
       <Text style={MessagingStyles.whatsNewdate}>{isAlreadySelected?.length > 0?"checked":'not checked'}</Text>
     </View>
      </TouchableOpacity>
     
    )
  };


  const AddUserGuests = async () => {
    const user = await getFromLocalStorage('@UserInfo')
    const body= {
      user:Number(JSON.parse(user).id),
      contacts:selectedContacts

    }
    const response = await addEventGuests(eventId,body);

  console.log('response',response)
////


if (response.data) {
  // Set the card state
  setCard(response.data.data);

  // Show an alert indicating that the data is successfully retrieved
  Alert.alert('Success', 'Data is successfully retrieved');
}
////
    const data = {
      "user": 123,
  "contacts": [
    {
      "callingCode":callingCode,
      "phoneNumber": phoneNumber
    }
  ] };

    try {
      const response = await addEventGuests(data);
      // console.log(
      //   'Response from signInEmail::: .',
      //   response.response.data.statusCode,
      // );

      if (response.response.data.statusCode == 200) {
        navigation.navigate('InvitationRerport');
      } else {
        Snackbar.show({
          text: response.response.data.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }

    } catch (error) {

      console.error('Error signing in:', error);
      Snackbar.show({
        text: 'Something wend wrong, please try again',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
  };
  return (
    <View style={MessagingStyles.BackgroundWhite}>
      <View style={MessagingStyles.whilistminbody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={MessagingStyles.ScrollViewTestHe}>
          <View
            style={{
              width: '99%',
              flexDirection: 'row',
              height: 50,
              backgroundColor: '#f8f9fc',
              padding: SW(10),
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <IconF
                size={SF(20)}
                name="left"
                style={{height: SH(30), marginLeft: 10, marginRight: 20}}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignItems: 'center',
                alignContent: 'center',
                fontWeight: '700',
                fontSize: SF(20),
                color: 'black',
              }}>
              Add New Guests
            </Text>
            <Egypto
              size={SF(20)}
              name="dots-three-vertical"
              style={{marginLeft: 'auto'}}
            />
          </View>
          <View style={MessagingStyles.OnlineView}>
            <TouchableOpacity onPress={() => navigation.navigate('MessageV2')}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '800',
                  color: 'black',
                  marginLeft: 10,
                }}>
                Select Contacts
              </Text>
              <Text style={{fontSize: 13, marginLeft: 10}}>
                Please select contacts from your contact list
              </Text>
            </TouchableOpacity>
          </View>

          
          <View
            style={{
              flexDirection: 'row',
              height: 100,

              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder=""
              style={{
                height: 40,
                width: '80%',
                borderColor: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />
            <Image
              source={require('../../images/MaskgroupP.png')}
              style={{
                height: '30%',
                width: '10%',
                borderRadius: 2,
                marginLeft: 5,
              }}
            />
            {/* <Text style={MessagingStyles.friendstyle}>50 Friends online</Text> */}
          </View>
          
          <View>
            <FlatList
              data={contacts}
              renderItem={recentconversationItem}
              keyExtractor={item => item.id}
              vertical={true} // Set to true if you want a horizontal list
              //   numColumns={10} // Set the number of columns based on your design
            />
          </View>

          <TouchableOpacity
            style={{
              height: 50,
              width: '60%',
              backgroundColor: '#293170',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 100,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            onPress={AddUserGuests}
            // onPress={() => navigation.navigate('Home')}
            >
            <Text style={{color: 'white', fontWeight: '600'}}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default AddNewGuest;
