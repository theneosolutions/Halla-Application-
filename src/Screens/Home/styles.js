import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  firstView: {
    height: '28%',

    backgroundColor: '#f8f9fc',
    spanish_pink_color: '#F5B9BD',
    marginLeft: 20,
    width: SW(340),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    alignContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowOpacity: 5,
  },
  appintroView: {
    height: 210,
    // backgroundColor: 'transparent',
    width: SW(350),
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  Container: {
    flex: 1,
    width: '100%',
    marginBottom: 5,
    backgroundColor: 'white',
  },
  draftbtn: {
    height: 100,
    width: 120,
    margin: 5,
    marginBottom: 10,
    // marginLeft: 'auto',
    // marginRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#293170',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  drafttext: {
    marginTop: 5,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: SF(15),
    elevation: 20,
    shadowOpacity: 20,
  },
  loaderstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    height: 160,
    width: SW(320),
    justifyContent: 'center',
    alignSelf: 'center',

    // position:'absolute',
    marginTop: 5,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    marginRight: 'auto',
    // paddingVertical:20,
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 5,
    // marginTop:4,
    color: 'black',
    // marginBottom:50
  },
  datastyle: {
    marginLeft: 'auto',
    // paddingVertical:20,
    fontSize: 12,
    fontWeight: '700',
    paddingRight: 5,
    // marginTop:4,
    color: 'black',
    // marginBottom:50
  },
  slide: {
    marginLeft: 1,
    // height: '100%',
    // marginBottom: 20,
  },
  textrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 2,
  },
  textStyle: {
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  textStyleLight: {
    color: 'black',
    fontSize: 10,
    fontWeight: '400',
    paddingHorizontal: 5,
    marginLeft: 1,
  },
  maincontainer: {
    height: SH(70),
    width: '90%',
    backgroundColor: '#BD9956',
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
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: SH(1),
    paddingLeft: SF(30),
  },
  invitationstyle: {
    color: 'white',
    fontWeight: '600',
    //textAlign: 'center',
    paddingLeft: 30,
  },
  topbtnview: {
    height: SH(38),
    width: '24%',
    backgroundColor: 'white',
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
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    padding: SH(6),
  },
  ScrollViewTestHeight: {
    flex: 1,
    marginTop: 10,
  },
  cardView: {flexDirection: 'row', justifyContent: 'center', margin: SF(5)},
});
export default styles;
