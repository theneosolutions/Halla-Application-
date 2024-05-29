import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {SH, SF, SW, Colors} from '../../utils';
import images from '../../index';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme, useIsFocused} from '@react-navigation/native';
import styles from './styles';
import {getFromLocalStorage, setItemInLocalStorage} from '../../Services/Api';
import {
  setUserProfileData,
  getProfileWithUserId,
  setProfileDataUsername,
  imageLink,
} from '../../Services/ApiList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
const EditDetail = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const focused = useIsFocused();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = require('./countryCodes.json')['countries'];
  const [modalVisible, setModalVisible] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);

  const openCountryCodePicker = () => {
    setModalVisible(true);
  };

  const onSelectCountry = country => {
    setSelectedCountry(country);
    setModalVisible(false);
  };
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onSelectCountry(item)}>
      <View
        style={{
          flexDirection: 'row',

          margin: 2,
        }}>
        <Text>{item.emoji}</Text>
        <Text>{item.phone}</Text>
      </View>

      {item.code && <Text>{item.code}</Text>}
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData called');
      try {
        const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getProfileWithUserId(userInfo?.id);
        console.log('Gettingtoken-----dataaaa--userid', response.data?.wallet);

        if (response?.data) {
          setProfileData(response.data);
          setPhoneNumber(response?.data?.phoneNumber);
          setUsername(response?.data?.firstName);
          setEmail(response?.data?.email);
          setAddress(response?.data?.address);
          setProfilePhoto(response?.data?.profilePhoto);
          setWalletAmount(response.data.wallet);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, [focused]);

  const closeModal = () => {
    setEditModalVisible(false);
    setEditField('');
    setEditValue('');
  };
  const handleEditField = field => {
    setEditField(field);
    setEditValue(profileData[field]);
    setEditModalVisible(true);
  };
  const handleSaveField = async () => {
    console.log(':::::: editField::::: ', editField);
    try {
      if (editField === 'phoneNumber') {
        const res = await setUserProfileData({phoneNumber: editValue});
        console.log('testing', res.data);
        setPhoneNumber(editValue);
      } else if (editField === 'email') {
        const res = await setUserProfileData({email: editValue});
        console.log('testing', res);
        setEmail(editValue);
      } else if (editField === 'address') {
        const res = await setUserProfileData({address: editValue});
        console.log('🚀 ~ handleSaveField ~ res:pppp', res.data);
        setAddress(editValue);
      } else if (editField === 'firstName') {
        const res = await setUserProfileData({firstName: editValue});
        console.log('res.data...>>>>>>>', res.data);
        setUsername(editValue);
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
    // Close the modal
    closeModal();
  };

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 800,
      height: 440,
      cropping: true,
    })
      .then(image => {
        console.log('Image selected:', image);
        if (image) {
          setImagePath(image);
        } else {
          console.log('User cancelled image selection');
        }
      })
      .catch(error => {
        console.log('Error choosing from gallery:', error);
      });
  };
  ////////////imageapi/////////
  const handleImageUpload = async () => {
    try {
      if (!imagePath) {
        console.log('No image selected');
        return;
      }
      const data = new FormData();
      data.append('file', {
        uri: imagePath.path,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      const response = await imageLink(data);
      setProfilePhoto(imagePath.path);
      console.log('Image upload response:', response.data.link);
      const res = await setUserProfileData({profilePhoto: response.data.link});
      console.log('🚀 ~ handleImageUpload ~ res:', res);
      setProfilePhoto(response.data.link);
      closeModal();
    } catch (error) {
      console.log('Error uploading image:', error);
      setProfilePhoto(null);
    }
  };

  return (
    <View style={styles.BackgroundWhite}>
      <View style={styles.whilistminbody}>
        <TouchableOpacity onPress={openImagePicker}>
          <View style={styles.ImagCenter}>
            <View>
              {imagePath ? (
                <Image
                  style={styles.ImageStyles}
                  resizeMode="cover"
                  source={{uri: imagePath.path}}
                />
              ) : (
                <Image
                  style={styles.ImageStyles}
                  resizeMode="cover"
                  source={{uri: profileData?.profilePhoto}}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleImageUpload}
          style={styles.imagepickerstyle}>
          <Text style={styles.savestyle}>Save</Text>
        </TouchableOpacity>

        {/* //////////////// */}
        <View style={styles.ProfileDetailesMinview}>
          {/* ///////////////////////williomjonson//////////////// */}
          <View style={styles.profiledetailboxview}>
            <Text style={styles.boxone}>{username ?? '-'}</Text>
            {/* <Text style={styles.boxtwo}></Text> */}
            <TouchableOpacity onPress={() => handleEditField('firstName')}>
              <Icon size={SF(30)} name="pencil" style={styles.boxthree} />
            </TouchableOpacity>
          </View>
          {/* //////////////////Williomjanson/////////////////// */}
          <View
            style={{
              height: 30,
              width: '100%',

              flexDirection: 'row',
              borderRadius: 10,
            }}>
            {/* <TouchableOpacity
              onPress={openCountryCodePicker}
              style={{
                height: 25,
                width: 50,
                // backgroundColor: 'white',
                // elevation: 10,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="chevron-down" size={30} color={'black'} />
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    textAlign: 'center',
                    paddingTop: 1,
                  }}>
                  {selectedCountry ? selectedCountry.emoji : '.'}
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.touchablestyleP}>
              <View
                style={{
                  flexDirection: 'row',
                  width: SW(100),
                }}>
                {/* //////////// */}
                <TouchableOpacity
                  onPress={openCountryCodePicker}
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    // elevation: 5,
                    marginHorizontal: SW(2),
                    paddingVertical: SW(2),
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',

                      // marginLeft: SW(3),
                      // paddingRight: SW(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Icon
                      name="chevron-down"
                      size={30}
                      color={'black'}
                      style={{marginTop: SH(-1.2)}}
                    />
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {selectedCountry ? selectedCountry.emoji : '🇺🇸'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  style={{height: 140}}
                  onRequestClose={() => setModalVisible(false)}>
                  <View style={styles.modalCallingCodeContainer}>
                    <FlatList
                      data={countries}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                    />
                  </View>
                </Modal>

                <TextInput
                  style={styles.inputPhonNu}
                  // placeholder={t('PhoneNumber')}
                  value={phoneNumber}
                  color={'black'}
                  keyboardType="phone-pad"
                  placeholderTextColor={'black'}
                  onChangeText={val => {
                    setPhoneNumber(val), setSubmitted(true);
                  }}
                />
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              style={{height: 40}}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalCallingCodeContainer}>
                <FlatList
                  data={countries}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                />
              </View>
            </Modal>
            {/* <Text style={styles.boxoneP}>{phoneNumber ?? '-'}</Text> */}
            <TouchableOpacity onPress={() => handleEditField('phoneNumber')}>
              <Icon size={SF(30)} name="pencil" style={{marginLeft: 210}} />
            </TouchableOpacity>
            <Text style={styles.boxtwo}></Text>
          </View>
          {/* //////////////////Williomjanson/////////////////// */}
          <View style={styles.profiledetailboxview}>
            <Text style={styles.boxone}>{email ?? '-'}</Text>
            <Text style={styles.boxtwo}></Text>
            <TouchableOpacity onPress={() => handleEditField('email')}>
              <Icon size={SF(30)} name="pencil" style={styles.boxthree} />
            </TouchableOpacity>
          </View>

          {/* //////////////////Williomjanson/////////////////// */}

          <View style={styles.profiledetailboxview}>
            <Text style={styles.boxone}>{address ?? '-'}</Text>
            <Text style={styles.boxtwo}></Text>
            <TouchableOpacity onPress={() => handleEditField('address')}>
              <Icon size={SF(30)} name="pencil" style={styles.boxthree} />
            </TouchableOpacity>
          </View>
          {/* /////////////// */}
          {/* /////////////////////////////// */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter new ${editField}`}
                  value={editValue}
                  onChangeText={setEditValue}
                />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleSaveField}>
                    <Text style={styles.buttonText}>Save</Text>
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
        </View>
      </View>
    </View>
  );
};
export default EditDetail;
