import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      firstHalfView:{
        height: 330,
        // backgroundColor: 'green',
        width: '100%',
        justifyContent: 'center',
        alignItem: 'center',
 
      },
      boldText:{
        color: '#293170',
              fontWeight: '800',
           
            
              textAlign: 'center',
              fontSize: SF(20),
         
      },
      ButtonView:{
        height:80,
        // backgroundColor: 'pink',
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
      },
      lightText:{
        color: 'gray',
        fontWeight: '400',
       width:'90%',
        textAlign: 'center',
        fontSize: SF(13),
        margin: 20,
      },


      imgstyle:{
        height: SH(130),
            width: SW(60),
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: SH(2),
      },
    //   container: {
    //     padding: 20,
    //   },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      error: {
        color: 'red',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
      },
      button: {
        backgroundColor: 'blue',
        padding: 10,
        borderTopLeftRadius: SF(15),
        borderBottomRightRadius: SF(15),
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 40,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
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
      touchableView:{
        height:140,
        // backgroundColor: 'red',
        width: '100%',
        justifyContent: 'center',
        alignItem: 'center',
      },
    //   imgstyle: {
    //     height: SH(200),
    //     width: SW(100),
    //     justifyContent: 'center',
    //     alignSelf: 'center',
    //     marginTop: SH(40),
    //     //marginBottom: SH(10),
    //   },
      buttonContainer: {
        flex: 0.3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        // alignItems: 'center',
        //paddingLeft: SW(110),
      },
      //////////splashscreenend/////
      
      //////////RegistrationStyle//////
      HalfView:{
        flex: 0.7,
      
                width: '100%',
                justifyContent: 'center',
                alignItem: 'center',
      },
      touchablestyleIcon: {
        // width: SW(300),
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '8%',
        margin: '2%',
        backgroundColor: Colors.darkBlue,
        borderTopLeftRadius: SF(20),
        borderBottomRightRadius: SF(20),
        //marginTop: SH(250),
      },
        Iconstyle: {
          //marginTop: SH(2),
          paddingHorizontal: 5,
          paddingVertical: 12,
        },
      
        Continuebtntext:{
          color: 'white',
          fontSize: SF(14),
          fontWeight: '700',
          marginTop:10,
          paddingLeft:12
        },
        googleimg: {
          height: SH(17),
          width: SW(16),
          paddingTop: 5,
          // paddingHorizontal: '0%',
          marginTop: SH(10),
      
          // marginHorizontal: '2%',
        },
        GoogleIconstyle:{
          height: SH(17),
          width: SW(16),
          marginTop: SH(13),
          marginLeft:30
        },
      ////////////EndRegistrationStyle///
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
       
        dropdownStyle: {
          backgroundColor: '#293170',
          color: 'white',
        },
        dropdownItemStyle: {
          fontSize: 12,
          color: 'white',
          backgroundColor: 'white',
        },
        selectedOptionContainer: {
          backgroundColor: 'yellow',
        },
        invitationReportText: {
          color: 'black',
          paddingLeft: SF(20),
          marginTop: SF(20),
          fontWeight: '700',
          fontSize: SF(15),
        },
        dropdownDropdownStyle: {
          backgroundColor: '#293170',
        },
        // iconStyle: {
        //   paddingTop: 3,
        // },
        iconStyleeye: {
          paddingTop: 10,
          marginLeft: 8,
          color: '#293170',
        },
        iconStylemail: {
          paddingTop: 12,
          marginLeft: 10,
          color: '#293170',
        },
        withouticoninput: {
          width: '92%',
          paddingHorizontal: 9,
          paddingVertical: 7,
          margin: SH(3),
          borderColor: '#818181',
          color: 'black',
        },
        input: {
          width: '80%',
          paddingHorizontal: 2,
          paddingVertical: 1,
          margin: SH(3),
          color: 'black',
        },
        ScrollViewTestHeight: {
          width: '100%',
      
          height: '100%',
        },
      
        imgstyleS: {
          height: SH(180),
          width: SW(90),
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: SH(2),
          //marginBottom: SH(10),
        },
      
        touchablestyleR: {
          //height: SH(50),
          paddingHorizontal: SW(12),
          with: '90%',
          //width: '100%',
          alignSelf: 'center',
          margin: SF(5),
          //width: SW(280),
          //justifyContent: 'center',
          //alignContent: 'center',
          backgroundColor: Colors.darkBlue,
          borderTopLeftRadius: SF(20),
          borderBottomRightRadius: SF(20),
          flexDirection: 'row',
          //marginTop: SH(250),
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
       
        btntextB: {
          color: 'black',
          fontSize: SF(16),
          fontWeight: '600',
          // alignItems: 'center',
          paddingLeft: SW(12),
          paddingVertical: 1,
        },
        btntextS: {
          color: 'black',
          fontSize: SF(12),
          fontWeight: '200',
          // alignItems: 'center',
          paddingLeft: SW(12),
          paddingVertical: 1,
        },
        btntextW: {
          color: 'black',
          fontSize: SF(17),
          fontWeight: '600',
          // alignItems: 'center',
          paddingLeft: SW(110),
        },
        boxtext: {
          color: 'black',
          fontSize: SF(15),
          fontWeight: '600',
          textAlign: 'center',
          // paddingLeft: SW(110),
        },
        Inheadingtext: {
          fontSize: SF(17),
          color: Colors.black_text_color,
          fontWeight: '800',
          margin: '3%',
          flexDirection: 'start',
        },
        IntextView: {
          flexDirection: 'row',
          height: SH(70),
          width: SW(350),
          // backgroundColor: 'red',
          padding: SH(10),
          // justifyContent: 'space-evenly',
        },
        Inbtnstyle: {
          height: SH(40),
          width: SW(100),
          backgroundColor: Colors.pale_lavender,
          borderRadius: 12,
        },
      
        textstylebold: {
          fontWeight: '800',
          width: SW(230),
      
          color: 'black',
          // backgroundColor: 'green',
        },
        textstyle: {
          fontWeight: '600',
          width: SW(230),
          // justifyContent: 'center',
          // textAlign: 'center',
          color: Colors.black_text_color,
          // backgroundColor: 'green',
        },
        btntext: {
          justifyContent: 'center',
          textAlign: 'center',
          color: Colors.light_gray_text_color,
          paddingVertical: '5%',
          fontWeight: '500',
        },
        RowView: {
          //height: SH(150),
          //width: SW(360),
          //backgroundColor: 'green',
          // justifyContent: 'space-evenly',
          flexDirection: 'row',
        },
        imagestyle: {
          height: SH(32),
          width: SW(30),
          //justifyContent: 'center',
          //alignContent: 'center',
          //padding: SH(5),
          marginHorizontal: 20,
          //borderTopLeftRadius: SF(50),
        },
        insideboxview: {
          flexDirection: 'column',
          height: SH(130),
          width: SW(80),
          // backgroundColor: 'red',
          justifyContent: 'space-between ',
          marginHorizontal: '1%',
        },
        imageView: {
          backgroundColor: 'red',
          marginTop: SH(3),
          // flexDirection: 'column',
          height: SH(60),
          width: SW(70),
          backgroundColor: '#EAEBF4',
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
          //borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        },
      
        iconStyle: {
          paddingHorizontal: 10,
          paddingVertical: 10,
          // padding: SH(30),
        },
        googlestyle: {
          height: SH(18),
          width: SW(16),
          paddingHorizontal: '4%',
          marginTop: SH(7),
          marginHorizontal: '2%',
        },
        backgroundimage: {
          image: {
            flex: 1,
            justifyContent: 'center',
          },
        },

});
export default styles;
