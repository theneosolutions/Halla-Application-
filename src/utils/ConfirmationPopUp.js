import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ConfirmationPopup = ({
  title,
  message,
  confirmBtn,
  cancelBtn,
  callback,
  setCurrentComponent,
  onConfirm,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(238, 238, 237, 0.70)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <View style={{...styles.ModalContainer}}>
            <View style={{alignItems: 'center', paddingBottom: 15}}>
              <Text
                style={{
                  ...styles.textField,
                  color: 'black',
                  fontSize: 18,
                  paddingBottom: 10,
                }}>
                {title}
              </Text>
              <Text
                style={{
                  ...styles.homeTabText,
                  color: 'black',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                {message}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                {cancelBtn != '' && (
                  <TouchableOpacity
                    style={{
                      ...styles.footerBtn,
                      height: 47,
                      borderWidth: 1,
                      borderColor: 'blue',
                      backgroundColor: 'white',
                      width: '86%',
                    }}
                    onPress={() => setCurrentComponent('')}>
                    <Text
                      style={{
                        ...styles.homeTabText,
                        color: 'blue',
                        fontSize: 14,
                      }}>
                      {cancelBtn}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{width: '50%'}}>
                {confirmBtn != '' && (
                  <TouchableOpacity
                    style={{
                      ...styles.footerBtn,
                      height: 47,
                      backgroundColor: '#293170',
                      width: '86%',
                    }}
                    onPress={() => {
                      callback('rightBtn'), setCurrentComponent('');
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: '500',
                      }}>
                      {confirmBtn}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 0,
    height: '100%',
  },
  topView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  ModalContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 1,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.25,
  },
  footerBtn: {
    height: 52,
    width: '70%',
    // borderRadius: 20,
    backgroundColor: 'pink',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    marginVertical: 40,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    justifyContent: 'center',
  },
  footerBtnTxt: {
    color: 'White',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  declineBtn: {
    justifyContent: 'center',
    height: 52,
    width: '70%',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderWidth: 1,
    borderColor: 'blue',
  },
  declineBtnText: {
    color: 'blue',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ConfirmationPopup;
