import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import IconF from 'react-native-vector-icons/AntDesign';
import Egypto from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { SH, SW, SF } from '../../utils';

const AddNewGuest = props => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Dummy data for the list of guests
  const guests = [
    { id: 1, name: 'John Doe', phoneNumber: '123-456-7890', count: 1 },
    { id: 2, name: 'Jane Doe', phoneNumber: '987-654-3210', count: 3 },
  ];

  const renderGuestItem = guest => (
    <View style={styles.guestItem} key={guest.id}>
      <TouchableOpacity style={styles.closeIconContainer}>
        <IconF name="close" size={SF(20)} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.guestDetails}>
        <Text style={styles.name}>{guest.name}</Text>
        <Text style={styles.phoneNumber}>{guest.phoneNumber}</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{guest.count}</Text>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconF size={SF(20)} name="left" style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Guests</Text>
        <TouchableOpacity onPress={toggleDropdown}>
          <Egypto
            size={SF(20)}
            name="dots-three-vertical"
            style={styles.headerIconRight}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Guests</Text>
          <Text style={styles.subHeading}>
            List of guests already added to the event:
          </Text>
        </View>
        {guests.map(renderGuestItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#F2F2F4',
    padding: SW(10),
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: SF(20),
    color: 'black',
  },
  headerIcon: {
    marginLeft: 10,
    marginRight: 20,
    color: '#000',
  },
  headerIconRight: {
    marginRight: 10,
    color: '#000',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
    padding: 20,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
  },
  subHeading: {
    fontSize: 15,
    color: 'gray',
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 25,

  },
  closeIconContainer: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  closeIcon: {
    color: '#000',
  },
  guestDetails: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',

  },
  phoneNumber: {
    fontSize: 14,
    color: 'gray',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#ccc',
    width:30,
    height:30,
    alignItems:'center',
    borderRadius: 50,
    // paddingHorizontal: 15,
    // paddingVertical: 6,
  },
  counterText: {
    fontSize: 18,
    color: '#000',
    marginTop:2
  },
  count: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#000',

  },
});

export default AddNewGuest;
