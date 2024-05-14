import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {SH, SF, SW, Colors} from '../../utils';

export const CountryPickerInput = ({
  onSelect,
  countryNameCode,
  callingCode,
  value,
  onChangeText,
}) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  return (
    <View style={styles.countryPickerInputContainer}>
      <TouchableOpacity
        style={[styles.countryCodeContainer]}
        onPress={() => setShowCountryPicker(true)}>
        <CountryPicker
          onSelect={onSelect}
          cca2={countryNameCode}
          translation="eng"
          visible={showCountryPicker}
          countryCode={countryNameCode}
          withCallingCode={true}
          withFilter={true}
          withFlag={true}
          onClose={() => setShowCountryPicker(false)}
        />
        <Text style={styles.countryCodeText}>{callingCode}</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Phone Number"
        style={styles.phoneInputText}
        placeholderTextColor="grey"
        keyboardType="number-pad"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
        maxLength={12}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  countryPickerInputContainer: {
    width: SW(310),
    alignSelf: 'center',
    height: SH(50),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.8,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: '#293170',
    paddingHorizontal: SW(3),
    marginTop: SH(1.5),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SH(30),
    width: SW(50),
  },
  countryCodeText: {
    color: 'black',
    fontWeight: '500',
    paddingHorizontal: 1,
  },
  phoneInputText: {
    marginHorizontal: 30,
    color: 'black',
    width: '70%',
    alignSelf: 'center',
    borderColor: '#293170',
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
