import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    //   backgroundColor: 'green',
    alignItems: 'center',
  },
  firstHalfView: {
    height: SH(350),

    width: '100%',
    justifyContent: 'center',
    alignItem: 'center',
    // backgroundColor: 'gray',
  },
  forgotstyle: {
    color: '#293170',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: SF(20),
    margin: 5,
  },
  imageview: {
    height: '35%',
    width: SW(90),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SH(10),
    //  backgroundColor:'red'
  },
  imgstyle: {
    height: SH(120),
    width: SW(60),
    justifyContent: 'center',
    alignSelf: 'center',

    //marginBottom: SH(10),
  },
  imgstyleS: {
    height: SH(190),
    width: SW(90),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SH(2),
    //marginBottom: SH(10),
  },
  textStyle: {
    width: 280,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    fontWeight: '400',
  },

  Iconstyle: {
    //marginTop: SH(2),
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  input: {
    width: '80%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: SH(3),
    color: 'black',
  },
  touchablestyleW: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 1,

    paddingHorizontal: 3,
    paddingVertical: 7,

    borderColor: '#293170',
    borderWidth: 0.6,
    backgroundColor: 'white',

    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
  },
  touchablestyle: {
    paddingVertical: 14,
    alignSelf: 'center',
    width: '85%',

    marginTop: 20,
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
  },
  btntext: {
    color: 'white',
    fontSize: SF(16),
    fontWeight: '700',
    alignSelf: 'center',
  },
  LabelEmail: {
    marginRight: 'auto',
    color: 'black',
    paddingLeft: 40,
    fontWeight: '500',
    fontSize: SF(12),
    margin: SW(2),
  },
  ContinuTouchView: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItem: 'center',
  },
});
export default styles;
