import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
const LoginScreenStyle = StyleSheet.create({













/////////////SignUp//////////

////////////End SignUp//////






  MinViewScreen: {
    //flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',

    backgroundColor: 'white',
  },
  AccountView: {
    marginTop: SH(30),
    justifyContent: 'center',
    alignItem: 'center',
  },

  Loginheader: {
    fontSize: SF(25),
    color: 'black',
    fontWeight: '800',
    textAlign: 'center',
    //paddingLeft: SH(10),
    // color: Colors.theme_background_han_Purple,
    // textAlign: 'center',
    fontFamily: Fonts.Poppins_Medium,
  },
  LoginText: {
    fontSize: SF(13),
    paddingVertical: 10,
    //justifyContent: 'flex-start',
    color: 'black',
    paddingLeft: SH(10),
    fontWeight: '500',
    textAlign: 'center',
    // color: Colors.theme_background_han_Purple,
    // textAlign: 'center',
    fontFamily: Fonts.Poppins_Medium,
  },

  appleloginview: {
    flexDirection: 'row',
    height: SH(54),
    width: SW(302),
    //   backgroundColor: 'green',
    justifyContent: 'center',
    alignItem: 'center',
    marginLeft: SW(4),
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    overflow: 'hidden',
  },
  appleidtext: {
    height: SH(54),
    width: SW(150),
    // backgroundColor: '#6c25f7',
    overflow: 'hidden',
    justifyContent: 'center',
    // alignItem: 'center',
    textAlign: 'center',
    padding: SH(15),
    color: 'black',
    fontWeight: '700',
    borderTopLeftRadius: SF(10),
    borderBottomLeftRadius: SF(50),
  },
  phoneNutext: {
    height: SH(54),
    width: SW(150),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    // alignItem: 'center',
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    padding: SH(15),
  },
  LoginView: {
    height: SH(50),
    width: SW(320),
    justifyContent: 'center',

    alignContent: 'center',
    backgroundColor: '#6c25f7',
    borderRadius: SF(20),
    marginTop: SH(7),
    marginLeft: SW(30),
  },
  Signuptext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingTop: SF(10),
    color: 'black',
  },
  blackapple: {
    marginTop: SH(12),
    paddingHorizontal: '3%',
    color: 'black',
  },
  appletext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingTop: SF(10),
    fontWeight: '600',
    color: 'black',
    paddingTop: '4%',
  },
  NotRegisterView: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'black',
    // marginTop: SH(0),
  },
  NotRegisterText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingLeft: SF(6),
    fontWeight: '400',
    color: 'black',
  },

  googleimg: {
    height: SH(17),
    width: SW(16),
    paddingTop: SW(10),
    // paddingHorizontal: '0%',
    marginTop: SH(12),

    marginHorizontal: '8%',
  },
  googletext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingTop: SF(10),
    fontWeight: '600',
    color: 'black',
  },
  Container: {
    width: '98%',
    height: 'auto',
    //alignItems: 'center',
    // justifyContent: 'flex-start',
    // margin: SH(3),
  },
  countryCodePickerView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    fontSize: SF(12),
  },

  inputlabel: {
    fontSize: SF(15),

    color: 'black',
    // paddingLeft: SH(0),
  },
  inputlabelpass: {
    fontSize: SF(15),
    marginHorizontal: SH(10),
    color: 'black',
  },

  ImageSet: {
    width: SW(360),
    height: SH(130),
  },
  TextStyle: {
    color: '#263238',
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
  },
  registerTextStyle: {
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Bold,
    color: 'black',
    textDecorationLine: 'underline',

    // color: Colors.theme_background_han_Purple,
    fontWeight: '500',
  },
  ViewTextStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  InputSpaceView: {
    width: '98%',
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: SH(14),
    marginTop: SH(10),
  },
  simplestatetext: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    width: SW(60),
    borderBottomColor: Colors.theme_background_han_Purple,
  },
  simplestatetexttwoset: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    paddingRight: SH(20),
    width: '100%',
    borderBottomColor: Colors.theme_background_han_Purple,
  },
  minviewtext: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  SetHeightmodal: {
    height: '100%',
    overflow: 'hidden',
  },
  addplacestextset: {
    paddingRight: SH(20),
    fontSize: SF(14),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.theme_background_han_Purple,
    borderBottomColor: Colors.theme_background_han_Purple,
  },
  setserachbgcolorview: {
    position: 'relative',
    zIndex: 4,
    paddingTop: SH(10),
    paddingHorizontal: SH(10),
    paddingBottom: SH(10),
    backgroundColor: Colors.theme_background_han_Purple,
  },
  LoginButton: {
    paddingVertical: SH(0),
  },
  TopSpaceRegister: {
    paddingTop: SH(50),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: SH(20),
  },
  RegisterText: {
    fontFamily: Fonts.Poppins_Bold,
    fontWeight: '700',
    fontSize: SF(25),
    color: Colors.theme_background_han_Purple,
  },
  TopSpaceRegisterTwo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  FirstNameTextStyle: {
    color: Colors.black_text_color,
    fontSize: SF(15),
    opacity: 0.7,
    fontFamily: Fonts.Poppins_Medium,
  },
  MinVieCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(12),
    width: '100%',
    height: SH(47),
    color: Colors.gray_text_color,
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
    borderRadius: 7,
    backgroundColor: Colors.white_text_color,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  // DropDownIconFlex: {
  //   flexDirection: 'row',
  //   // alignItems: 'center',
  //   borderRightWidth: 1,
  //   paddingRight: SH(20),
  //   borderRightColor: Colors.light_gray_text_color,
  // },
  dropdowniconright: {
    position: 'relative',
    left: 9,
  },
  Inputstyle: {
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 0,
    elevation: Platform.OS === 'ios' ? 1 : 0,
  },
  FlexRowChekBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  SimpleTextStyle: {
    fontSize: SF(11),
    paddingLeft: SH(15),
    paddingTop: SH(2),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
  },
  bluecolor: {
    color: Colors.blue_color,
  },
  ButtonView: {
    width: '100%',
  },
  TopSpace: {
    width: '100%',
  },
  AlredyAndLoginBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  MemberTextStyle: {
    fontSize: SF(15),
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
    color: Colors.black_text_color,
  },
  LoginScreenText: {
    paddingLeft: SH(10),
    fontFamily: Fonts.Poppins_Bold,
    fontSize: SF(16),
    color: Colors.theme_background_han_Purple,
  },
  AccountButton: {
    width: '100%',
  },

  KeyBordTopViewStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MinFlexView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  MinViewSecond: {
    width: '90%',
    marginHorizontal: '5%',
  },
  LoginButton: {
    width: '100%',
  },
  MinViewBgColor: {
    backgroundColor: Colors.white_text_color,
    height: '100%',
  },
  ForgetPasswordStyles: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.darkBlue,
    fontSize: SF(15),
    fontWeight: '400',
    // justifyContent: 'flex-end',
    // marginBottom: 20,
     paddingLeft: SH(25),
  },
  TabMinView: {
    width: '100%',
    height: '100%',
    paddingTop: SH(20),
    paddingHorizontal: SH(20),
    backgroundColor: Colors.white_text_color,
  },
  InputUnderLine: {
    backgroundColor: Colors.light_gray_text_color,
    color: Colors.black_text_color,
    width: '100%',
    height: SH(58),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SH(10),
    fontFamily: Fonts.Poppins_Medium,
    paddingHorizontal: SH(15),
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 0 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 0 : 25,
    elevation: Platform.OS === 'ios' ? 0 : 0,
  },
  // Marginright: {
  //   paddingRight: SH(6),
  // },
  InputTextStyle: {
    fontSize: SF(16),
    fontFamily: Fonts.Poppins_Medium,
    width: '100%',
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 0 : 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 0 : 0,
    elevation: Platform.OS === 'ios' ? 0 : 0,
  },
  SeTextStyleForget: {
    fontSize: SF(15),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
  },
  CenterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ScrollViewStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    backgroundColor: Colors.white_text_color,
  },
  TitleStyles: {
    color: Colors.theme_background_han_Purple,
    fontSize: SF(25),
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
    paddingHorizontal: SH(15),
    position: 'absolute',
    top: SH(100),
    width: '100%',
  },
  Textstyle: {
    paddingHorizontal: SH(10),
    color: Colors.theme_background_han_Purple,
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
    fontSize: SF(16),
    position: 'absolute',
    bottom: SH(120),
    width: '100%',
  },
  NextTextStyle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(19),
    color: 'red',
    color: Colors.theme_background_han_Purple,
  },
  linestyle: {
    height: SH(3),
    wid: SW(30),
    backgroundColor: 'gray',
  },
  lineview: {
    flexDirection: 'row',
    width: '80%',
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  btntext: {
    color: 'white',
    fontSize: SF(17),
    fontWeight: '600',
    // alignItems: 'center',
    textAlign: 'center',
    // paddingLeft: SW(110),
  },
  googlebtnstyleing: {
    height: SH(100),
    width: SW(100),
  },
});
export default LoginScreenStyle;
