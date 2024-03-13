import React, {useState, useMemo,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import IconF from 'react-native-vector-icons/AntDesign';
import {Spacing, Search, Button} from '../../Components';
import DropDownPicker from 'react-native-dropdown-picker';
import {SH, Colors, SW, SF} from '../../utils';
import IconG from 'react-native-vector-icons/Ionicons';
import Egypto from 'react-native-vector-icons/Entypo';
import {useNavigation, useTheme} from '@react-navigation/native';
import images from '../../index';
import {useTranslation} from 'react-i18next';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';
import BirthdayCard from '../../Components/commonComponents/BirthdayCard';
import AppIntroSlider from 'react-native-app-intro-slider';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import {EventId,SendInvites} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
const Invitationreport = ({ route,...props }) => {
  const { id } = route.params;
  console.log('id,id',id)
  const {t} = useTranslation();
  const {navigation} = props;
  const {Colors} = useTheme();
  const[card,setCard]=useState([])
  const [singleData, setSingleData] = useState(null);
  // const default  = require('../../')
  // const HomeTabStyle = useMemo(() => HomeTabStyles(Colors), [Colors]);
  const [color, setcolor] = useState('Clean_Text');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };


  const handleGetByUserId  = async (id) => {
    try {
      const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'))
  
      console.log('..........', Gettingtoken.id);
  
      const response = await EventId(id); // Pass user ID if requitransparent
      console.log('Events:.....======', response.data);
      if (response.data) {
        setSingleData(response.data); 
       // Store the first item in the state
      } 
  
      else {
        setSingleData(null); // Reset the state if no data is available
      }
      // setCard(response.data.data);
      // console.log('card',card)
      // console.log('data=====invitation===',response.data)
  
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  
  }
  
  useEffect(() => {
    handleGetByUserId(id); // Fetch events when component mounts
  }, [id]);
  


//////////////sendinvites api //////
const handleSendInvites  = async (id) => {
  try {

    const response = await SendInvites(id); // Pass user ID if requitransparent
    console.log('invitesssEvents:.....======', response);
  } catch (error) {
    console.log('Error fetching events:', error);
  }

}

///////////////////////////////////



  const renderSingleData = () => {
    if (singleData) {
      return (
        <View>
          <Text>{singleData.name}</Text>
          <Image source={{}}/>
          {/* Render other properties of singleData as needed */}
        </View>
      );
    } else {
      return <Text>No data available</Text>;
    }
  };

  const _renderItem = ({item}) => {
    console.log("🚀 ~ Home ~ item:", item)
    return (
      
      <View style={styles.slide}>
       
       
        <TouchableOpacity
        
          onPress={() => navigation.navigate('Invitationreport')}>
         
          <Image source={{uri:item.image}} style={styles.images} />
        </TouchableOpacity>
        <View style={{flexDirection:'row',backgroundColor:'transparent'}}>
               <Text style={styles.title}>{item.name}</Text>
             <Text style={styles.text}>{item.eventDate}</Text>
            </View>
        <View style={{flexDirection:'column'}}>
          <Text style={styles.text2}>{item.latitude}</Text>
          <Text style={styles.text2}>{item.longitude}</Text>
          </View>
        <TouchableOpacity
          style={{
            height: '14%',
            width: '35%',
            backgroundColor: '#293170',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 120,
            borderTopLeftRadius: 14,
            borderBottomRightRadius: 14,
            //  marginBottom: 25,
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Draft</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <View style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={SplashStyl.ScrollViewTestHeight}>
        <View style={SplashStyl.Container}>
         
          <View
            style={{
              width: '99%',
              flexDirection: 'row',
              height: 50,
              backgroundColor: '#f2f2f4',
              padding: SW(10),
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <IconF
                size={SF(20)}
                name="left"
                style={{height: SH(30), marginLeft: 10, marginRight: 20}}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignItems: 'center',
                alignContent: 'center',
                fontWeight: '700',
                fontSize: SF(20),
                color: 'black',
              }}>
              Invitation Report
            </Text>
            <Egypto
              size={SF(20)}
              name="dots-three-vertical"
              style={{marginLeft: 'auto'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              height: 80,
              backgroundColor: 'white',
            }}>
            {/* Left side containing "Invitation Report" text */}

            <Text style={SplashStyl.invitationReportText}>
              Invitation Report
            </Text>
            {/* Right side containing dropdown */}
            <View
              style={{
                width: '35%',
                marginLeft: 110,
                height: 15,
                marginTop: 10,

                // backgroundColor: 'red',
              }}>
              <DropDownPicker
                items={[
                 
                  {label: 'Remainder', value: 'Remainder'},
                  {label: 'Invitation', value: 'Invitation'},
                ]}
                style={{
                  backgroundColor: '#293170',
                  borderTopLeftRadius: 28,
                  borderBottomRightRadius: 28,
                  borderWidth: 1,
                  borderColor: 'gray',
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                labelStyle={{
                  color: 'white',
                }}
                dropDownStyle={{
                  backgroundColor: '#293170',
                  borderTopLeftRadius: 28,
                  borderBottomRightRadius: 28,
                }}
                placeholderStyle={{
                  color: 'white', // Change placeholder color to white
                }}
              
                //dropDownStyle={SplashStyl.dropdownDropdownStyle}
                onChangeValue={(value) => {
                  console.log(value);
                  if(value === 'Invitation'){
                    handleSendInvites(id)
                  }
                }}
                setOpen={setIsOpen}
                open={isOpen}
                value={value}
                setValue={setValue}
                placeholder="Share"
                placeholderTextColor={'white'}
              />
            </View>
            {/* Display selected option in a separate column */}
            {selectedOption && (
              <View style={SplashStyl.selectedOptionContainer}>
                <Text>Selected Option:</Text>
                <Text>{selectedOption}</Text>
              </View>
            )}
          </View>

          {/* <View style={{flexDirection: 'row'}}>
            <Text style={SplashStyl.Inheadingtext}>Invitation Report</Text>
            {/* <Spacing space={SH(30)} /> */}
          {/* <View style={SplashStyl.IntextView}>
              <TouchableOpacity style={SplashStyl.Inbtnstyle}>
                <Text style={SplashStyl.btntext}>Send</Text>
              </TouchableOpacity>
            </View>
          </View> */}

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
              </View>
            </View>

            {/* box4 */}
            <View style={SplashStyl.insideboxview}>
              <Text style={SplashStyl.boxtext}>Scanned</Text>
              <View style={SplashStyl.imageView}>
                <Image source={images.scanned} style={SplashStyl.imagestyle} />
              </View>
            </View>
          </View>

          {/* ////////////////////box1end//////// */}

          {/* <Spacing space={SH(20)} /> */}

          {/* ////////////////boxrow1///////////////////// */}
          <View style={SplashStyl.RowView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={SplashStyl.insideboxview}>
                <Text style={SplashStyl.boxtext}>Waiting</Text>
                <View style={SplashStyl.imageView}>
                  <Image source={images.waitng} style={SplashStyl.imagestyle} />
                </View>
              </View>
            </View>
            {/* box2 */}
            <View style={SplashStyl.insideboxview}>
              <Text style={SplashStyl.boxtext}> Rejected</Text>
              <View style={SplashStyl.imageView}>
                <Image source={images.rejected} style={SplashStyl.imagestyle} />
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
              </View>
            </View>
          </View>
          <TouchableOpacity
              onPress={() => navigation.navigate('AddNewGuest',{eventId:id})}>
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
                style={{ height:40,width: 40, marginRight: 10}}
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
flexDirection:'column',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}>
                <View style={styles.slide}>
       
       
       <TouchableOpacity>
       
        
        
         <Image source={{uri:singleData?.image}} style={styles.images} />
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{color:'black',fontWeight:'600',fontSize:16}}>{singleData?.name}</Text>
         <Text style={{color:'black'}}>{singleData?.eventDate}</Text>
         
         </View>
       
{/* <Text>{singleData.name}</Text> */}
       </TouchableOpacity>
      
     </View>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    //flex: 1,
marginLeft:15,
    height: '70%',
    //alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#f2f2f4',
// backgroundColor:'transparent',
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color:'black',
    paddingHorizontal:16
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
});
export default Invitationreport;
