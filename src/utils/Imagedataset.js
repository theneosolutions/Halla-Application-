// import {Lottie} from '../Components';
import React from 'react';
import images from '../index';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../utils';
import IconM from 'react-native-vector-icons/FontAwesome5';
import IconT from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Feather';
import IconO from 'react-native-vector-icons/Octicons';
// import {RouteName} from '../routes';
import {HomeTabStyles} from '../styles/CommonStyle/HomeTab';
import {Style} from '../styles/CommonStyle/Style';

// export const Swiperdata = [
//   {
//     key: 's1',
//     text: 'Swiperfirst',
//     title: 'Swipertitle',
//     animation: <Lottie source={images.First_Swiper} />,
//   },
//   {
//     key: 's2',
//     text: 'SwiperFirstTwo',
//     title: 'SwiperTitleTwo',
//     animation: <Lottie source={images.Two_Swiper} />,
//   },
//   {
//     key: 's3',
//     text: 'SwiperFirstThree',
//     title: 'Swipertitlethree',
//     animation: <Lottie source={images.Three_Swiper} />,
//     backgroundColor: 'transparent',
//   },
// ];
// export const Countrydata = [
//   {
//     id: 1,
//     textsimple: 'Afghanistan',
//     digit: '+ 93',
//   },
//   {
//     id: 2,
//     textsimple: 'Albania',
//     digit: '+ 355',
//   },
//   {
//     id: 3,
//     textsimple: 'Algeria',
//     digit: '+ 213',
//   },
//   {
//     id: 1,
//     textsimple: 'Belgium',
//     digit: '+ 32',
//   },
//   {
//     id: 4,
//     textsimple: 'Belize',
//     digit: '+ 501',
//   },
//   {
//     id: 5,
//     textsimple: 'Benin',
//     digit: '+ 229',
//   },
//   {
//     id: 6,
//     textsimple: 'Gambia',
//     digit: '+ 220',
//   },
//   {
//     id: 7,
//     textsimple: 'Georgia',
//     digit: '+ 995',
//   },
//   {
//     id: 8,
//     textsimple: 'Greece',
//     digit: '+ 30',
//   },
//   {
//     id: 9,
//     textsimple: 'Hong Kong',
//     digit: '+ 852',
//   },
//   {
//     id: 10,
//     textsimple: 'Iceland',
//     digit: '+ 354',
//   },
//   {
//     id: 11,
//     textsimple: 'India',
//     digit: '+ 91',
//   },
//   {
//     id: 12,
//     textsimple: 'Japan',
//     digit: '+ 81',
//   },
//   {
//     id: 13,
//     textsimple: 'Kazakhstan',
//     digit: '+ 7',
//   },
//   {
//     id: 14,
//     textsimple: 'Lebanon',
//     digit: '+ 961',
//   },
//   {
//     id: 15,
//     textsimple: 'Liberia',
//     digit: '+ 231',
//   },
//   {
//     id: 16,
//     textsimple: 'Liechtenstein',
//     digit: '+ 423',
//   },
//   {
//     id: 17,
//     textsimple: 'Luxembourg',
//     digit: '+ 352',
//   },
//   {
//     id: 18,
//     textsimple: 'Malawi',
//     digit: '+ 256',
//   },
//   {
//     id: 19,
//     textsimple: 'Maldives',
//     digit: '+ 960',
//   },
//   {
//     id: 20,
//     textsimple: 'Mexico',
//     digit: '+ 52',
//   },
// ];

// export const Messagelistdata = [
//   {
//     id: 1,
//     image: images.UXdEsigner_one,
//     text: 'Alastair_Cook',
//     texttwoset: 'Online_Text',
//     icon: <IconO name="dot-fill" size={30} color={'#40d375'} />,
//   },
//   {
//     id: 2,
//     image: images.Chat_image_one,
//     text: 'Graham_Gooch',
//     texttwoset: 'Offline_Text',
//     settime: 'Minutes_Ago',
//     icon: <IconO name="dot-fill" size={30} color={'red'} />,
//   },
//   {
//     id: 3,
//     image: images.Fan_Service_image_2,
//     text: 'Andrew_Flintoff',
//     texttwoset: 'Online_Text',
//     icon: <IconO name="dot-fill" size={30} color={'#40d375'} />,
//   },
//   {
//     id: 4,
//     image: images.Chat_image_saven,
//     text: 'Ian_Botham',
//     texttwoset: 'Online_Text',
//     icon: <IconO name="dot-fill" size={30} color={'#40d375'} />,
//   },
//   {
//     id: 5,
//     image: images.Chat_image_five,
//     text: 'Sophia_Dunkley',
//     texttwoset: 'Offline_Text',
//     settime: 'Minutes_Ago_41',
//     icon: <IconO name="dot-fill" size={30} color={'red'} />,
//   },
//   {
//     id: 6,
//     image: images.Chat_image_six,
//     text: 'Lauren_Bell',
//     texttwoset: 'Online_Text',
//     icon: <IconO name="dot-fill" size={30} color={'#40d375'} />,
//   },
//   {
//     id: 7,
//     image: images.Chat_image_saven,
//     text: 'Charlie_Dean',
//     texttwoset: 'Offline_Text',
//     settime: 'Minutes_Ago_1',
//     icon: <IconO name="dot-fill" size={30} color={'red'} />,
//   },
//   {
//     id: 8,
//     image: images.Chat_image_five,
//     text: 'Danni_Wyatt',
//     texttwoset: 'Offline_Text',
//     settime: 'Minutes_Ago_3',
//     icon: <IconO name="dot-fill" size={30} color={'red'} />,
//   },
// ];
// export const Faqdataset = [
//   {
//     id: 1,
//     paymentparegraph: 'FAQ_paregraph_One',
//     smalltext: 'FAQ_paregraph_Two',
//   },
//   {
//     id: 2,
//     paymentparegraph: 'FAQ_paregraph_Three',
//     smalltext: 'FAQ_paregraph_Four',
//   },
//   {
//     id: 3,
//     paymentparegraph: 'FAQ_paregraph_Five',
//     smalltext: 'FAQ_paregraph_Six',
//   },
//   {
//     id: 4,
//     paymentparegraph: 'FAQ_Paregraph_Saven',
//     smalltext: 'FAQ_Paregraph_Aeight',
//   },
//   {
//     id: 5,
//     paymentparegraph: 'FAQ_Paregraph_Nine',
//     smalltext: 'FAQ_Paregraph_Ten',
//   },
//   {
//     id: 6,
//     paymentparegraph: 'FAQ_Paregraph_Eleven',
//     smalltext: 'FAQ_One',
//   },
//   {
//     id: 7,
//     paymentparegraph: 'FAQ_Two',
//     smalltext: 'FAQ_Three',
//   },
//   {
//     id: 8,
//     paymentparegraph: 'FAQ_Four',
//     smalltext: 'FAQ_Five',
//   },
// ];
export const MessageBox = [
  {
    id: 1,
    text: 'Mennage_Text',
    iconname: (
      <Icon name="woman" size={20} color={Colors.theme_background_han_Purple} />
    ),
  },
  {
    id: 2,
    text: 'Clean_Text',
    iconname: (
      <IconT
        name="cleaning-services"
        size={20}
        color={Colors.theme_background_han_Purple}
      />
    ),
  },
  {
    id: 3,
    text: 'Repair_Text',
    iconname: (
      <IconT
        name="home-repair-service"
        size={20}
        color={Colors.theme_background_han_Purple}
      />
    ),
  },
  {
    id: 4,
    text: 'Fan_Text',
    iconname: (
      <IconM name="fan" size={20} color={Colors.theme_background_han_Purple} />
    ),
  },
];
// export const OurService = [
//   {
//     id: 1,
//     text: 'AC_Service',
//     Acimage: images.AC_Animation,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 2,
//     text: 'Fan_Service',
//     Acimage: images.FanAc_Image,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 3,
//     text: 'Order_History_2',
//     Acimage: images.Plumber_Animation,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 4,
//     text: 'Order_History_7',
//     Acimage: images.Clining_Animation,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
// ];
// export const OurServiceViewAll = [
//   {
//     id: 1,
//     text: 'AC_Service',
//     Acimage: images.AC_Animation,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 2,
//     text: 'Fan_Service',
//     Acimage: images.FanAc_Image,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 3,
//     text: 'Order_History_2',
//     Acimage: images.Plumber_Animation,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 4,
//     text: 'Order_History_7',
//     Acimage: images.Clining_Animation,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 5,
//     text: 'Order_History_4',
//     Acimage: images.Home_Security,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 6,
//     text: 'Order_History_3',
//     Acimage: images.Electric_Service,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
// ];
// export const HiNewsViewdata = [
//   {
//     id: 1,
//     text: 'AC_News',
//     newsparegraph: 'News_Paregraph',
//     Acimage: images.Fan_Service_image_1,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 2,
//     text: 'AC_Clean_News',
//     newsparegraph: 'News_Paregraph_two',
//     Acimage: images.Computer_service,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 3,
//     text: 'AC_Fan_News',
//     newsparegraph: 'News_Paregraph_three',
//     Acimage: images.cleaning,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
//   {
//     id: 4,
//     text: 'AC_Service_News',
//     newsparegraph: 'News_Paregraph_four',
//     Acimage: images.Fan_Service_image_4,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//   },
// ];
// export const OrderHistoryData = [
//   {
//     id: 1,
//     image: images.UXdEsigner_one,
//     text: 'Alastair_Cook',
//     texttwo: 'Order_History_1',
//     ButtonText: 'Days_four',
//   },
//   {
//     id: 2,
//     image: images.Chat_image_one,
//     text: 'Graham_Gooch',
//     texttwo: 'Order_History_2',
//     ButtonText: 'Open_Text',
//   },
//   {
//     id: 3,
//     image: images.Computer_service,
//     text: 'Andrew_Flintoff',
//     texttwo: 'Order_History_3',
//     ButtonText: 'Open_Text',
//   },
//   {
//     id: 4,
//     image: images.Fan_Service_image_3,
//     text: 'Ian_Botham',
//     texttwo: 'Order_History_4',
//     ButtonText: 'Days_four',
//   },
//   {
//     id: 5,
//     image: images.Chat_image_five,
//     text: 'Sophia_Dunkley',
//     texttwo: 'Order_History_5',
//     ButtonText: 'Days_13',
//   },
//   {
//     id: 6,
//     image: images.Chat_image_six,
//     text: 'Lauren_Bell',
//     texttwo: 'Order_History_6',
//     ButtonText: 'Days_3',
//   },
//   {
//     id: 7,
//     image: images.Chat_image_saven,
//     text: 'Charlie_Dean',
//     texttwo: 'Order_History_7',
//     ButtonText: 'Days_18',
//   },
//   {
//     id: 8,
//     image: images.cleaning,
//     text: 'Danni_Wyatt',
//     texttwo: 'Order_History_8',
//     ButtonText: 'Open_Text',
//   },
// ];
// export const OrderDetailsData = [
//   {
//     id: 1,
//     title: 'Order_History_6',
//     Charge: '15',
//     digit: 0,
//     Acimage: images.Chat_image_six,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//     description: 'Order_Detail_Description_1',
//   },
//   {
//     id: 2,
//     title: 'Order_History_3',
//     Charge: '30',
//     digit: 1,
//     Acimage: images.Computer_service,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//     description: 'Order_Detail_Description_2',
//   },
//   {
//     id: 3,
//     title: 'Order_History_5',
//     Charge: '12',
//     digit: 0,
//     Acimage: images.Chat_image_five,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//     description: 'Order_Detail_Description_3',
//   },
//   {
//     id: 4,
//     title: 'Order_History_2',
//     Charge: '20',
//     digit: 0,
//     Acimage: images.Chat_image_one,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//     description: 'Order_Detail_Description_4',
//   },
//   {
//     id: 5,
//     title: 'AC_News',
//     Charge: '35',
//     digit: 1,
//     Acimage: images.Fan_Service_image_1,
//     iconname: (
//       <Icon
//         name="message1"
//         size={20}
//         color={Colors.theme_background_han_Purple}
//       />
//     ),
//     description: 'Order_Detail_Description_5',
//   },
// ];
