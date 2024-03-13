import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors, widthPercent} from '../../utils';
const Scanstyle = StyleSheet.create({
  ScrollViewTestHeight: {
    flex: 1,
    width: '100%',
    height: 'auto',
    //backgroundColor: Colors.pale_lavender,
    backgroundColor: Colors.light_gray_text_color,
  },
  container: {
    flexDirection: 'row',
    width: '91%',
    backgroundColor: Colors.ghost_white_color,
    marginHorizontal: '5%',
  },
  textheading: {
    fontSize: SF(17),
    color: 'black',
    fontWeight: '600',
    paddingLeft: 12,
    marginTop: SH(20),
  },
  InputStyles: {
    width: '97%',
    color: 'black',
    fontSize: SF(17),
    paddingTop: SH(10),
    fontFamily: Fonts.Poppins_Medium,
    backgroundColor: Colors.ghost_white_color,
    justifyContent: 'center',
    marginLeft: SH(18),
    // borderTopLeftRadius: SF(20),
    // borderBottomRightRadius: SF(20),
    borderWidth: 0.3,
    // shadowOffset: {
    //   width: 0,
    //   height: Platform.OS === 'ios' ? 0 : 0,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: Platform.OS === 'ios' ? 0 : 0,
    // elevation: Platform.OS === 'ios' ? 0 : 0,
  },
  InputSpaceView: {
    width: '98%',

    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: SH(12),
    marginTop: SH(2),
  },
  button: {
    width: '96%',
    height: SH(50),
    paddingHorizontal: SH(20),
    marginTop: SH(10),
    color: Colors.gray_text_color,
    fontSize: SF(17),
    paddingTop: SH(12),
    fontFamily: Fonts.Poppins_Medium,
    // backgroundColor: Colors.ghost_white_color,
    justifyContent: 'center',
    // marginLeft: SH(5),
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 0 : 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 0 : 0,
    elevation: Platform.OS === 'ios' ? 0 : 0,
  },
  buttonText: {
    color: 'black',
    fontSize: SF(16),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#6c25f7',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  /////////////////
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  btnstyle: {
    height: SH(20),
    width: SW(300),
    owerflow: 'hidden',
    backgroundColor: 'green',
  },
});
export default Scanstyle;
