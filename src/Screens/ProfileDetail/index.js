import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
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

const ProfileTab = props => {
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

  return (
    <View style={ProfileTabStyle.BackgroundWhite}>
      <View style={ProfileTabStyle.whilistminbody}>
        <View style={ProfileTabStyle.ImagCenter}>
          <View>
            <Image
              style={ProfileTabStyle.ImageStyles}
              resizeMode="cover"
              source={images.User_image_one_profile}
            />
            <Text style={ProfileTabStyle.UserName}>{t('JohnSmith')}</Text>
          </View>
        </View>
        <View style={ProfileTabStyle.ProfileDetailesMinview}>
          {/* ///////////////////////williomjonson//////////////// */}
          <View style={ProfileTabStyle.profiledetailboxview}>
            <Text style={ProfileTabStyle.boxone}>WilliomsonJhon</Text>
            <Text style={ProfileTabStyle.boxtwo}></Text>
            <Icon
              size={SF(30)}
              name="pencil"
              // color={Colors.gray_text_color}

              style={ProfileTabStyle.boxthree}
              // color={Colors.black_text_color}
            />
          </View>
          {/* //////////////////Williomjanson/////////////////// */}
          <View style={ProfileTabStyle.profiledetailboxview}>
            <Text style={ProfileTabStyle.boxone}>+880 000 111 333</Text>
            <Text style={ProfileTabStyle.boxtwo}></Text>
            <Icon
              size={SF(30)}
              name="pencil"
              // color={Colors.gray_text_color}

              style={ProfileTabStyle.boxthree}
              // color={Colors.black_text_color}
            />
          </View>
          {/* //////////////////Williomjanson/////////////////// */}
          <View style={ProfileTabStyle.profiledetailboxview}>
            <Text style={ProfileTabStyle.boxone}>email@website.com</Text>
            <Text style={ProfileTabStyle.boxtwo}></Text>
            <Icon
              size={SF(30)}
              name="pencil"
              // color={Colors.gray_text_color}

              style={ProfileTabStyle.boxthree}
              // color={Colors.black_text_color}
            />
          </View>

          {/* //////////////////Williomjanson/////////////////// */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ProfileTabStyle.profiledetailboxview}>
              <Text style={ProfileTabStyle.boxone}>
                email@website.com{'\n'}Fusce Rd.Frederick Nebraska
              </Text>
              <Text style={ProfileTabStyle.boxtwo}></Text>
              <Icon
                size={SF(30)}
                name="pencil"
                // color={Colors.gray_text_color}

                style={ProfileTabStyle.boxthree}
                // color={Colors.black_text_color}
              />
            </View>
          </TouchableOpacity>
          {/* /////////////////////////////// */}

          <TouchableOpacity
            style={ProfileTabStyle.savebtn}
            onPress={() => navigation.navigate('ChatScreen')}>
            <Text style={ProfileTabStyle.savebtntext}>Save Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ProfileTab;
