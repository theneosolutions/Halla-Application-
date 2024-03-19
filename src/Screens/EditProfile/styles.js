import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
const styles = StyleSheet.create({
    BackgroundWhite: {
        backgroundColor: 'white',
        // backgroundColor: Colors.theme_background_han_Purple,
      },
      whilistminbody: {
        width: '100%',
        // marginTop: '1%',
        height: '100%',
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
      
      textstyle: {
        color: 'white',
        fontSize: SF(16),
        textAlign: 'center',
        justifyContent: 'center',
        // margin: SW(2),
        fontWeight: '500',
        padding: SH(10),
      },
      ActiveButton: {
        height: SH(40),
        width: SW(90),
        backgroundColor: Colors.darkBlue,
        borderRadius: SH(20),
        // margin: SH(10),
        marginLeft: SW(8),
      },
      btnview: {
        flexDirection: 'row',
      
        justifyContent: 'center',
        margin: SH(20),
    
      },
      ProfileDetailesMinview: {
        width: '90%',
        marginHorizontal: '5%',
      },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#F2F2F4',
        padding: SW(10),
        alignItems: 'center',
      },
      headerText: {
        flex: 1,
        marginRight: 'auto',
        fontWeight: '700',
        fontSize: SF(20),
        color: 'black',
      },
      headerIcon: {
        height: SH(50),
        marginLeft: 10,
        marginRight: 20,
        marginTop: 30,
        color: '#000',
       
      },

      UserName: {
        color: Colors.black_text_color,
        fontFamily: Fonts.Poppins_Medium,
        textAlign: 'center',
        fontSize: SF(12),
        fontWeight: '800',
        marginTop:5
      },
      EditProFile: {
        marginTop: '1%',
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.black_text_color,
        fontSize: SF(15),
        paddingBottom: SH(13),
        textAlign: 'center',
      },
      boxView: {
        height: SH(60),
        width: SW(340),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SH(30),
        // backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopWidth: 0.3,
        borderTopColor: Colors.gray_text_color,
         borderColor:'black' // Choose your desired color
    
        // marginTop: SH(5), // Adjust as needed
      },
      folowerLineView: {
        borderRightWidth: 0.3,
        color: 'gray',
        height: '70%',
        borderRightColor: 'black',
        shadowOpacity:12,
        paddingLeft:35
        
      },
      linetext: {
        fontSize: SF(17),
        color: Colors.black_text_color,
        marginRight: SH(15),
        fontWeight: '700',
      },
      seclinetext: {
        fontSize: SF(14),
        color: Colors.black_text_color,
        fontWeight: '400',
        paddingRight: SW(18),
      },
      onesidebox: {
        borderRightWidth: 0.2,
        color: 'gray',
        height: '70%',
        borderRightColor: 'black',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10
      },
      iconStyle: {
        height: SH(50),
        width: SW(40),
        // backgroundColor: 'yellow',
        marginLeft: 'auto',
        paddingTop: SH(8),
        color:'black'
        // padding: SW(5),
      },
      mainboxView: {
        height: SH(40),
        width: SW(340),
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderColor:'black',
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
      ActiveButton: {
        height: SH(40),
        width: SW(90),
        backgroundColor: Colors.darkBlue,
        borderRadius: SH(20),
        // margin: SH(10),
        marginLeft: SW(8),
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
      LeftImageStyles: {
        width: SW(40),
        height: SH(50),
        borderRadius: SH(300),
        backgroundColor: 'gray',
        marginLeft: SW(5),
       
      },
      johnboxtwo: {
        height: SH(30),
        width: SW(180),
        color: Colors.black_text_color,
        //backgroundColor: 'purple',
        paddingLeft: SW(10),
        paddingTop: SH(4),
        fontSize: SF(18),
        fontWeight: '500',
      },
      basicMemberStyle: {
        fontSize: 10,
        color: 'black',
        paddingLeft: SW(10),
      },
      Jognboxthree: {
        height: SH(50),
        width: SW(40),
        marginLeft: 'auto',
        paddingTop: SH(15),
        color:'black'
      
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
      LeftIconStyles: {
        width: SW(30),
        height: SH(70),
        paddingTop: SH(26),
        color:"black",
        marginLeft: SW(10),
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
      Jognboxthree: {
        height: SH(50),
        width: SW(40),
        marginLeft: 'auto',
        paddingTop: SH(15),
        color:'black'
    
      },
      profiledetailboxview: {
        height: SH(40),
        width: SW(340),
        backgroundColor: 'transparent',
        flexDirection: 'row',
    
        margin: SH(8),
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
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 400,
    },
    modalHeading: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
        // height: '5%',

        backgroundColor: '#293170',
        justifyContent: 'center',
        alignItems: 'center',

        borderTopLeftRadius: 14,
        borderBottomRightRadius: 14,
        marginLeft:10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
export default styles;
