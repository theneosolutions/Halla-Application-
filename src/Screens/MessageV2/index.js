import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/AntDesign';
import IconG from 'react-native-vector-icons/Ionicons';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import {Spacing, Search, Button} from '../../Components';
import Style from '../../styles/CommonStyle/Style';
import {SH, MessageBox, OurService, HiNewsViewdata, Colors} from '../../utils';
import images from '../../index';
// import RouteName from '../../../routes/RouteName';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
const MessagesV1 = props => {
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

  const recentconversation = [
    {
      id: 1,
      text: 'Darien Don',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
      texttwo: 'Great! Do you Love it.',
    },
    {
      id: 1,
      text: 'Shakib Hasan',
      title: '15:28 PM',
      texttwo: 'Great! Do you Love it.',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'Jacksoon',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'aaa',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'aaa',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'aaa',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'aaa',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'aaa',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'aaa',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
  ];

  const recentconversationItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
      <View style={MessagingStyles.recentconversationtem}>
        <View style={MessagingStyles.ImgView}>
          <Image
            source={item.image}
            style={MessagingStyles.recentConversationImage}
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={MessagingStyles.whatsNewTextfirst}>{item.text}</Text>
          <Text style={MessagingStyles.whatsNewText}>{item.texttwo}</Text>
        </View>

        <Text style={MessagingStyles.whatsNewdate}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={MessagingStyles.BackgroundWhite}>
      <View style={MessagingStyles.whilistminbody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={MessagingStyles.ScrollViewTestHe}>
          {/* <View style={MessagingStyles.searchView}> */}
          <Search />
          {/* </View> */}

          <View>
            <FlatList
              data={recentconversation}
              renderItem={recentconversationItem}
              keyExtractor={item => item.id}
              vertical={true}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default MessagesV1;
