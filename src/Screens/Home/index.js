import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {Spacing, Search, Button} from '../../Components';
//import {RouteName} from '../../../routes';
import Login from '../../styles/CommonStyle/LoginScreenStyle';
import Style from '../../styles/CommonStyle/Style';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import AppIntroSlider from 'react-native-app-intro-slider';
import {getEventWithUserId} from '../../Services/ApiList';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import IconG from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme,useFocusEffect} from '@react-navigation/native';
import images from '../../index';
import {getFromLocalStorage} from '../../Services/Api';
import {useTranslation} from 'react-i18next';
import {SF, SW, SH, Colors} from '../../utils';
import BirthdayCard from '../../Components/commonComponents/BirthdayCard';
import notifee from '@notifee/react-native';
import styles from './styles';
const Home = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const[card,setCard]=useState('')
const [events, setEvents] = useState([]);

////////////get api by userid//////////////

const handleGetByUserId  = async () => {
  try {
    const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'))
    const response = await getEventWithUserId(Gettingtoken.id); // Pass user ID if requitransparent
    console.log('Events:.....==========', response);
    setCard(response.data.data);
    // console.log('data========',response.data)
    setLoading(false);
  } catch (error) {
    // console.log('Error fetching events:', error);
  }

}

useEffect(() => {

  handleGetByUserId(); // Fetch events when component mounts
}, []);







 
  const {Colors} = useTheme();
  const [showRealApp, setShowRealApp] = useState(false);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };

  const handleUpcomingEventsPress = () => {
    // Navigate to UpcomingEvents screen and pass the data
    navigation.navigate('Upcommingevents');
  };



  const _renderItem = ({item}) => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    console.log("🚀 ~ Home ~ item:", item)
    return (
      
      <View style={styles.slide}>
       
       
        <TouchableOpacity
        
        onPress={() => navigation.navigate('Invitationreport', { id: item.id })}>
         
          <Image source={{uri:item.image}} style={styles.images} />
        </TouchableOpacity>
        <View style={{flexDirection:'row',backgroundColor:'transparent',justifyContent:'spcae-between'}}>
               <Text style={styles.title}>{item.name}</Text>
             <Text style={{marginLeft:60,fontSize:12,fontWeight:'700',marginTop:2,color:'black'}}>{item.eventDate}</Text>
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
             marginBottom: 25,
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Draft</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const _renderItemM = ({item}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          source={item.image5}
          style={{
            // height: SH(200),
            width: SW(400),
            //borderRadius: 23,
            borderTopRightRadius: 40,
            //borderTopRightRadius: 12,
            marginLeft: 15,
            borderBottomRightRadius: 30,
            //borderBottomLeftradius: 20,
            marginTop: 0,
            marginBottom: 10,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const _onDone = () => {
    setShowRealApp(true);
  };
  const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Birthday Party.',
      image: require('../../images/wallpaper1.png'),
      backgroundColor: '#59b2ab',
      image2: require('../../images/icon4.png'),
      image3: require('../../images/icon4.png'),
      image4: require('../../images/iconthree.png'),
      image5: require('../../images/Invitaciones.png'),
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../../images/wallpaper1.png'),
      backgroundColor: '#febe29',
      image2: require('../../images/icon4.png'),
      image3: require('../../images/icon4.png'),
      image4: require('../../images/iconthree.png'),
      image5: require('../../images/Invitaciones.png'),
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: "I'm already out of descriptions",
      image: require('../../images/wallpaper1.png'),
      backgroundColor: '#22bcb5',
      image2: require('../../images/icon4.png'),
      image3: require('../../images/icon4.png'),
      image4: require('../../images/iconthree.png'),
      image5: require('../../images/Invitaciones.png'),
    },
  ];

  const [color, setcolor] = useState('Clean_Text');
  const [selectedDay, setSelectedDay] = useState(null);

  const renderRecentConversations = () => {
    return recentconversation.map(item => (
      <View key={item.id} style={HomeTabStyle.FImgViewHome}>
        <Image source={item.image} style={HomeTabStyle.flatlistimgHome} />
        <Text style={HomeTabStyle.textOnehome}>{item.texttwo}</Text>
      </View>
    ));
  };
  const onDisplayNotification = async () => {
    try {
      if (Platform.OS === 'android') {
        const permissionStatus = await notifee.requestPermission();
        // console.log('first', permissionStatus);
        // if (permissionStatus !== 'granted') {
        //   Alert.alert('Permission Requitransparent', 'Please allow notifications');
        //   return;
        // }
      }
      // console.log('first', permissionStatus);
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        title: 'welcome to Home screen ',
        body: 'you have successfully login to halla app ',
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  ///////////////////////////////////////
  const DisplayingHome = () => {
    onDisplayNotification();
    navigation.navigate('CreateEvent', {
      latitude: null,
      longitude: null,
    });
  };
  return (
    <View
      style={styles.container}>
      <Search />
      <View style={HomeTabStyle.Container}>
        <View style={{marginBottom: 60}}>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{
              paddingVertical: 5,
              // marginBottom: 200,
              overflow: 'hidden',
            }}>
            <View style={{flex: 1}}>
              <Spacing space={SH(10)} />

              <View style={HomeTabStyle.maincontainer}>
                <View>
                  <Text style={HomeTabStyle.availablestyle}>
                    Available Balance
                  </Text>
                  <Text style={HomeTabStyle.invitationstyle}>5 Invitation</Text>
                </View>

                <TouchableOpacity
                  style={HomeTabStyle.topbtnview}
                  onPress={DisplayingHome}>
                  {/* // onPress={() => navigation.navigate('CreateEvent')}> */}
                  <Text style={HomeTabStyle.topstyle}>Top</Text>
                </TouchableOpacity>
              </View>
              
              <View>
              
                 <View
                  style={{
                    height: '30%',
                    backgroundColor: 'transparent',
                    width: SW(350),
                    // marginBottom: 14,
                    marginTop: 14,
                    marginLeft:16,
                    borderTopLeftRadius: 30,
                    borderBottomRightRadius: 30,
                  }}> 
                     {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      ) : (
        <View style={{ height: '30%', backgroundColor: 'transparent', width: SW(350), marginTop: 14, marginLeft: 16, borderTopLeftRadius: 30, borderBottomRightRadius: 30 }}>
          <AppIntroSlider
            renderItem={_renderItem}
            data={card}
          />
        </View>
      )}

                 </View>
              
               
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={Style.ScrollViewTestHeight}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      margin: SF(5),
                    }}>
                    <BirthdayCard
                      title="Upcoming Events"
                      // text="Custom Text"
                      imageUrl={images.wallpaper} // Provide the imageUrl as an
                      // iconName="activity"
                      onPress={handleUpcomingEventsPress}
                    />

                    <BirthdayCard
                      title="Attended Events"
                      // text="Custom Text"
                      imageUrl={images.wallpaper2} // Provide the imageUrl as an
                      // iconName="activity"
                      onPress={() => {
                        navigation.navigate('Attendedevents');
                        // Handle press event
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <BirthdayCard
                      title="Missed Events"
                      // text="Custom Text"
                      imageUrl={images.wallpaper3} // Provide the imageUrl as an
                      // iconName="activity"
                      onPress={() => {
                        navigation.navigate('MissedEvent');
                        // Handle press event
                      }}
                    />
                    <BirthdayCard
                      title="New Events"
                      // text="Custom Text"
                      imageUrl={images.cardone} // Provide the imageUrl as an
                      // iconName="activity"
                      onPress={() => {
                        navigation.navigate('NewEvents');
                        // Handle press event
                      }}
                    />
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={{
                    height: '5%',
                    width: '50%',
                    backgroundColor: '#293170',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 95,
                    borderTopLeftRadius: 14,
                    borderBottomRightRadius: 14,
                  }}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    Top Picks
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: '22%',
                // backgroundColor: '#f2f2f4',
                width: SW(340),
                margin: 15,
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
                overflow: 'hidden',
              }}>
              <AppIntroSlider
                renderItem={_renderItemM}
                data={slides}
                onDone={_onDone}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Home;
