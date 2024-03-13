import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/AntDesign';
import IconG from 'react-native-vector-icons/Ionicons';
import ProfileTabStyle from '../../styles/CommonStyle/ProfileTabStyles';
import Style from '../../styles/CommonStyle/Style';
import {Button, Spacing, Input} from '../../Components';
import {SH, SF, SW, Colors} from '../../utils';
import images from '../../index';
// import RouteName from '../../../routes/RouteName';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';

const EditProfile = props => {
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
    <View style={{flex: 1}}>
      <View style={ProfileTabStyle.BackgroundWhite}>
        <View style={ProfileTabStyle.whilistminbody}>
          <Text style={ProfileTabStyle.UserName}>
            {t('Your Profile Information')}
          </Text>
          <View style={ProfileTabStyle.ImagCenter}>
            <View>
              <Image
                style={ProfileTabStyle.ImageStyles}
                resizeMode="cover"
                source={images.User_image_one_profile}
              />
            </View>
          </View>
          <View style={ProfileTabStyle.ProfileDetailesMinview}>
            <Text style={ProfileTabStyle.InfoProFile}>Jhon Smith</Text>
            <Text style={ProfileTabStyle.EditProFile}>{t('New York')}</Text>

            <View style={ProfileTabStyle.btnview}>
              <TouchableOpacity
                style={ProfileTabStyle.ActiveButton}
                onPress={() => navigation.navigate('ProfileDetail')}>
                <Text style={ProfileTabStyle.textstyle}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ProfileTabStyle.ActiveButton}
                onPress={() => navigation.navigate('SettingScreen')}>
                <Text style={ProfileTabStyle.textstyle}>Follow</Text>
              </TouchableOpacity>
            </View>

            <View style={ProfileTabStyle.boxView}>
              <View style={ProfileTabStyle.folowerLineView}>
                <Text style={ProfileTabStyle.linetext}>800</Text>
                <Text style={ProfileTabStyle.seclinetext}>Event</Text>
              </View>
              <View style={ProfileTabStyle.onesidebox}>
                <Text style={ProfileTabStyle.linetext}>7979</Text>
                <Text style={ProfileTabStyle.seclinetext}>Follower</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 0.2,
                  color: 'gray',
                  height: '70%',
                  borderRightColor: 'gray',
                }}>
                <Text style={ProfileTabStyle.linetext}>999</Text>
                <Text style={ProfileTabStyle.seclinetext}>Following</Text>
              </View>
            </View>
            {/* /////////////earning///////////// */}
            <TouchableOpacity
              onPress={() => navigation.navigate('invitationreport')}>
              <View style={ProfileTabStyle.mainboxView}>
                <Text style={ProfileTabStyle.boxone}>Earning</Text>
                <Text style={ProfileTabStyle.boxtwo}></Text>
                <IconF
                  size={SF(20)}
                  name="right"
                  style={ProfileTabStyle.boxthree}
                  // color={Colors.black_text_color}
                />
              </View>
            </TouchableOpacity>
            {/* ////////////Favorities////////////////// */}

            <TouchableOpacity
              onPress={() => navigation.navigate('SettingScreen')}>
              <View style={ProfileTabStyle.mainboxView}>
                <Text style={ProfileTabStyle.boxone}>Favorites</Text>
                <Text style={ProfileTabStyle.boxtwo}>20 Event</Text>
                <IconF
                  size={SF(20)}
                  name="right"
                  style={ProfileTabStyle.boxthree}
                  // color={Colors.black_text_color}
                />
              </View>
            </TouchableOpacity>
            {/* ////////////////EventGoing/////////////////////// */}

            <TouchableOpacity onPress={() => navigation.navigate('MessageV2')}>
              <View style={ProfileTabStyle.mainboxView}>
                <Text style={ProfileTabStyle.boxone}>Event Going</Text>
                <Text style={ProfileTabStyle.boxtwo}>20 Event</Text>
                <IconF
                  size={SF(20)}
                  name="right"
                  style={ProfileTabStyle.boxthree}
                  // color={Colors.black_text_color}
                />
              </View>
            </TouchableOpacity>

            {/* /////////////////////Edit Profile///////////////////// */}

            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileDetail')}>
              <View style={ProfileTabStyle.mainboxView}>
                <Text style={ProfileTabStyle.boxone}>Edit Profile</Text>
                <Text style={ProfileTabStyle.boxtwo}></Text>
                <IconF
                  size={SF(20)}
                  name="right"
                  style={ProfileTabStyle.boxthree}
                  // color={Colors.black_text_color}
                />
              </View>
            </TouchableOpacity>
            {/* ///////////////Setting////////////////////////// */}

            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileDetail')}>
              <View style={ProfileTabStyle.mainboxView}>
                <Text style={ProfileTabStyle.boxone}>Edit Setting</Text>
                <Text style={ProfileTabStyle.boxtwo}></Text>
                <IconF
                  size={SF(20)}
                  name="right"
                  style={ProfileTabStyle.boxthree}
                  // color={Colors.black_text_color}
                />
              </View>
            </TouchableOpacity>

            {/* /////////////////////////////////////////////// */}
          </View>
        </View>
      </View>
    </View>
  );
};
export default EditProfile;
