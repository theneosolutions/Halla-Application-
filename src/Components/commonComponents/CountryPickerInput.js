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
          cca2={countryNameCode} // Set default country code
          translation="eng"
          countryCode={countryNameCode}
          withCallingCode={true}
          withFlag={true}
          withFilter={true}
          onClose={() => {}}
          visible={false} // Set to false to avoid showing the country picker modal
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
    height: SH(60),
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
    width: SW(30),
  },
  countryCodeText: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
    // backgroundColor: 'red',
    paddingHorizontal: 1, // Add padding for space between calling code and text
  },
  phoneInputText: {
    marginHorizontal: 30,
    color: 'black',
    fontSize: SF(12),
    width: '60%', // Adjust the width as needed
    alignSelf: 'center', // Align the input horizontally
    marginVertical: 5, // Add vertical margin
    paddingHorizontal: 2, // Add horizontal padding
    paddingVertical: 8, // Add vertical padding
    borderColor: '#293170',
    // borderWidth: 0.6,
    backgroundColor: 'white',
    borderTopRightRadius: 15, // Adjust the border radius to match the container
    borderBottomRightRadius: 15,
    // elevation: 5, // Adjust the border radius to match the container
  },
});
