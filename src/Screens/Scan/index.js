import React, {useState, useMemo, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Linking,
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
const Scan = () => {
  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occurred', err),
    );
  };
  const cameraRef = useRef(null);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {Colors} = useTheme();
  // const default  = require('../../')
  // const HomeTabStyle = useMemo(() => HomeTabStyles(Colors), [Colors]);
  const [color, setcolor] = useState('Clean_Text');

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '99%',
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#f2f2f4',
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
        <View style={{height: '10%'}}>
          <QRCodeScanner
            onRead={onSuccess}
            bottomContent={
              <TouchableOpacity style={Scanstyle.buttonTouchable}>
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
    </View>
  );
};
export default Scan;
