import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Input, Spacing} from '../../Components';
import axios from 'axios';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import images from '../../index';
import Scanstyle from '../../styles/CommonStyle/Scanstyle';
import {SF, SW, SH} from '../../utils';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import IconF from 'react-native-vector-icons/AntDesign';
import ImageCropPicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import {ImageLink} from '../../Services/ApiList';
import {getFromLocalStorage, setItemInLocalStorage} from '../../Services/Api';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import Share from 'react-native-share';
const CreateEvent = ({navigation, route}) => {
  //  const {latitude = null, longitude = null, address = null} = route?.params;
    // const { latitude, longitude, address } = route.params;
// console.log('address',address)
  //  console.log('address', latitude);
  const [date, setDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [storeImage, setStoreImage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
//  console.log('selectedDateTime',selectedDateTime)
  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 800,
      height: 440,
      cropping: true,
    })
      .then(image => {
        console.log('imagessss', image);
        if (image) {
          setImagePath(image);
          // console.log('setImagePath', setImagePath);
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
    if (!imagePath) {
      console.log('No image selected');
      return;
    }
    const data = new FormData();
    data.append('file', {
      uri: imagePath.path,
      type: 'image/jpeg', // You may need to adjust the type based on the image format
      name: 'image.jpg', // You can change the name as needed
    });
    try {
      const response = await ImageLink(data);
      console.log('Image upload response:', response.data);
      console.log('response.data',response)
      setStoreImage(response.data.link);
      console.log('setStoreImage===========', storeImage);
      // Handle response as needed
    } catch (error) {
      console.log('Error uploading image:', error);
      // Handle error
    }
  };
 /////////////imageapiend/////
  ///////////////dataapi//////////
  const createEventData = async () => {
    const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
    const data = {
      user: userInfo?.id,
      image: storeImage,
      name: eventName,
      eventDescription:eventDescription,
      eventDate: selectedDateTime,
      showQRCode: false,
      address: route.params?.address,
      latitude: route.params?.latitude,
      longitude: route.params?.longitude,
      status:'draft'
    };
    navigation.navigate('Card', {
      eventData: data,
    });
  };
  //////////////enddataapi///////
  const eventDataDetail = async () => {
    const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
    const data = {
      user: userInfo?.id,
      image: storeImage,
      name: eventName,
      eventDescription:eventDescription,
      eventDate: selectedDateTime,
      showQRCode: false,
      address: route.params?.address,
      latitude: route.params?.latitude,
      longitude: route.params?.longitude,
      status:'draft'
    };
    navigation.navigate('MapScreen', {
      eventData: data,
    });
  };
  useEffect(()=>{
    if(route.params?.eventData){
      const event = route.params?.eventData;
      setEventName(event?.name)
      setStoreImage(event?.image)
      setImagePath({path:event?.image})
      setEventDescription(event?.eventDescription)
      setSelectedDateTime(event?.eventDate)
      // setEventName(event?.name)
      // setEventName(event?.name)
      // setEventName(event?.name)
    }
  },[])
  const schema = yup.object().shape({
    eventName: yup.string().required('Email is required'),
    eventDescription: yup.string().required('Password is required'),
    selectedDateTime:yup.string().required('date and time is required'),
    latitude:yup.string().required('location is required'),
    longitude:yup.string().required('location is required'),
    storeImage:yup.string().required('storeImage is required'),
  });
  const { control, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      eventName: '',
      eventDescription: '',
      selectedDateTime:'',
      latitude:'',
      longitude:'',
      storeImage:''
    },
  });
  // const onPressSend = async (_formData) => {
  //  const resutl = await login(_formData.email, _formData.password);
  //  console.log(":rocket: ~ onPressSend ~ resutl:", resutl)
  //  if(resutl?.data?.accessToken){
  //    Alert.alert('User login successfully!')
  //  }
  // };
  return (
    <View style={{flex: 1}}>
      <View style={MessagingStyles.BackgroundWhite}>
        <View style={MessagingStyles.whilistminbody}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={MessagingStyles.ScrollViewTestHe}>
            <View
              style={{
                width: '99%',
                flexDirection: 'row',
                height: 50,
                backgroundColor: '#F9F8FC',
                padding: SW(10),
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <IconF
                  size={SF(20)}
                  name="left"
                  style={{
                    height: SH(30),
                    marginLeft: 10,
                    marginRight: 20,
                    marginTop: SH(4),
                    color:'black',
                    fontWeight:'600'
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  fontWeight: '700',
                  fontSize: SF(20),
                  color: 'black',
                  marginLeft: SW(55),
                }}>
                Create New Event
              </Text>
            </View>
            <TouchableOpacity onPress={openImagePicker} activeOpacity={0.6}>
              <View style={MessagingStyles.imagepickerview}>
                {imagePath ? (
                  <Image
                    source={{uri: imagePath.path}}
                    style={{
                      height: SH(200),
                      width: '100%',
                      backgroundColor: 'lightGray',
                      borderTopLeftRadius: SF(20),
                      borderBottomRightRadius:SF(20),
                      overflow: 'hidden',
                      resizeMode:'contain'
                      // position:'absolute',
                    }}
                  />
                ) : (
                  <Text style={{alignItems:'center',alignSelf:'center',color:'black',fontWeight:'600'}}>Select Image</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleImageUpload}
              style={{
                backgroundColor: '#293170',
                padding: 10,
                borderTopLeftRadius: SF(20),
                borderBottomRightRadius:SF(20),
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <Text style={{color: 'white',alignItem:'center',justifyContent:'center',fontWeight:'500'}}>Upload Image</Text>
            </TouchableOpacity>
            <View style={{margin: SW(5)}}>
              <Text
                style={{
                  fontSize: SF(15),
                  color: 'black',
                  fontWeight: '600',
                  padding: SW(4),
                  marginTop:SH(3),
                  paddingHorizontal: SW(20),
                }}>
                Event Name:
              </Text>
              <Input
                inputStyle={Scanstyle.InputStyles}
                placeholder="Type your event name"
                onChangeText={text => setEventName(text)}
                value={eventName}
              />
            </View>
            {errors.eventName && <Text style={[colors.red500, gutters.paddingLeft_10, gutters.marginVertical_5]}>{errors.eventName.message}</Text>}
            <Text
              style={{
                fontSize: SF(15),
                color: 'black',
                fontWeight: '600',
                padding: SW(4),
                marginTop:SH(4),
                paddingHorizontal: SW(25),
              }}>
              Event Description:
            </Text>
            <View style={{width: '97%', marginLeft: 5}}>
              <Input
                inputStyle={Scanstyle.InputStyles}
                placeholder="Type your event name"
                onChangeText={text => setEventDescription(text)}
                value={eventDescription}
              />
            </View>
            {/* <Spacing space={SH(10)} /> */}
            <Text
              style={{
                fontSize: SF(15),
                color: 'black',
                fontWeight: '600',
                paddingHorizontal: SW(25),
                marginTop:SH(16),
                 paddingVertical: SH(8),
              }}>
              Select Date and Time:
            </Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              style={{
                width: '95%',
                height: SH(55),
                backgroundColor: 'white',
                marginLeft: SW(10),
                // paddingVertical: SH(18),
                paddingHorizontal: SW(14),
                borderTopLeftRadius: SF(12),
              }}>
              <Text
                style={{
                  backgroundColor: '#F8F9FC',
                  height: 55,
                  paddingLeft: 12,
                  paddingVertical: 16,
                  borderWidth: 0.3,
                  borderTopLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  color: 'grey',
                  fontWeight: '500',
                }}>
                {selectedDateTime
                  ? selectedDateTime.toLocaleString()
                  : 'Select Date and Time'}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={isDatePickerVisible}
              date={date}
              onConfirm={selectedDate => {
                setDatePickerVisible(false);
                setSelectedDateTime(selectedDate);
                setDate(selectedDate);
              }}
              onCancel={() => {
                setDatePickerVisible(false);
              }}
            />
               {/* {submitted && setSelectedDateTime == '' ? (
            <Text style={{fontSize: 12, color: 'red'}}>Enter your Date , Time</Text>
          ) : null} */}
            <Spacing space={SH(30)} />
            <TouchableOpacity onPress={eventDataDetail}>
              <View
                style={{
                  height: SH(200),
                  width: '90%',
                  backgroundColor: 'gray',
                  margin: SW(15),
                  borderTopLeftRadius:SF(30),
                  borderBottomRightRadius:SF(30)
                }}>
                <Image
                  source={images.mapimg}
                  style={{
                    height: SH(210),
                    width: '100%',
                    justifyContent: 'center',
                    borderTopLeftRadius:SF(30),
                    borderBottomRightRadius:SF(30)
                  }}
                />
              </View>
            </TouchableOpacity>
            <Spacing space={SH(30)} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItem: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: SW(100),
                  backgroundColor: '#293170',
                  borderTopLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  marginRight: 10,
                }}
                onPress={() => navigation.navigate('Home')}>
                <Text
                  style={{
                    alignItems: 'center',
                    color: 'white',
                    justifyContent: 'center',
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontWeight: '700',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={createEventData}
                // onPress={() => navigation.navigate('Card')}
                style={{
                  height: '100%',
                  width: SW(100),
                  backgroundColor: '#293170',
                  borderTopLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    alignItems: 'center',
                    color: 'white',
                    justifyContent: 'center',
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontWeight: '700',
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
            <Spacing space={SH(30)} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default CreateEvent;