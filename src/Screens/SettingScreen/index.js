import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/AntDesign';
import IconG from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import ProfileTabStyle from '../../styles/CommonStyle/ProfileTabStyles';
import Style from '../../styles/CommonStyle/Style';
import {Button, Spacing, Input} from '../../Components';
import {SH, SF, SW, Colors} from '../../utils';
import images from '../../index';
// import RouteName from '../../../routes/RouteName';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StyleSheet} from '../../../node_modules/react-native/types/index';

const SettingScreen = props => {
  const {Colors} = useTheme();
  //const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalcontent, setmodalcontent] = useState(0);
  const [passwordVisibilityold, setpasswordVisibilityold] = useState(true);
  const [passwordVisibilitynew, setpasswordVisibilitynew] = useState(true);
  const [passwordVisibilityconfirm, setPasswordVisibilityconfirm] =
    useState(true);

  const stateArray = {
    Oldpassword: '',
    Newpassword: '',
    email: '',
    Confirmpassword: '',
    number: null,
  };
  const [state, setState] = useState(stateArray);

  const onChangeText = text => {
    if (text === 'Oldpassword')
      setpasswordVisibilityold(!passwordVisibilityold);
    if (text === 'Newpassword')
      setpasswordVisibilitynew(!passwordVisibilitynew);
    if (text === 'Confirmpassword')
      setPasswordVisibilityconfirm(!passwordVisibilityconfirm);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setModalVisible(false);
      setmodalcontent(0);
    });
  }, [navigation]);
  const handleUsernamePress = () => {
    // Handle press for the "Username" section
    console.log('Username section pressed');
    // Add your logic or navigation here
  };
  return (
    <>
      <View style={ProfileTabStyle.BackgroundWhite}>
        <View style={ProfileTabStyle.whilistminbody}>
          {/* ////////////////////jhonsmith//////////////// */}
          <View style={ProfileTabStyle.mainboxViewJohn}>
            <Image
              style={ProfileTabStyle.LeftImageStyles}
              resizeMode="cover"
              source={images.User_image_one_profile}
            />
            <View>
              <Text style={ProfileTabStyle.johnboxtwo}>Jhon Smith</Text>
              <Text style={ProfileTabStyle.basicMemberStyle}>Basic Member</Text>
            </View>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>
          {/* ///////////////// */}

          <View style={ProfileTabStyle.accountview}>
            <Text style={ProfileTabStyle.accountstyle}>Account</Text>
          </View>

          {/* /////////////johnsmith///////////// */}

          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconE
              size={SF(27)}
              name="lock"
              style={ProfileTabStyle.LeftIconStyles}
              // color={Colors.black_text_color}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Change Password</Text>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>
          {/* ///////////////////////// */}

          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconM
              size={SF(27)}
              name="bell-ring"
              style={ProfileTabStyle.LeftIconStyles}
              // color={Colors.black_text_color}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>OrderManagement</Text>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <FeIcon
              size={SF(27)}
              name="settings"
              style={ProfileTabStyle.LeftIconStyles}
              // color={Colors.black_text_color}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Document Management</Text>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(27)}
              name="payment"
              style={ProfileTabStyle.LeftIconStyles}
              // color={Colors.black_text_color}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Payment</Text>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(27)}
              name="align-horizontal-left"
              style={ProfileTabStyle.LeftIconStyles}
              // color={Colors.black_text_color}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Sign Out</Text>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.accountview}>
            <Text style={ProfileTabStyle.accountstyle}>More Options</Text>
          </View>

          {/* /////////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(27)}
              name="align-horizontal-left"
              style={ProfileTabStyle.LeftIconStyles}
              // color={Colors.black_text_color}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Newsletter</Text>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>
          {/* //////////////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(27)}
              name="align-horizontal-left"
              style={ProfileTabStyle.LeftIconStyles}
              // color={Colors.black_text_color}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Text Message</Text>

            <IconF
              size={SF(27)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
              // color={Colors.black_text_color}
            />
          </View>
          {/* //////////////////////////////////// */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ProfileTabStyle.mainsecboxViewJohn}>
              <IconMI
                size={SF(27)}
                name="align-horizontal-left"
                style={ProfileTabStyle.LeftIconStyles}
                // color={Colors.black_text_color}
              />

              <Text style={ProfileTabStyle.johnboxtwo}>Phone Call</Text>
              <Text style={{paddingLeft: SF(70)}}>$USD</Text>
              <IconF
                size={SF(27)}
                name="right"
                style={ProfileTabStyle.Jognboxthree}
                // color={Colors.black_text_color}
              />
            </View>
          </TouchableOpacity>
          {/* //////////////////////////////////// */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ProfileTabStyle.mainsecboxViewJohn}>
              <IconMI
                size={SF(27)}
                name="align-horizontal-left"
                style={ProfileTabStyle.LeftIconStyles}
                // color={Colors.black_text_color}
              />

              <Text style={ProfileTabStyle.johnboxtwo}>Phone Call</Text>
              <Text style={{paddingLeft: SF(70)}}>$USD</Text>
              <IconF
                size={SF(27)}
                name="right"
                style={ProfileTabStyle.Jognboxthree}
                // color={Colors.black_text_color}
              />
            </View>
          </TouchableOpacity>
          {/* /////////////////////////////////// */}

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ProfileTabStyle.mainsecboxViewJohn}>
              <IconMI
                size={SF(27)}
                name="align-horizontal-left"
                style={ProfileTabStyle.LeftIconStyles}
                // color={Colors.black_text_color}
              />

              <Text style={ProfileTabStyle.johnboxtwo}> Currency</Text>

              <Text style={{paddingLeft: SF(30)}}>facebood go.</Text>
              <IconF
                size={SF(27)}
                name="right"
                style={ProfileTabStyle.Jognboxthree}
                // color={Colors.black_text_color}
              />
            </View>
          </TouchableOpacity>
          {/* ////////////////////////////////// */}
        </View>
      </View>
    </>
  );
};
export default SettingScreen;
