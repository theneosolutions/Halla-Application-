import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';

const styles = StyleSheet.create({
   Container:{
    flex: 1,
      width: '100%',
      marginBottom:5,
      backgroundColor: 'white',
   },
   images:{
    height:210,width:365,
    borderTopLeftRadius:30,
    borderBottomRightRadius:30,
    // position:'absolute',
    marginTop:5,

   },
   title:{
    marginRight:'auto',
    // paddingVertical:20,
        fontSize:15,
        fontWeight:'500',
        paddingLeft:5,
        // marginTop:4,
        color:'black',
        // marginBottom:50


   },
   datastyle:{
    marginLeft:'auto',
// paddingVertical:20,
    fontSize:12,
    fontWeight:'700',
    paddingRight:5,
    // marginTop:4,
    color:'black',
    // marginBottom:50
   },
     slide: {
   
marginLeft:1,
   shadowOpacity:20,
   elevation:10,
    justifyContent: 'center',
    borderBottomRightRadius: 20,
  },
   maincontainer: {
    height: SH(60),
    width: '90%',
    backgroundColor: Colors.light_gray_text_color,
    margintop: SH(0),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: SW(20),
    flexDirection: 'row',
    // borderRadius: SF(10),
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    borderColor: Colors.gray_text_color,
    // borderWidth: 0.5,
  },
  availablestyle: {
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: SH(1),
    paddingLeft: SF(30),
  },
  invitationstyle: {
    color: 'black',
    fontWeight: '400',
    //textAlign: 'center',
    paddingLeft: 30,
  },
  topbtnview: {
    height: SH(38),
    width: '24%',
    backgroundColor: Colors.darkBlue,
    marginLeft: 'auto',
    marginVertical: SH(30),
    marginHorizontal: SW(10),
    //borderRadius: 10,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    borderColor: Colors.theme_background_han_Purple,
    borderWidth: 0.5,
  },
  topstyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: SH(6),
  },
});
export default styles;
