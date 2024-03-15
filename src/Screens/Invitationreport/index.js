import React, { useState, useMemo, useEffect,useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet, ActivityIndicator,
  Alert
} from 'react-native';
import IconF from 'react-native-vector-icons/AntDesign';
import { Spacing, Search, Button } from '../../Components';
import DropDownPicker from 'react-native-dropdown-picker';
import { SH, Colors, SW, SF } from '../../utils';
import IconG from 'react-native-vector-icons/Ionicons';
import Egypto from 'react-native-vector-icons/Entypo';
import { useNavigation, useTheme } from '@react-navigation/native';
import images from '../../index';
import { useTranslation } from 'react-i18next';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import { EventId, SendInvites } from '../../Services/ApiList';
import { useFocusEffect } from '@react-navigation/native';


const Invitationreport = ({ route, ...props }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [singleData, setSingleData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [eventStats, setEventStats] = useState({})

  // Effects
  // useEffect(() => {
    
  // }, []);

  useFocusEffect(
    useCallback(() => {
      handleGetByUserId(id);
    }, [])
  );

  // Functions
  const handleGetByUserId = async (id) => {
    try {
      setLoading(true);
      const response = await EventId(id);
      console.log('Events:.....======', response?.data);

      // Check if response data is valid
      if (response?.data) {
        setSingleData(response.data);

        // Check if stats data is available and has length > 0
        if (response.data.stats && response.data.stats.length > 0) {
          const {
            GuestConfirmed,
            GuestFailed,
            GuestInvited,
            GuestMessages,
            GuestNotInvited,
            GuestRejected,
            GuestScanned
          } = response.data.stats[0];

          setEventStats({
            GuestConfirmed,
            GuestFailed,
            GuestInvited,
            GuestMessages,
            GuestNotInvited,
            GuestRejected,
            GuestScanned
          });
        } else {
          // Set default values if stats data is not available
          setEventStats({
            GuestConfirmed: "0",
            GuestFailed: "0",
            GuestInvited: "0",
            GuestMessages: "0",
            GuestNotInvited: "0",
            GuestRejected: "0",
            GuestScanned: "0"
          });
        }
      } else {
        // Handle case where response data is invalid
        console.log('Invalid response data:', response);
      }
    } catch (error) {
      // Handle error
      console.log('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSendInvites = async () => {
    try {
      const response = await SendInvites(id);
      setTimeout(() => {
        setInviteLoading(false)
        Alert.alert('Success', 'Your invitations are sent.');
        setValue(null)
      }, 3000);
    } catch (error) {
      console.log('Error sending invites:', error);
      Alert.alert('Error', 'Invitations could not be sent.');
      setInviteLoading(false)
      setValue(null)
    } finally {
      setLoading(false);
      setInviteLoading(false)
    }
  };

  const openContactslist = () => {
    if (singleData && singleData?.invites) {
      const invitesCount = singleData?.invites?.length;
      console.log('🚀 ~ openContactslist ~ invitesCount:', invitesCount);
      if (invitesCount === 0) {
        navigation.navigate('AddGuest', { id });
      } else if (invitesCount >= 1) {
        navigation.navigate('AddNewGuest', { id });
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

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleChangeValue = async (selectedValue) => {
    setValue(null);
    if (selectedValue === 'Invitation') {
      setInviteLoading(true);
      await handleSendInvites();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={SplashStyl.ScrollViewTestHeight}>
        <View style={SplashStyl.Container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <IconF
                size={SF(20)}
                name="left"
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Invitation Report</Text>
            <TouchableOpacity onPress={toggleDropdown}>
              <Egypto
                size={SF(20)}
                name="dots-three-vertical"
                style={styles.headerIconRight}
              />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#000" />
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'column',
                  width: '95%',
                  height: 80,
                  backgroundColor: 'white',
                  marginBottom: 10
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'start', fontSize: 17, fontWeight: '600', color: 'black', marginTop: 20 }}>Invitation Report</Text>
                  {/* Right side containing dropdown */}
                  <View style={{ width: '35%', marginLeft: 110, height: 15, marginTop: 10 }}>

                    <DropDownPicker
                      items={[
                        { label: 'Remainder', value: 'Remainder' },
                        { label: 'Invitation', value: 'Invitation' },
                      ]}
                      style={{
                        backgroundColor: '#293170',
                        borderTopLeftRadius: 28,
                        borderBottomRightRadius: 28,
                        borderWidth: 1,
                        borderColor: 'gray',
                      }}
                      itemStyle={{ justifyContent: 'flex-start' }}
                      labelStyle={{ color: 'white' }}
                      dropDownStyle={{
                        backgroundColor: '#293170',
                        borderTopLeftRadius: 28,
                        borderBottomRightRadius: 28,
                      }}
                      placeholderStyle={{ color: 'white', fontWeight: '800' }}
                      onChangeValue={handleChangeValue}
                      setOpen={setIsOpen}
                      open={isOpen}
                      value={value}
                      setValue={setValue}
                      placeholder="Share"
                      iconStyle={{ color: 'white' }}
                    />
                    {inviteLoading && (
                      <ActivityIndicator
                        style={{ position: 'absolute', top: 15, right: 40, zIndex: 1000000 }}
                        size="small"
                        color="white"
                      />
                    )}
                  </View>

                </View>

                {/* Subheading */}
                <Text style={{ textAlign: 'start', fontSize: 14, fontWeight: '600', color: 'black', marginBottom: 10 }}>
                  Your event invitation report is here
                </Text>

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
              <View style={SplashStyl.RowView}>
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
                        <Text style={styles.badgeText}>{eventStats?.GuestInvited}</Text>
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
                      <Text style={styles.badgeText}>{eventStats?.GuestMessages}</Text>
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
                      <Text style={styles.badgeText}>{eventStats?.GuestConfirmed}</Text>
                    </View>
                  </View>
                </View>
                {/* box4 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}>Scanned</Text>
                  <View style={SplashStyl.imageView}>
                    <Image source={images.scanned} style={SplashStyl.imagestyle} />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{eventStats?.GuestScanned}</Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* ////////////////////box1end//////// */}
              {/* <Spacing space={SH(20)} /> */}
              {/* ////////////////boxrow1///////////////////// */}
              <View style={SplashStyl.RowView}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <View style={SplashStyl.insideboxview}>
                    <Text style={SplashStyl.boxtext}>Waiting</Text>
                    <View style={SplashStyl.imageView}>
                      <Image source={images.waitng} style={SplashStyl.imagestyle} />
                      {/* Badge */}
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{eventStats?.GuestNotInvited}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* box2 */}
                <View style={SplashStyl.insideboxview}>
                  <Text style={SplashStyl.boxtext}> Rejected</Text>
                  <View style={SplashStyl.imageView}>
                    <Image source={images.rejected} style={SplashStyl.imagestyle} />
                    {/* Badge */}
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{eventStats?.GuestRejected}</Text>
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
                      <Text style={styles.badgeText}>{eventStats?.GuestNotInvited}</Text>
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
                      <Text style={styles.badgeText}>{eventStats?.GuestFailed}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                // onPress={()=> HandleAddEventGuest()}
                // >
                onPress={openContactslist}>
                {/* onPress={() => navigation.navigate('AddNewGuest',{eventId:id})}>  */}
                <View
                  style={{
                    backgroundColor: '#EFEFF4',
                    height: '25%',
                    width: 330,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={images.gridicons_add}
                    style={{ height: 40, width: 40, marginRight: 10 }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      paddingRight: 10,
                      color: '#293170',
                    }}>
                    Add new Guest
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 10,
                  backgroundColor: 'transparent',
                  width: 340,
                  // margin: 10,
                  flexDirection: 'column',
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                <View style={styles.slide}>
                  <TouchableOpacity>
                    <Image source={{ uri: singleData?.image }} style={styles.images} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>{singleData?.name}</Text>
                      <Text style={{ color: 'black' }}>{singleData?.eventDate}</Text>
                    </View>
                    {/* <Text>{singleData.name}</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
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
    height: SH(50),
    marginLeft: 10,
    marginRight: 20,
    marginTop: 30,
    color: '#000'
  },
  headerIconRight: {
    marginRight: 10,
    color: '#000'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    //flex: 1,
    marginLeft: 15,
    height: '70%',
    //alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#F2F2F4',
    // backgroundColor:'transparent',
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    paddingHorizontal: 16
    //marginBottom: 20,
  },
  images: {
    height: SH(200),
    width: SW(310),
    //borderRadius: 23,
    borderTopLeftRadius: 20,
    //borderTopRightRadius: 12,
    marginLeft: 0,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 30,
    //borderBottomLeftradius: 20,
    // marginTop: 10,
    marginBottom: 10,
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
    marginLeft: 'auto',
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
});
export default Invitationreport;