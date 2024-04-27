import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imgstyle: {
    height: SH(205),
    width: SW(190),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SH(40),
  },
  touchablestyle: {
    alignSelf: 'center',
    width: SW(300),
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
  },
  btntext: {
    color: 'white',
    fontSize: SF(16),
    fontWeight: '700',
    paddingVertical: 12,
    alignSelf: 'center',
  },
  alldonestyle: {
    marginTop: SH(40),
    color: '#293170',
    fontWeight: '800',
    alignItem: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: SF(20),
    marginTop: SH(40),
  },
});
export default styles;
