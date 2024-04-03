// CountryCodePickerModal.js

import React from 'react';
import {Modal, View, FlatList, TouchableOpacity, Text} from 'react-native';

const CountryCodePickerModal = ({visible, countries, onSelectCountry}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onSelectCountry(item)}>
      <Text>{`${item.title} (${item.code})`}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible}>
      <View>
        <FlatList
          data={countries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
};

export default CountryCodePickerModal;
