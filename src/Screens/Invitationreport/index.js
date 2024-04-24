import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';

import IconF from 'react-native-vector-icons/AntDesign';
import {Spacing, Search, Button} from '../../Components';
import DropDownPicker from 'react-native-dropdown-picker';
import {SH, Colors, SW, SF} from '../../utils';
import IconG from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Egypto from 'react-native-vector-icons/Entypo';
import {useNavigation, useTheme} from '@react-navigation/native';
import images from '../../index';
import {useTranslation} from 'react-i18next';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import {EventId, SendInvites, deleteEventbyId} from '../../Services/ApiList';
import {useFocusEffect} from '@react-navigation/native';

const Invitationreport = ({route, ...props}) => {
  const {id} = route.params;

  const {t} = useTranslation();
  const navigation = useNavigation();
  const [singleData, setSingleData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [eventStats, setEventStats] = useState({});
  const [isDropdownOpenDots1, setIsDropdownOpenDots1] = useState(false);
  const [isDropdownOpenDots2, setIsDropdownOpenDots2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isShareOptionsVisible, setIsShareOptionsVisible] = useState(false);

  // const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const DeleteEventFromList = async eventId => {
    try {
      const response = await deleteEventbyId(eventId);
      // console.log('Events:.....======+++++--------', response);
      if (response && response.status === 200) {
        setSingleData({});
        navigation.navigate('Home');
        // console.log('Event deleted successfully');
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
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  const toggleShareOptions = () => {
    setIsShareOptionsVisible(!isShareOptionsVisible);
  };
  const handleRefresh = () => {
    setRefreshing(true);

    // Fetch data again
    handleGetByUserId();

    setRefreshing(false);
  };
  // console.log('singleData', singleData);
  useEffect(() => {
    // Fetch data from the EventId API
    const fetchData = async () => {
      try {
        const response = await EventId(id);
        // console.log('response?.data?.id===++++', response?.data?.id);
        // const Events = response?.data?.id;
        // console.log('EventId', Events);
        if (response?.data?.id) {
          setSingleData(response.data);
        }
        // console.log('setSingleData----------', singleData?.id);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, [id]);

  const handleEditEvent = async () => {
    // console.log('first');
  };
  useFocusEffect(
    useCallback(() => {
      handleGetByUserId(id);
    }, []),
  );

  const handleGetByUserId = async id => {
    try {
      setLoading(true);
      const response = await EventId(id);
      // console.log('Events:.....===eventid===', response?.data);
      if (response?.data) {
        setSingleData(response.data);
        if (response.data.stats && response.data.stats.length > 0) {
          const {
            GuestConfirmed,
            GuestFailed,
            GuestInvited,
            GuestMessages,
            GuestNotInvited,
            GuestRejected,
            GuestScanned,
          } = response.data.stats[0];

          setEventStats({
            GuestConfirmed,
            GuestFailed,
            GuestInvited,
            GuestMessages,
            GuestNotInvited,
            GuestRejected,
            GuestScanned,
          });
        } else {
          setEventStats({
            GuestConfirmed: '0',
            GuestFailed: '0',
            GuestInvited: '0',
            GuestMessages: '0',
            GuestNotInvited: '0',
            GuestRejected: '0',
            GuestScanned: '0',
          });
        }
      } else {
        console.log('Invalid response data:', response);
      }
    } catch (error) {
      console.log('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvites = async () => {
    try {
      const response = await SendInvites(id);
      // console.log('response', response);
      setTimeout(() => {
        setInviteLoading(false);
        Alert.alert('Success', 'Your invitations are sent.');
        setValue(null);
      }, 3000);
    } catch (error) {
      console.log('Error sending invites:', error);
      Alert.alert('Error', 'Invitations could not be sent.');
      setInviteLoading(false);
      setValue(null);
    } finally {
      setLoading(false);
      setInviteLoading(false);
    }
  };

  const openContactslist = () => {
    if (singleData && singleData?.invites) {
      const invitesCount = singleData?.invites?.length;
      // console.log('singleData=======', singleData);
      console.log('🚀 ~ openContactslist ~ invitesCount:', invitesCount);
      if (invitesCount === 0) {
        navigation.navigate('AddGuest', {id});
      } else if (invitesCount >= 1) {
        navigation.navigate('AddNewGuest', {id});
      }
    } else {
      console.log('No invites data found');
    }
  };

  const handleSendInvitations = () => {
    if (!singleData) {
      Alert.alert('Error', 'Data not loaded yet. Please wait.');
    } else if (!singleData.invites || singleData.invites.length === 0) {
      Alert.alert('Error', 'No invites to send.');
    } else {
      handleSendInvites();
    }
  };
  // console.log('singleData--------------------=======', singleData);
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleChangeValue = async selectedValue => {
    setValue(null);
    if (selectedValue === 'Invitation') {
      setInviteLoading(true);
      await handleSendInvites();
    }
  };
  // State variable to control the visibility of the view

  // Function to toggle the visibility of the view
  const toggleView = () => {
    setIsViewVisible(!isViewVisible);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const handleDeleteEvent = eventId => {
    setSelectedEventId(eventId); // Set the selected event ID
    openModal(); // Open the modal
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        // style={{backgroundColor: 'red'}}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View
          style={{
            ...styles.Container,
            backgroundColor: 'transparent',
            marginBottom: 0,
          }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <IconF size={SF(20)} name="left" style={styles.headerIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Invitation Report</Text>

            <TouchableOpacity
              onPress={toggleModal}
              // onPress={toggleView}
              style={styles.iconContainer}>
              <Egypto
                size={20}
                name="dots-three-vertical"
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          </View>
          {isViewVisible && (
            <View style={styles.modalContentDotView}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate('EditEvent', {id})}>
                <IconF size={SF(20)} name="edit" style={styles.boldstyle} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteEvent(singleData?.id)}>
                <IconM size={SF(20)} name="delete" style={styles.boldstyle} />
              </TouchableOpacity>
            </View>
          )}
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#000"
            />
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  width: '96%',
                  height: 100,
                  margin: 5,
                  backgroundColor: '#ffff',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 5,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'start',
                      fontSize: 17,
                      fontWeight: '600',
                      color: 'black',
                      marginTop: 15,
                      marginLeft: 10,
                    }}>
                    Invitation Report
                  </Text>
                  <Text
                    style={{
                      textAlign: 'start',
                      fontSize: 14,
                      fontWeight: '600',
                      color: 'black',
                      marginLeft: 10,
                      // marginBottom: 10,
                    }}>
                    Your event invitation report is here
                  </Text>
                </View>
                {/* Right side containing dropdown */}
                <View
                  style={{
                    width: '16%',
                    // backgroundColor: 'red',
                    // marginLeft: 'auto',
                    height: 15,
                    marginTop: 15,
                    color: 'white',
                    position: 'absolute',
                    right: 0,
                    marginLeft: 120,
                  }}>
                  <TouchableOpacity
                    onPress={toggleShareOptions}
                    style={styles.SendIconView}>
                    <Text
                      style={{
                        marginLeft: 3,
                        marginRight: 1,
                        marginTop: 8,
                        color: 'white',
                        fontSize: 12,
                      }}>
                      Send
                    </Text>
                    <IconF
                      size={SF(17)}
                      name="caretdown"
                      style={{
                        marginLeft: 6,
                        // marginRight: 1,
                        marginTop: 8,
                        color: 'white',
                      }}
                    />
                  </TouchableOpacity>
                  {/* <DropDownPicker
                    items={[
                      {label: 'Remainder', value: 'Remainder'},
                      {label: 'Invitation', value: 'Invitation'},
                    ]}
                    style={{
                      backgroundColor: '#293170',
                      // borderTopLeftRadius: 28,
                      // borderBottomRightRadius: 28,
                      // borderWidth: 1,
                      // borderColor: 'gray',
                    }}
                    itemStyle={{justifyContent: 'flex-start'}}
                    labelStyle={{color: 'white'}}
                    dropDownStyle={{
                      backgroundColor: '#293170',
                      // borderTopLeftRadius: 28,
                      // borderBottomRightRadius: 28,
                    }}
                    placeholderStyle={{color: 'white', fontWeight: '800'}}
                    onChangeValue={handleChangeValue}
                    setOpen={setIsOpen}
                    open={isOpen}
                    value={value}
                    setValue={setValue}
                    placeholder="Send"
                    iconStyle={{color: 'white'}}
                  /> */}
                  {inviteLoading && (
                    <ActivityIndicator
                      style={{
                        position: 'absolute',
                        top: 15,
                        right: 40,
                        zIndex: 1000000,
                      }}
                      size="small"
                      color="white"
                    />
                  )}
                </View>
                {isShareOptionsVisible && (
                  <View style={styles.shareOptions}>
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => {
                        handleSendInvites();
                        // Implement share functionality
                        // toggleShareOptions();
                      }}>
                      <Text style={styles.optionText}>Send Invite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => {
                        // Implement other share functionality
                        toggleShareOptions();
                      }}>
                      <Text style={styles.optionText}>Send Remaind</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {/* Subheading */}

                {/* Display selected option in a separate column */}
                {selectedOption && (
                  <View style={SplashStyl.selectedOptionContainer}>
                    <Text>Selected Option:</Text>
                    <Text>{selectedOption}</Text>
                  </View>
                )}
              </View>
              <Spacing space={SH(60)} />
              {/* ////////////////boxrow1///////////////////// */}
              <View style={styles.RowView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={SplashStyl.insideboxview}>
                    <Text style={SplashStyl.boxtext}>Invited</Text>
                    <View style={SplashStyl.imageView}>
                      <Image
                        source={images.blueiconone}
                        style={SplashStyl.imagestyle}
                      />
                      {/* Badge */}
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>
                          {eventStats?.GuestInvited}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* box2 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}> Messages</Text>
                  <View style={SplashStyl.imageView}>
                    <Image
                      source={images.messagesicon}
                      style={SplashStyl.imagestyle}
                    />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>
                        {eventStats?.GuestMessages}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* box3 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}>confirmed</Text>
                  <View style={SplashStyl.imageView}>
                    <Image
                      source={images.confirmed}
                      style={SplashStyl.imagestyle}
                    />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>
                        {eventStats?.GuestConfirmed}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* box4 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}>Scanned</Text>
                  <View style={SplashStyl.imageView}>
                    <Image
                      source={images.scanned}
                      style={SplashStyl.imagestyle}
                    />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>
                        {eventStats?.GuestScanned}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* ////////////////////box1end//////// */}
              {/* <Spacing space={SH(20)} /> */}
              {/* ////////////////boxrow1///////////////////// */}
              <View style={styles.RowView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={SplashStyl.insideboxview}>
                    <Text style={SplashStyl.boxtext}>Waiting</Text>
                    <View style={SplashStyl.imageView}>
                      <Image
                        source={images.waitng}
                        style={SplashStyl.imagestyle}
                      />
                      {/* Badge */}
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>
                          {eventStats?.GuestNotInvited}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* box2 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}> Rejected</Text>
                  <View style={SplashStyl.imageView}>
                    <Image
                      source={images.rejected}
                      style={SplashStyl.imagestyle}
                    />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>
                        {eventStats?.GuestRejected}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* box3 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}>Not Invited</Text>

                  <View style={SplashStyl.imageView}>
                    <Image
                      source={images.notinivted}
                      style={SplashStyl.imagestyle}
                    />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>
                        {eventStats?.GuestNotInvited}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* box4 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}>Failed</Text>

                  <View style={SplashStyl.imageView}>
                    <Image
                      source={images.Failedicon}
                      style={SplashStyl.imagestyle}
                    />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>
                        {eventStats?.GuestFailed}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={openContactslist}>
                <View style={styles.addGuestButton}>
                  <Image
                    source={images.gridicons_add}
                    style={{height: 40, width: 40, marginRight: 10}}
                  />
                  <Text style={styles.addGuestButtonText}>Add new Guest</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: SH(100),
                  width: SW(100),
                  marginBottom: 200,
                }}>
                <View style={styles.slide}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        fontSize: 12,
                        marginRight: 30,
                      }}>
                      {singleData?.name}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        fontSize: 12,
                        marginLeft: 35,
                      }}>
                      {singleData?.eventDate}
                    </Text>
                  </View>
                  <Image
                    source={{uri: singleData?.image}}
                    style={styles.images}
                  />
                </View>
              </View>
            </>
          )}
        </View>

        <Modal visible={showModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>
                Do You Want To
                <Text style={styles.boldheading}>Delete</Text> An Event
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    DeleteEventFromList(id);
                    closeModal();
                  }}>
                  <Text style={styles.buttonText}>Delete Event</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.modalContainerE}>
              <View style={styles.modalContentE}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    width: SW(120),
                  }}
                  onPress={() => {
                    // Navigate to edit screen or perform edit action
                    toggleModal();
                    navigation.navigate('EditEvent', {id});
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: 'black',
                      fontSize: SF(14),
                    }}>
                    Edit Event
                  </Text>
                  <IconF size={20} name="edit" style={styles.boldstyle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    width: SW(120),
                  }}
                  onPress={() => {
                    // Perform delete action
                    toggleModal();
                    handleDeleteEvent(singleData?.id);
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: 'black',
                      fontSize: SF(14),
                    }}>
                    Delete Event
                  </Text>
                  <IconM size={20} name="delete" style={styles.boldstyle} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  modalContainerE: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentE: {
    backgroundColor: '#f8f9fc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '50%',
    padding: 20,
    elevation: 50,
    shadowOpacity: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: SF(20),
    color: 'black',
  },
  // modalOverlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  // },
  headerIcon: {
    height: SH(50),
    marginLeft: 2,
    marginRight: 10,
    marginTop: 25,
    color: '#000',
  },
  headerIconRight: {
    marginRight: 10,
    color: '#000',
  },
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  addGuestButton: {
    backgroundColor: '#EFEFF4',
    height: 60,
    width: '88%',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 22,
  },
  addGuestButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#293170',
  },
  slide: {
    height: SH(210),
    width: SW(320),
    borderRadius: 10,
    // flex: 1,
    // marginLeft: 15,

    // elevation: 30,
    // shadowOpacity: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    // backgroundColor: 'red',
    marginLeft: SW(28),
    // elevation: 10,
    // borderBottomRightRadius: 20,
  },
  images: {
    height: SH(200),
    width: SW(320),
    borderRadius: 10,

    //borderRadius: 23,
    // borderTopLeftRadius: 20,
    //borderTopRightRadius: 12,
    // marginLeft: 0,
    // borderBottomRightRadius: 40,
    // borderTopLeftRadius: 30,
    //borderBottomLeftradius: 20,
    // marginTop: 10,
    // marginBottom: 60,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    paddingHorizontal: 16,
    //marginBottom: 20,
  },

  text: {
    marginRight: 'auto',
    fontWeight: '700',
    color: 'black',
    //textAlign: 'center',
    fontSize: 10,
    marginLeft: 15,
    // marginHorizontal: 30,
  },
  text2: {
    // marginLeft: 'auto',
    fontWeight: '700',
    color: 'black',
    //textAlign: 'center',
    fontSize: 12,
    marginLeft: 14,
    // marginHorizontal: 30,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#BD9956', // Badge background color
    borderRadius: 10, // Adjust as needed for your badge
    width: 18, // Adjust width as needed
    height: 18, // Adjust height as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white', // Badge text color
    fontSize: 12, // Adjust font size as needed
    fontWeight: 'bold', // Adjust font weight as needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 2,
    paddingVertical: 8,
  },

  modalContentView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    // marginLeft: 20,
    marginTop: 2,
    elevation: 10,
    // borderWidth: 1,
    // marginLeft: 0,
  },
  modalContentDotView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    marginRight: 45,
    marginTop: 5,
    width: SW(60),
    // marginLeft: 20,
    // marginTop: 2,
    elevation: 10,
  },
  modalContentM: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 2,
    paddingVertical: 4,
  },
  option: {
    paddingVertical: 4,
    paddingHorizontal: 4,

    // borderBottomWidth: 1,
    // borderBottomColor: '#DCC7F8',
  },
  boldstyle: {
    fontWeight: '600',
    color: 'black',
    fontSize: 12,
    padding: 5,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    margin: 5,
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
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
  modalHeading: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 20,
  },
  boldheading: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    // marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  RowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    right: 0,
    marginLeft: 30,
  },
  SendIconView: {
    padding: 2,
    flexDirection: 'row',
    right: 0,
    marginLeft: -10,
    marginRight: 30,
    backgroundColor: '#293170',
    width: 74,
    height: 45,
    borderRadius: 5,
  },
  shareOptions: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: 'white',
    marginLeft: 56,
    height: SH(62),
    width: SW(90),
    marginTop: 60,
    elevation: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  optionText: {
    color: 'black',
    fontSize: SF(13),
    // textAlign: 'center',
    fontWeight: '500',
  },
});
export default Invitationreport;
