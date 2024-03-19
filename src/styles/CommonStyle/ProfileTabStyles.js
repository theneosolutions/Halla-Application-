import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors, widthPercent} from '../../utils';
const ProfileTabStyles = StyleSheet.create({
  BackgroundWhite: {
    backgroundColor: 'white',
    // backgroundColor: Colors.theme_background_han_Purple,
  },

  folowerLineView: {
    borderRightWidth: 0.2,
    color: 'gray',
    height: '70%',
    borderRightColor: 'black',
  },
  onesidebox: {
    borderRightWidth: 0.2,
    color: 'gray',
    height: '70%',
    borderRightColor: 'black',
  },
  basicMemberStyle: {
    fontSize: 10,
    color: 'black',
    paddingLeft: SW(10),
  },

  whilistminbody: {
    width: '100%',
    // marginTop: '1%',
    height: '100%',
  },
  ScrollViewTestHe: {
    height: 'auto',
    width: '100%',
  },
  ImagCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',

    marginTop: SH(10),
  },
  ImageStyles: {
    width: SW(90),
    height: SH(100),
    borderRadius: SH(300),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LeftImageStyles: {
    width: SW(40),
    height: SH(50),
    borderRadius: SH(300),
    backgroundColor: 'gray',
    marginLeft: SW(5),
   
  },
  LeftIconStyles: {
    width: SW(30),
    height: SH(70),
    paddingTop: SH(26),
    color:"black",
    marginLeft: SW(10),
  },
  UserName: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
    fontSize: SF(18),
    fontWeight: '700',
  },
  ProfileDetailesMinview: {
    width: '90%',
    marginHorizontal: '5%',
  },
  PhoneNumberAndIcon: {
    marginTop: '0%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_text_color, // Choose your desired color
    width: '100%',
    marginTop: SH(5), // Adjust as needed
    // paddingBottom: SH(13),
  },
  BgWhiteShadow: {
    // backgroundColor: Colors.white_text_color,
    width: '100%',
    textAlign: 'center',
    height: SH(60),
    // borderRadius: 7,
    paddingHorizontal: SH(10),
    // justifyContent: 'center',
    shadowColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    // shadowOpacity: 0.58,
    // shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    // elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  BgWhiteShadowInputModal: {
    width: '100%',
    height: SH(50),
    borderRadius: 7,
    paddingLeft: SH(10),
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
    paddingRight: SH(10),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: Colors.gray_text_color,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 5,
      minHeight: '100%',
    },
    shadowOpacity: 1,
    shadowRadius: Platform.OS === 'ios' ? 2 : 50,
    elevation: Platform.OS === 'ios' ? 1 : 6,
    overflow: 'hidden',
    borderRadius: 7,
    textAlignVertical: 'bottom',
  },
  EditProFile: {
    marginTop: '1%',
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
    fontSize: SF(15),
    paddingBottom: SH(13),
    textAlign: 'center',
  },
  InfoProFile: {
    marginTop: '5%',
    justifyContent: 'center',
    fontFamily: Fonts.Poppins_Medium,
    //color: 'black',
    color: Colors.black_text_color,
    fontSize: SF(23),
    fontWeight: '800',
    alignItems: 'center',
    textAlign: 'center',
    // padding: SH(30),
  },
  PhoneNumberText: {
    color: Colors.black_text_color,
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
  },
  DigitNumberText: {
    color: Colors.gray_text_color,
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
  },
  LogOutView: {
    textAlign: 'center',
    color: Colors.black_text_color,
    borderBottomColor: 'red',
    fontSize: SF(20),
    fontFamily: Fonts.Poppins_Medium,
    paddingBottom: SH(15),
    backgroundColor: 'transparent',
  },
  CenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray_text_color,
  },
  IconClose: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: -15,
  },
  ModalView: {
    backgroundColor: Colors.white_text_color,
    borderRadius: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ShadowStyleModalTwo: {
    padding: SH(2),
    width: '100%',
  },
  AllPaddingModal: {
    paddingTop: SH(30),
    paddingBottom: SH(15),
    paddingHorizontal: SH(15),
    borderRadius: 100,
  },
  ModalText: {
    textAlign: 'center',
    color: Colors.black_text_color,
    fontSize: SF(22),
    fontFamily: Fonts.Poppins_Medium,
  },
  MarginRightView: {
    width: '48%',
  },
  Marginright: {
    width: '48%',
  },
  input: {
    fontFamily: Fonts.Poppins_Medium,
    // height: 40,
    width: '100%',
    fontSize: SF(17),
  },
  ButtonsetModleTwoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: SH(10),
  },
  spaceview: {
    paddingTop: SH(12),
  },
  InputUnderLine: {
    backgroundColor: Colors.white_text_color,
    width: Platform.OS === 'ios' ? '100%' : '100%',
    height: SH(50),
    paddingRight: SH(20),
    borderRadius: 7,
    flexDirection: 'row',
    fontFamily: Fonts.Poppins_Medium,
    width: '100%',
    backgroundColor: Colors.white_text_color,
    shadowColor: Colors.gray_text_color,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 5,
      minHeight: '100%',
    },
    shadowOpacity: 1,
    shadowRadius: Platform.OS === 'ios' ? 2 : 50,
    elevation: Platform.OS === 'ios' ? 1 : 6,
    overflow: 'hidden',
    borderRadius: 7,
  },
  InputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  TextPasswored: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    width: '100%',
    fontSize: SF(16),
  },
  SingleButtonStyles: {
    borderColor: Colors.theme_background_brink_pink,
    backgroundColor: Colors.white_text_color,
    borderWidth: 1,
  },
  IconAndTextFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SingleButtonText: {
    color: Colors.theme_background_brink_pink,
  },
  btnview: {
    flexDirection: 'row',
  
    justifyContent: 'center',
    margin: SH(20),

  },
  ActiveButton: {
    height: SH(40),
    width: SW(90),
    backgroundColor: Colors.darkBlue,
    borderRadius: SH(20),
    // margin: SH(10),
    marginLeft: SW(8),
  },
  textstyle: {
    color: 'white',
    fontSize: SF(16),
    textAlign: 'center',
    justifyContent: 'center',
    // margin: SW(2),
    fontWeight: '500',
    padding: SH(10),
  },
  boxView: {
    height: SH(60),
    width: SW(320),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SH(30),
    // backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 0.2,
    borderTopColor: Colors.gray_text_color,
     borderColor:'black' // Choose your desired color

    // marginTop: SH(5), // Adjust as needed
  },
  linetext: {
    fontSize: SF(17),
    color: Colors.black_text_color,
    marginRight: SH(5),
    fontWeight: '700',
  },
  seclinetext: {
    fontSize: SF(14),
    color: Colors.black_text_color,

    fontWeight: '400',
    paddingRight: SW(18),
  },
  mainboxView: {
    height: SH(40),
    width: SW(340),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor:'black',
    margin: SH(8),
  },
  mainboxViewJohn: {
    height: SH(60),
    width: SW(360),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: SF(10),
  },
  mainsecboxViewJohn: {
    height: SH(48),
    width: SW(360),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SW(8),
    marginTop: SH(2),
    color: 'black',
    borderBottomWidth: 0.5,
    borderColor:'black'
  },
  profiledetailboxview: {
    height: SH(40),
    width: SW(340),
    backgroundColor: 'transparent',
    flexDirection: 'row',

    margin: SH(8),
  },
  boxone: {
    height: SH(50),
    width: SW(150),
    paddingTop: SH(10),
    fontSize: SF(17),
    color: Colors.black_text_color,
    fontWeight: '500',
    // backgroundColor: 'red',
  },
  boxtwo: {
    height: SH(50),
    width: SW(150),
    // backgroundColor: 'purple',
    paddingLeft: SW(80),
    paddingTop: SH(10),
  },
  boxthree: {
    height: SH(50),
    width: SW(40),
    // backgroundColor: 'yellow',
    marginLeft: 'auto',
    paddingTop: SH(8),
    color:'black'
    // padding: SW(5),
  },
  savebtn: {
    height: SH(50),
    width: SW(320),
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SH(10),
    marginTop: SH(100),
    fontWeight: '700',
  },
  savebtntext: {
    color: Colors.ghost_white_color,
    fontSize: SF(17),
    textAlign: 'center',
  },
  Jognboxone: {
    height: SH(50),
    width: SW(150),
    paddingTop: SH(10),
    fontSize: SF(17),
    color: 'black',
    // backgroundColor: 'red',
  },
  Jognboxthree: {
    height: SH(50),
    width: SW(40),
    marginLeft: 'auto',
    paddingTop: SH(15),
    color:'black'

  },
  johnboxtwo: {
    height: SH(30),
    width: SW(180),
    color: Colors.black_text_color,
    paddingLeft: SW(10),
    paddingTop: SH(4),
    fontSize: SF(18),
    fontWeight: '500',
  },
  accountview: {
    height: SH(50),
    width: SW(360),
    backgroundColor: Colors.darkBlue,
    marginLeft: SH(10),
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginTop: SH(2),
   
  },
  accountstyle: {
    fontSize: SF(17),
    color: Colors.ghost_white_color,
    fontWeight: '700',
    padding: SF(14),
  },
  MoreOptionview: {
    height: SH(48),
    width: SW(350),
    backgroundColor: 'purple',
    marginLeft: SH(10),
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    marginTop: SH(2),
  },
});
export default ProfileTabStyles;
