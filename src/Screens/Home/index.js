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
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Spacing, Search, Button} from '../../Components';
import Style from '../../styles/CommonStyle/Style';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import AppIntroSlider from 'react-native-app-intro-slider';
import {getEventCategorywithid} from '../../Services/ApiList';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import IconG from 'react-native-vector-icons/Ionicons';
import {
  useNavigation,
  useTheme,
  useFocusEffect,
} from '@react-navigation/native';
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
  const [card, setCard] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  ////////////get api by userid//////////////

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch data again
    handleGetByUserId();
    setRefreshing(false);
  };
  const handleGetByUserId = async () => {
    try {
      const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await getEventCategorywithid(Gettingtoken.id);
      console.log('response---------------+++', response?.data);
      console.log('response?.data?.upcoming======', response?.data?.upcoming); // Pass user ID if requitransparent
      console.log('Events:.....======______====', response?.data?.drafts);
      setCard(response?.data?.allEvents);
      setUpcomming(response?.data?.upcoming);
      console.log('data========', response?.data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetByUserId();
  }, []);
  const {Colors} = useTheme();
  const [showRealApp, setShowRealApp] = useState(false);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Rainy Days'],
  };

  const handleUpcomingEventsPress = () => {
    navigation.navigate('Upcommingevents', {upcoming: upcomming});
  };
  console.log('upcomming', upcomming);

  const _renderItem = ({item}) => {
    if (loading) {
      return <ActivityIndicator size="large" color="#293170" />;
    }
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => {
            console.log('🚀 ~ Home ~ test:', item.id);
            navigation.navigate('Invitationreport', {id: item.id});
          }}>
          <View style={styles.textrow}>
            <Text style={styles.textStyle}>{item.name}</Text>
            <Text style={styles.textStyleLight}>{item.createdAt}</Text>
          </View>

          <Image source={{uri: item.image}} style={styles.images} />

          <Text style={styles.drafttext}>All Events</Text>
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
  // const slides = [
  //   {
  //     key: 1,
  //     title: 'Title 1',
  //     text: 'Birthday Party.',
  //     image: require('../../images/wallpaper1.png'),
  //     backgroundColor: '#59b2ab',
  //     image2: require('../../images/icon4.png'),
  //     image3: require('../../images/icon4.png'),
  //     image4: require('../../images/iconthree.png'),
  //     image5: require('../../images/Invitaciones.png'),
  //   },
  //   {
  //     key: 2,
  //     title: 'Title 2',
  //     text: 'Other cool stuff',
  //     image: require('../../images/wallpaper1.png'),
  //     backgroundColor: '#febe29',
  //     image2: require('../../images/icon4.png'),
  //     image3: require('../../images/icon4.png'),
  //     image4: require('../../images/iconthree.png'),
  //     image5: require('../../images/Invitaciones.png'),
  //   },
  //   {
  //     key: 3,
  //     title: 'Rocket guy',
  //     text: "I'm already out of descriptions",
  //     image: require('../../images/wallpaper1.png'),
  //     backgroundColor: '#22bcb5',
  //     image2: require('../../images/icon4.png'),
  //     image3: require('../../images/icon4.png'),
  //     image4: require('../../images/iconthree.png'),
  //     image5: require('../../images/Invitaciones.png'),
  //   },
  // ];

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
  // const onDisplayNotification = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       const permissionStatus = await notifee.requestPermission();
  //       // console.log('first', permissionStatus);
  //       // if (permissionStatus !== 'granted') {
  //       //   Alert.alert('Permission Requitransparent', 'Please allow notifications');
  //       //   return;
  //       // }
  //     }
  //     // console.log('first', permissionStatus);
  //     const channelId = await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default Channel',
  //     });

  //     await notifee.displayNotification({
  //       title: 'welcome to Home screen ',
  //       body: 'you have successfully login to halla app ',
  //       android: {
  //         channelId,
  //         // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //         // pressAction is needed if you want the notification to open the app when pressed
  //         pressAction: {
  //           id: 'default',
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error displaying notification:', error);
  //   }
  // };

  ///////////////////////////////////////
  const DisplayingHome = () => {
    // onDisplayNotification();
    navigation.navigate('CreateEvent', {
      latitude: null,
      longitude: null,
    });
  };

  return (
    <View style={styles.mainview}>
      <Search />
      <View style={HomeTabStyle.Container}>
        <View style={{marginBottom: 120}}>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{
              paddingVertical: 5,
              overflow: 'hidden',
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }>
            <View style={{flex: 1}}>
              <Spacing space={SH(10)} />

              <View style={styles.maincontainer}>
                <View>
                  <Text style={styles.availablestyle}>Available Balance</Text>
                  <Text style={styles.invitationstyle}>5 Invitation</Text>
                </View>

                <View style={styles.topbtnview} onPress={DisplayingHome}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('TopUp')}>
                    <Text style={HomeTabStyle.topstyle}>Top Up</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View style={styles.firstView}>
                  {/* {card.length == 0 ? (
                    <SkeletonPlaceholder>
                      <SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item
                          width={'100%'}
                          height={20}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          marginTop={14}
                          width={'100%'}
                          height={47}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          width={'100%'}
                          height={20}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          marginTop={14}
                          width={'100%'}
                          height={47}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          width={'100%'}
                          height={20}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          marginTop={14}
                          width={'100%'}
                          height={47}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          width={'100%'}
                          height={20}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          marginTop={14}
                          width={'100%'}
                          height={47}
                          borderRadius={4}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                  ) : ( */}
                  <View style={styles.appintroView}>
                    <AppIntroSlider
                      renderItem={_renderItem}
                      data={card}
                      showNextButton={false} // Set showNextButton to false
                      showDoneButton={false}
                    />
                  </View>
                  {/* )} */}
                </View>

                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.ScrollViewTestHeight}>
                  <View style={styles.cardView}>
                    <BirthdayCard
                      title="Upcoming Events"
                      imageUrl={images.cardOneImg}
                      onPress={() => handleUpcomingEventsPress()}
                      data={upcomming}
                    />

                    <BirthdayCard
                      title="Attended Events"
                      imageUrl={images.CardTwoimg}
                      onPress={() => {
                        navigation.navigate('Attendedevents');
                      }}
                    />
                  </View>

                  <View style={styles.cardView}>
                    <BirthdayCard
                      title="Missed Events"
                      imageUrl={images.CardThreeImg}
                      onPress={() => {
                        navigation.navigate('MissedEvent');
                      }}
                    />
                    <BirthdayCard
                      title="New Events"
                      imageUrl={images.cardFourimg}
                      onPress={() => {
                        navigation.navigate('NewEvents');
                      }}
                    />
                  </View>
                  <Spacing space={SH(150)} />
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
