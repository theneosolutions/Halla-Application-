import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Linking,
  FlatList,
} from 'react-native';
import Egypto from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import {Spacing, Search, Button, Input} from '../../Components';
//import {RouteName} from '../../../routes';
import Login from '../../styles/CommonStyle/LoginScreenStyle';
import Style from '../../styles/CommonStyle/Style';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import IconA from 'react-native-vector-icons/AntDesign';
import IconG from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import images from '../../index';
import Scanstyle from '../../styles/CommonStyle/Scanstyle';
import {useTranslation} from 'react-i18next';
import {SF, SW, SH, Colors} from '../../utils';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import IconF from 'react-native-vector-icons/AntDesign';
import {baseUrl, eventId, invitationScan} from '../../Services/ApiList';
import Snackbar from 'react-native-snackbar';

const Scan = ({route}) => {
  const [events, setEvents] = useState([]);
  const [checkStatus, setCheckStatus] = useState(false);
  const [invitationURL, setInviationURL] = useState(null);
  const onSuccess = e => {
    if(e.data && checkStatus == false) {
      setCheckStatus(true);
      const apiURL = e.data;
      const url = apiURL.split(baseUrl);

      setInviationURL(url[1]);
    }
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occurred', err),
    // );
  };

  const cameraRef = useRef(null);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {Colors} = useTheme();
  // const default  = require('../../')
  // const HomeTabStyle = useMemo(() => HomeTabStyles(Colors), [Colors]);
  const [color, setcolor] = useState('Clean_Text');

  useEffect(() => {
    // Fetch data from the EventId API
    const fetchData = async () => {
      try {
        const response = await eventId(route.params?.id);
        if (response?.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const resetQrScanHandler = () => {
    setTimeout(() => {
      setCheckStatus(false);
      setInviationURL(null);
    }, 6000);
  }

  const getScanQrStatus = async () => {
    try {
      const response = await invitationScan(invitationURL);

      if(response?.data?.message) {
        Snackbar.show({
          text: `${response.data.message}`,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'green',
        });
        resetQrScanHandler();
      } 
    } catch (e) {
      Snackbar.show({
        text: `${e.message}`,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        
      });
    }
  };

  useEffect(() => {
    // Fetch data from the EventId API
    if(checkStatus) {
      getScanQrStatus();
    }

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, [checkStatus]);

  const handleEventPress = event => {
    // Handle event press here, you can navigate to event details screen or perform any action
    console.log('Event pressed:', event);
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '99%',
          flexDirection: 'row',
          // height: '100%',
          backgroundColor: '#f2f2f4',
          padding: SW(5),
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconF
            size={SF(20)}
            name="left"
            style={{height: SH(20), marginLeft: 10, marginRight: 20}}
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
          Scan
        </Text>
        {/* <Egypto
          size={SF(20)}
          name="dots-three-vertical"
          style={{marginLeft: 'auto'}}
        /> */}
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Scanstyle.ScrollViewTestHeight}>
        <View style={{height: '100%'}}>
          <QRCodeScanner
            onRead={onSuccess}
            bottomContent={
              <TouchableOpacity style={Scanstyle.buttonTouchable} onPress={() => navigation.goBack()}>
                <Text style={Scanstyle.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        </View>

        {/* Additional text below scanner */}
        {/* <View style={{paddingTop: 20}}>
          <View style={HomeTabStyle.maintextView}>
            <Text style={{paddingTop: 26, marginHorizontal: 4}}>
              <Text style={{fontWeight: '500', color: 'black'}}>
                Sophia Lee
              </Text>
              started following you
            </Text>
          </View>

          <Text style={HomeTabStyle.juststylesec}>just now</Text>
        </View> */}
      </ScrollView>

      {/* <View style={{flex: 1, backgroundColor: 'lightgray'}}>
        <TouchableOpacity onPress={() => navigation.navigate('ScanList')}>
          <Text>Scanxxx</Text>
        </TouchableOpacity> */}

      {/* <View style={{flex: 1, backgroundColor: 'lightgray'}}>
          <FlatList
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleEventPress(item)}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View> */}
      {/* </View> */}
    </View>
  );
};
export default Scan;
