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
  // Sample data for the FlatList
  const data = [
    {id: '.'},
    {id: '.'},
    {id: '.'},
    {id: '.'},
    {id: '.'},
    {id: '.'},
    {id: '.'},
    {id: '.'},
  ];
  const whatsNew = [
    {id: 1, text: 'aaa'},
    {id: 2, text: 'ww'},
    {id: 1, text: 'aaa'},
    {id: 2, text: 'ww'},
    {id: 1, text: 'aaa'},
    {id: 2, text: 'ww'},
  ];
  const recentconversation = [
    {
      id: 1,
      text: 'Darien Don',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
      texttwo: 'Great! Do you Love it.',
    },
    {
      id: 2,
      text: 'Shakib Hasan',
      title: '15:28 PM',
      texttwo: 'Great! Do you Love it.',
      image: images.UXdEsigner_one,
    },
    {
      id: 3,
      text: 'Jacksoon',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
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
      text: 'Jacksoon',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
    {
      id: 1,
      text: 'Jacksoon',
      texttwo: 'Great! Do you Love it.',
      title: '15:28 PM',
      image: images.UXdEsigner_one,
    },
  ];

  // Render item for the FlatList
  const renderItem = ({item}) => (
    <View style={MessagingStyles.itemBox}>
      <Text style={MessagingStyles.itemText}>{item.id}</Text>
    </View>
  );
  const renderWhatsNewItem = ({item}) => (
    <View style={MessagingStyles.watsnewMainview}>
      <View style={MessagingStyles.NewItemView}>
        <Text style={MessagingStyles.whatsNewTextstyle}>{item.text}</Text>
      </View>
    </View>
  );

  const recentconversationItem = ({item}) => (
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
  );
  return (
    <View style={MessagingStyles.BackgroundWhite}>
      <View style={MessagingStyles.whilistminbody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={MessagingStyles.ScrollViewTestHe}>
          <View style={MessagingStyles.OnlineView}>
            <TouchableOpacity onPress={() => navigation.navigate('MessageV2')}>
              <Text style={MessagingStyles.friendstyle}>What`s New</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={whatsNew}
              renderItem={renderWhatsNewItem}
              keyExtractor={item => item.id}
              horizontal={true} // Set to true if you want a horizontal list
              //   numColumns={10} // Set the number of columns based on your design
            />
          </View>
          <View style={MessagingStyles.OnlineView}>
            <Text style={MessagingStyles.friendstyle}>50 Friends online</Text>
          </View>
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal={true} // Set to true if you want a horizontal list
              //   numColumns={10} // Set the number of columns based on your design
            />
          </View>
          <View style={MessagingStyles.OnlineView}>
            <Text style={MessagingStyles.friendstyle}>
              Recent Conversations
            </Text>
          </View>
          <View>
            <FlatList
              data={recentconversation}
              renderItem={recentconversationItem}
              keyExtractor={item => item.id}
              vertical={true} // Set to true if you want a horizontal list
              //   numColumns={10} // Set the number of columns based on your design
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default MessagesV1;
