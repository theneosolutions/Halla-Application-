import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';

const styles = StyleSheet.create({
  MinViewScreen: {
 
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  ScrollViewStyles: {
    width: '100%',
    height: 'auto',
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
  EmailPhoneView:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 1,
  width: '80%',
  overflow: 'hidden',
  // height: 57,
  borderColor: 'black',
  borderBottomRightRadius: 22,
  borderTopLeftRadius: 22,
  },
  inputView:{
  flexDirection: 'row',
   width: '98%',
    padding: SH(8)
  },
createaccount:{
  fontSize:13,
  fontWeight:'600',
  color:'black',
  paddingLeft:2
},
googleicon:{
  height:16,
  width:16,
  marginTop:10,
  marginLeft:10,
  marginRight:3
},
  container: {
    padding: 20,
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signInView:{
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    height: SH(55),
    alignItems: 'center',
  },
  iconStylemail: {
    paddingTop: 12,
    marginLeft: 10,
    color: '#293170',
  },
 
  touchablestyleW: {
    width: '78%',
    alignSelf: 'center',
    marginVertical: 5,

    paddingHorizontal: 3,
    paddingVertical: 1,
    //width: SW(280),
    //justifyContent: 'center',
    //alignContent: 'center',
    borderColor: '#293170',
    borderWidth: 0.6,
    backgroundColor: 'white',
    //borderBottomLeftRadius: SF(4),
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
  },

  iconStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // padding: SH(30),
  },
  googletext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingTop: SF(10),
    fontWeight: '600',
    color: 'black',
  },
  Signuptext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingTop: SF(10),
    color: 'black',
  },
  NotRegisterText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SF(14),
    paddingLeft: SF(6),
    fontWeight: '400',
    color: 'black',
  },
  NotRegisterView: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'black',
  },
  ForgetPasswordStyles: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.darkBlue,
    fontSize: SF(15),
    fontWeight: '600',
     paddingLeft: SH(25),
  },
  btntext: {
    color: 'white',
    fontSize: SF(16),
    fontWeight: '700',
  },
  touchablestyle: {
    //height: SH(50),
    //width: '100%',
    alignSelf: 'center',
    width: SW(300),
    //justifyContent: 'center',
    //alignContent: 'center',
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    //marginTop: SH(250),
  },
  input: {
    width: '80%',
    paddingHorizontal: 2,
    paddingVertical: 1,
    margin: SH(3),
    color: 'black',
  },

});
export default styles;
