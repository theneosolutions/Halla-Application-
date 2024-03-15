import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
const styles = StyleSheet.create({

Container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
},
SwitchStyle:{
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 'auto',
  borderRadius: 10,
  height: '4%',
  paddingHorizontal: 2,
  backgroundColor: '#f2f2f4',
  shadowOpacity: 20,
  capacity: 20,
  margin: '2%',
  marginTop: '8%',
},

SwitchImage:{
  width: 28,
  height: 26,
  marginRight: 5,
  borderRadius: 12,
},
logoContainer: {
  flex: 0.7,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},
imgstyle: {
  height: SH(200),
  width: SW(100),
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: SH(40),
  //marginBottom: SH(10),
},
buttonContainer: {
  flex: 0.3,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},

touchablestyle: {
  
  alignSelf: 'center',
  width: SW(300),
 paddingVertical:SH(20),
  backgroundColor: Colors.darkBlue,
  borderTopLeftRadius: SF(20),
  borderBottomRightRadius: SF(20),
  justifyContent: 'center', // Center text horizontally
  alignItems: 'center', 

},
btntext: {
  color: 'white',
  fontSize: SF(16),
  fontWeight: '700',
  
},


});
export default styles;
