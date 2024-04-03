import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/AntDesign';
import Egypto from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {SH, SW, SF} from '../../utils';
import {getpakage} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
const TopUp = ({route}) => {
  const navigation = useNavigation();

  const {t} = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [numberOfGuest, setNumberOfGuest] = useState([]);
  const [price, setPrice] = useState([]);
  const [list, setList] = useState([]);
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
    navigation.navigate('AddGuest', {event});
  };
  //   console.log('iddddddd', event);

  const toggleContactSelection = (numberOfGuest, price) => {
    const selectedIcon = {numberOfGuest, price};
    const isSelected = selectedContacts.some(
      contact =>
        contact.numberOfGuest === numberOfGuest && contact.price === price,
    );

    if (isSelected) {
      setSelectedContacts(prevContacts =>
        prevContacts.filter(contact => contact.numberOfGuest !== numberOfGuest),
      );
    } else {
      setSelectedContacts(prevContacts => [...prevContacts, selectedIcon]);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEventId(null);
    setSelectedContactId(null);
  };

  const openModal = (eventId, contactId) => {
    setSelectedEventId(eventId);
    setSelectedContactId(contactId);
    setShowModal(true);
  };
  const renderGuestItem = ({item, index}) => {
    const isSelected = selectedContacts.some(
      contact => contact.numberOfGuest === item.numberOfGuest,
    );

    return (
      <View style={[styles.guestItem]}>
        <TouchableOpacity
          onPress={() => toggleContactSelection(item.numberOfGuest, item.price)}
          style={styles.checkbox}>
          {isSelected ? (
            <IconF name="checksquare" size={30} color="#293170" />
          ) : (
            <Icon name="square-o" size={30} color="#293170" />
          )}
        </TouchableOpacity>

        <View style={styles.guestDetails}>
          <Text style={styles.price}>Price: {price}</Text>
          <Text style={styles.numberOfGuest}>{numberOfGuest} Guests</Text>
        </View>
      </View>
    );
  };

  const handleGetPakage = async () => {
    setLoading(true);
    try {
      const response = await getpakage();
      console.log('response---------------+++Topupppp', response?.data?.data);
      setList(response?.data?.data || []);

      console.log('list---------', list);
      const packages = response?.data?.data;
      console.log('packages', packages);
      if (packages && packages.length > 0) {
        const firstPackage = packages[0];
        const {numberOfGuest, price} = firstPackage;
        setNumberOfGuest(numberOfGuest);
        setPrice(price);
      }
      setLoading(false);
      console.log('response---------------+++Topupppp', numberOfGuest);
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  };

  useEffect(() => {
    handleGetPakage();
  }, []);

  const handleContinue = async () => {
    setLoading(true);
    const response = await getpakage();
    if (selectedContacts.length > 0) {
      navigation.navigate('PaymentDetails', {
        selectedContacts,
        pakageid: response?.data?.data[0].id,
      });
    } else {
      Alert.alert('Please select at least one item');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconF size={SF(20)} name="left" style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>TOP UP</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.heading}>Payment Plan</Text>
        <Text style={styles.subHeading}>Choose your payment plan:</Text>
      </View>
      <ScrollView>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#293170" />
          </View>
        ) : (
          <FlatList data={list} renderItem={renderGuestItem} />
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        // onPress={handleAddGuest}
        // disabled={guestloading || selectedContacts.length === 0} // Disable the button when loading
      >
        {/* {guestloading ? (
          <ActivityIndicator color="#fff" />
        ) : ( */}
        <Text style={styles.continueButtonText}>Continue</Text>
        {/* )} */}
      </TouchableOpacity>
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>
              Are You Sure Want To DELETE Guest From Event
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  DeleteContactFromList(selectedEventId, selectedContactId);
                  closeModal();
                }}>
                <Text style={styles.buttonText}>Delete Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffff',
    padding: SW(10),
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
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
    backgroundColor: '#F4F5FE',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 12,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  name: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',
  },
  phoneNumber: {
    fontSize: 14,
    color: 'black',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#ccc',
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 50,
    // paddingHorizontal: 15,
    // paddingVertical: 6,
  },
  counterText: {
    fontSize: 18,
    color: '#000',
    marginTop: 2,
  },
  count: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalHeading: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  phoneInput: {
    flex: 1,
    marginRight: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    // height: '5%',

    backgroundColor: '#293170',
    justifyContent: 'center',
    alignItems: 'center',

    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  continueButton: {
    height: '7%',
    width: '70%',
    backgroundColor: '#293170',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 55,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TopUp;
