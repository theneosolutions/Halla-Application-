import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Spacing, Search, Button} from '../../Components';
//import {RouteName} from '../../../routes';
import Login from '../../styles/CommonStyle/LoginScreenStyle';
import Style from '../../styles/CommonStyle/Style';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import {SH, Colors, SF} from '../../utils';
import IconG from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import images from '../../index';
import IconF from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {SW} from '../../utils/dimensions';

const Notification = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {Colors} = useTheme();
  // const default  = require('../../')
  // const HomeTabStyle = useMemo(() => HomeTabStyles(Colors), [Colors]);
  const [color, setcolor] = useState('Clean_Text');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewTestHeight}> */}
      <View style={HomeTabStyle.Container}>
        {/* <Search /> */}
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
            Notification
          </Text>
          {/* <Egypto
              size={SF(20)}
              name="dots-three-vertical"
              style={{marginLeft: 'auto'}}
            /> */}
        </View>
        <Text
          style={{
            fontSize: SF(18),
            color: 'black',
            fontWeight: '700',
            paddingLeft: SW(10),
            marginTop: SH(10),
          }}>
          Unread
        </Text>
        {/* <Spacing space={SH(20)} /> */}
        {/* //////////////////// */}
        <View style={HomeTabStyle.boxoneview}>
          <View style={HomeTabStyle.ImgView}>
            <Image
              source={images.User_image_one_profile}
              style={HomeTabStyle.recentConversationImage}
            />
          </View>
          <View style={HomeTabStyle.maintextView}>
            <Text style={{paddingTop: SF(26), marginLeft: SW(4)}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                  marginLeft: SW(40),
                  paddingLeft: SF(10),
                }}>
                Sophia Lee
              </Text>
              started following you
            </Text>
          </View>
          <View style={HomeTabStyle.lasttextView}>
            <Text style={HomeTabStyle.juststyle}>just now</Text>
            <IconF
              size={SF(17)}
              name="down"
              style={HomeTabStyle.iconStyle}
              // color={Colors.black_text_color}
            />
          </View>
        </View>
        {/* ///////////////////box1/end/////////// */}

        <View style={HomeTabStyle.boxsecondview}>
          <View style={{flexDirection: 'row'}}>
            <View style={HomeTabStyle.ImgView}>
              <Image
                source={images.User_image_one_profile}
                style={HomeTabStyle.recentConversationImage}
              />
            </View>

            <View style={HomeTabStyle.maintextView}>
              <Text style={{paddingTop: SF(26), margin: SW(4)}}>
                <Text
                  style={{
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Sophia Lee
                </Text>
                started following you
              </Text>
            </View>
            <View style={HomeTabStyle.lasttextViewsec}>
              <Text style={HomeTabStyle.juststylesec}>just now</Text>
              <IconF
                size={SF(17)}
                name="up"
                style={HomeTabStyle.iconStylesec}
                // color={Colors.black_text_color}
              />
            </View>
          </View>
          {/* <View style={MessagingStyles.recentconversationtem}> */}

          <View style={HomeTabStyle.btnview}>
            <TouchableOpacity style={HomeTabStyle.btnstyle}>
              <Text style={HomeTabStyle.btntext}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={HomeTabStyle.btnstyle}>
              <Text style={HomeTabStyle.btntext}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Spacing space={SH(20)} />
        {/* //////////////////////box2///////////////////// */}
        <Text
          style={{
            fontSize: SF(18),
            color: 'black',
            fontWeight: '700',
            paddingLeft: SW(10),
            marginTop: SH(10),
          }}>
          This Week
        </Text>
        <Spacing space={SH(20)} />
        <View style={HomeTabStyle.boxoneview}>
          {/* <View style={MessagingStyles.recentconversationtem}> */}
          <View style={HomeTabStyle.ImgView}>
            <Image
              source={images.User_image_one_profile}
              style={HomeTabStyle.recentConversationImage}
            />
          </View>
          <View style={HomeTabStyle.maintextView}>
            <Text style={{paddingTop: SF(26), margin: SW(4)}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                }}>
                Sophia Lee
              </Text>
              started following you
            </Text>
          </View>
          <View style={HomeTabStyle.lasttextView}>
            <Text style={HomeTabStyle.juststyle}>just now</Text>
            <IconF
              size={SF(17)}
              name="down"
              style={HomeTabStyle.iconStyle}
              // color={Colors.black_text_color}
            />
          </View>
        </View>

        {/* ///////////////////forthview///////////////// */}

        <View style={HomeTabStyle.boxoneview}>
          {/* <View style={MessagingStyles.recentconversationtem}> */}
          <View style={HomeTabStyle.ImgView}>
            <Image
              source={images.User_image_one_profile}
              style={HomeTabStyle.recentConversationImage}
            />
          </View>
          <View style={HomeTabStyle.maintextView}>
            <Text style={{paddingTop: SF(26), margin: SW(4)}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                }}>
                Sophia Lee
              </Text>
              started following you
            </Text>
          </View>
          <View style={HomeTabStyle.lasttextView}>
            <Text style={HomeTabStyle.juststyle}>just now</Text>
            <IconF
              size={SF(17)}
              name="down"
              style={HomeTabStyle.iconStyle}
              // color={Colors.black_text_color}
            />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};
export default Notification;
