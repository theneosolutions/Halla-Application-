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
  ActivityIndicator,
} from 'react-native';
import IconF from 'react-native-vector-icons/AntDesign';
import Egypto from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {SH, SW, SF} from '../../utils';
import {guestListByID, removeContactByID} from '../../Services/ApiList';

const AddNewGuest = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [guest, setGuest] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {id} = props.route.params;

  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [loading, setLoading] = useState(true);
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
    navigation.navigate('AddGuest', {id});
  };

  const handleGetByGuestId = async () => {
    setLoading(true);
    try {
      // const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await guestListByID(id); // Pass user ID if requitransparent
      console.log('Events:.....======+++++', response?.data?.data);

      const guestsData = response?.data?.data;
      console.log('guestsData............', guestsData);
      setGuest(guestsData);
      console.log('..........', guest);
      // console.log('data========',response.data)
      setLoading(false);
    } catch (error) {
      // console.log('Error fetching events:', error);
    }
  };

  useEffect(() => {
    handleGetByGuestId(); // Fetch events when component mounts
  }, []);

  const DeleteContactFromList = async (eventId, contactId) => {
    try {
      // const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await removeContactByID(eventId, contactId); // Pass user ID if requitransparent
      console.log('Events:.....======+++++--------', response);
      if (response && response.status === 200) {
        // Filter out the removed contact from the guest list
        const updatedGuests = guest.filter(
          item => item.invites.id !== contactId,
        );
        setGuest(updatedGuests);
        console.log('Guests after removal:', updatedGuests);
      } else if (response && response.status === 404) {
        const confirmDeletion = window.confirm(
          'Are you sure you want to delete this contact?',
        );
        if (!confirmDeletion) {
          console.log('User canceled deletion.');
          return;
        }

        console.log('User confirmed deletion. Proceeding...');
      } else {
        console.error(
          'Failed to remove contact:',
          response?.data?.data?.message || 'Unknown error',
        );
      }
    } catch (error) {
      console.error('Error removing contact:', error);
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
  const renderGuestItem = ({item}) => (
    <View style={styles.guestItem}>
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={() => openModal(item.eventId, item.invites.id)}>
        {/* // onPress={() => DeleteContactFromList(item.eventId, item.invites.id)}> */}
        <IconF name="close" size={SF(20)} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.guestDetails}>
        <Text style={styles.name}>{item.invites.name}</Text>
        <Text style={styles.phoneNumber}>{item.invites.phoneNumber}</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>1</Text>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Invitationreport', {id})}>
          <IconF size={SF(20)} name="left" style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Guests</Text>
        <TouchableOpacity onPress={toggleDropdown}>
          <Egypto size={SF(20)} name="plus" style={styles.headerIconRight} />
        </TouchableOpacity>
      </View>
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}> */}
      <View style={styles.header}>
        <Text style={styles.heading}>Guests</Text>
        <Text style={styles.subHeading}>
          List of guests already added to the event:
        </Text>
      </View>

      <FlatList
        data={guest} // Pass the list of guests to FlatList
        renderItem={renderGuestItem} // Render each guest item
        // keyExtractor={item => item.id.toString()} // Extract unique keys for each item
      />

      {/* {guest.map(renderGuestItem)} */}
      {/* </ScrollView> */}

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
    backgroundColor: '#FFFFFF',
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
});

export default AddNewGuest;
