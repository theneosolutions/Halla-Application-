import { StyleSheet } from 'react-native';
import { Fonts, SF, SH, SW, Colors } from '../../utils';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  HalfView: {
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
    // margin: '2%',
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    paddingVertical: '5%',
    marginBottom: SH(10),
    //marginTop: SH(250),
  },
  Iconstyle: {
    // marginLeft: 12,
    //  marginRight:30

  },

  Continuebtntext: {
    color: 'white',
    fontSize: SF(14),
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal:10
  },
  GoogleIconstyle: {
    height: SH(17),
    width: SW(16),
    // marginLeft: 30
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


});
export default styles;
