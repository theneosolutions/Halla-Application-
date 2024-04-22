import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  firstHalfView: {
    flex: 0.4,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItem: 'center',
  },
  forgotstyle: {
    color: '#293170',
    fontWeight: '800',
    justifyContent: 'center',
    alignItem: 'center',
    textAlign: 'center',
    fontSize: SF(20),
    margin: 20,
  },

  imgstyleS: {
    height: SH(180),
    width: SW(90),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SH(2),
    //marginBottom: SH(10),
  },
  secondHalfView: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center',
    alignItem: 'center',
  },

  touchablestyleW: {
    width: '78%',
    alignSelf: 'center',
    marginVertical: 5,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderColor: '#293170',
    borderWidth: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: SF(20),
    borderBottomRightRadius: SF(20),
    marginTop: 20,
  },
  Iconstyle: {
    //marginTop: SH(2),
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  btntextB: {
    color: 'black',
    fontSize: SF(16),
    fontWeight: '700',
    // alignItems: 'center',
    paddingLeft: SW(12),
    paddingVertical: 1,
  },
  btntextS: {
    color: '#BD9956',
    fontSize: SF(12),
    fontWeight: '200',
    fontWeight: '400',
    paddingLeft: SW(12),
    paddingVertical: 1,
  },
});
export default styles;
