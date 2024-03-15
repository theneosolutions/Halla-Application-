import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      firstView:{
       height:300,
        //  backgroundColor: 'green',
        width: '100%',
        justifyContent: 'center',
        alignItem: 'center',
      },
      boldstyle:{
        color: '#293170',
            fontWeight: '800',
            textAlign: 'center',
            fontSize: SF(20),
            marginTop:15,
            // paddingVertical:20
      },
      lighttext:{
        color: 'gray',
        fontWeight: '400',
        justifyContent: 'center',
        alignItem: 'center',
        textAlign: 'center',
        fontSize: SF(15),
        margin: 20,
      },
      imgstyle:{
        height: SH(130),
            width: SW(60),
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: SH(2),
      },
      optView:{
        height: 180,
            // backgroundColor: 'lightgray',
          width: '82%',
          justifyContent: 'center',
          alignItem: 'center',
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
      },
      dontreviewopt:{
        flexDirection: 'row', textAlign: 'center',height:100
      },
      lighttextgray:{
        marginLeft: SF(90), marginTop: SH(14),
        color:'gray',
        fontWeight:"600"

      },
      underlinetext:{
        textDecorationLine: 'underline',
                color: 'blue',
                alignItem: 'center',
                textAlign: 'center',
                marginLeft: SF(5),
                marginTop: SH(14),
      },
      textinputstyle:{
        borderBottomWidth: 1.5,
        borderColor: '#293170',
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 5,
        width: 60,
        textAlign: 'center',
      },
      btnView:{
        height:SH(120)
      },
      codeExpireStyle:{
        alignItem: 'center',
        textAlign: 'center',
        color: 'black',
        fontWeight:'600'
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
      btntext: {
        color: 'white',
        fontSize: SF(16),
        fontWeight: '700',
        alignSelf:'center',
        paddingVertical:15
        },

});
export default styles;
