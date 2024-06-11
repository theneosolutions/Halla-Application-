import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from 'react-native';
import moment from 'moment';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import images from '../../index';
import {getFromLocalStorage} from '../../Services/Api';
import {useTranslation} from 'react-i18next';
import {SF, SW, SH, Colors} from '../../utils';
import BirthdayCard from '../../Components/commonComponents/BirthdayCard';
import {
  getEventCategorywithid,
  getProfileWithUserId,
  getEventBySearch,
  getEventCategoryByUserId,
} from '../../Services/ApiList';
import {Spacing} from '../../Components';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Snackbar from 'react-native-snackbar';
const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [wallet, setWallet] = useState('');
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [take, setTake] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCard, setSelectedCard] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0); // State to track back press count

  const onSearchHandler = (value) => {
    setSearch(value);
    setIsCancelVisible(false);
  }

  const searchEvents = async () => {
    setIsCancelVisible(true);
    try {
      setLoading(true);
      const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await getEventBySearch(search, userInfo.id);
      console.log('🚀 ~ searchEvents ~ response?.data?.data:', response);
      setEvents(response?.data?.data || []); // Set events data or empty array if undefined
      setLoading(false);
      // setIsCancelVisible(false);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const cancelSearchEvents = () => {
    setSearch('');
    handleGetEvents(selectedFilter)
    setIsCancelVisible(false);
  }

  //   useEffect(() => {
  //   if (search !== '') {
  //     searchEvents();
  //   } else {
  //     handleGetEvents(selectedFilter);
  //   }
  // }, [search]);

  const handleCardPress = filter => {
    setSelectedCard(filter);
  };
  useEffect(() => {
    setLoading(true);

    handleGetEvents(selectedFilter);
  }, [selectedFilter]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Cleanup the event listener when component unmounts
  }, [isFocused, backPressCount]);
  const handleBackPress = () => {
    if (!isFocused) return; // Don't handle back press if the screen is not focused

    // Your back press logic here
    if (backPressCount === 0) {
      setBackPressCount(1);
      Snackbar.show({
        text: 'Press again to exit',
        duration: Snackbar.LENGTH_SHORT,
        // Styling for Snackbar
        backgroundColor: '#293170', // Example background color
        textColor: 'white', // Example text color
        action: {
          text: 'OK',
          textColor: 'white',
          onPress: () => {
            // Do something when action button is pressed
          },
        },
      });
      setTimeout(() => setBackPressCount(0), 2000); // Reset back press count after 2 seconds
      return true; // Prevent default behavior (exit app)
    } else {
      // Perform app exit
      BackHandler.exitApp();
      return true;
    }
  };
  // useEffect(() => {
  //   searchEventsByUserid();
  // }, [search]);

  // const searchEventsByUserid = async () => {
  //   setLoading(true);
  //   const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
  //   const response = await getEventBySearch(search, userInfo.id);
  //   // setEvents(response?.data?.data);
  //   setLoading(false);
  //   console.log('response====searchEventsByUserid', response.data.data);
  // };

  const handleGetEvents = async filter => {
    try {
      const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await getEventCategoryByUserId(
        userInfo.id,
        currentPage,
        take,
        selectedFilter,
      );

      console.log('homeeeeee==============:', response?.data?.data);
      setEvents(response?.data?.data || []); // Set events data or empty array if undefined

      if (response?.data) {
        setCurrentPage(response?.data?.meta?.page);
        setPageCount(response?.data?.meta?.pageCount);
        setTake(response?.data?.meta?.take);
      }

      setLoading(false);
      setDataNotFound(response?.data?.data?.length === 0); // If data length is 0, show data not found message
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleBirthdayCardClick = async filter => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    setPageCount(1);
    setTake(10);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    cancelSearchEvents();
    // await Promise.all([
    //   // handleGetByUserId(),
    //   // handleGetdataByUserId()
    // ]);
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getProfileWithUserId(Gettingtoken.id);

        setUsername(response?.data?.username);
        setWallet(response.data.wallet);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchData();
  }, []);

  const loadMoreData = async () => {
    if (!loadingMore && currentPage < pageCount) {
      setLoadingMore(true);
      try {
        const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getEventCategoryByUserId(
          userInfo.id,
          currentPage + 1,
          take,
          selectedFilter,
        );

        console.log(
          '🚀 ~ handleGetEvents ~ response?.data?.data:',
          response?.data,
        );
        setEvents(prevEvents => [...prevEvents, ...response.data.data]); // Set events data or empty array if undefined

        if (response?.data) {
          setCurrentPage(response?.data?.meta?.page);
          setPageCount(response?.data?.meta?.pageCount);
          setTake(response?.data?.meta?.take);
        }

        setLoading(false);
        setDataNotFound(response?.data?.data?.length === 0); // If data length is 0, show data not found message
      } catch (error) {
        console.error('Error loading more events:', error);
      } finally {
        setLoadingMore(false);
      }
    }
  };





  const DisplayingHome = () => {
    navigation.navigate('CreateEvent', {
      latitude: null,
      longitude: null,
    });
  };
  const renderItem = ({item}) => {
    // Check if the item type is "draft", if yes, return null to render nothing
    if (item.type === 'draft') {
      return null;
    }

    let buttonText;
    if (selectedFilter === 'all') {
      buttonText = item.status;
      // buttonText = 'All Events';
    } else if (selectedFilter === 'new') {
      buttonText = 'New Events';
    } else if (selectedFilter === 'upcoming') {
      buttonText = 'Upcoming Events';
    } else if (selectedFilter === 'attended') {
      buttonText = 'Attended Events';
    } else {
      buttonText = 'Unknown';
    }

    return (
      <TouchableOpacity
        onPress={() => {
          console.log('🚀 ~ Home ~ test:', item.id);
          navigation.navigate('Invitationreport', {id: item.id});
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              marginLeft: 12,
              elevation: 2,
              shadowColor: '#BD9956',
              alignItems: 'center',
              height: 160,
              width: '94%',
              borderRadius: 3,
              borderWidth: 1,
              borderColor: '#BD9956',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: item.image}}
                style={{height: 110, marginTop: 1, width: 200, borderRadius: 5}}
              />
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 30,
                    margin: 3,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '400',
                    textAlign: 'center',
                    margin: 3,
                  }}>
                  {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '91%',
                borderTopWidth: 1,
                borderColor: '#293170',
                // paddingVertical: 1,
                // paddingHorizontal: 2,
              }}>
              {item.stats?.map(list => {
                return (
                  <View
                    style={{
                      width: '55%',
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      paddingVertical: 5,
                      marginRight: 15,
                      // paddingHorizontal: 2,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <MCIcon
                        size={SF(20)}
                        name="account-multiple-plus"
                        style={{...styles.boldstyle, marginRight: 3}}
                      />
                      <Text>{list.GuestNotInvited}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <MCIcon
                        size={SF(20)}
                        name="account-multiple-check-outline"
                        style={{...styles.boldstyle, marginRight: 3}}
                      />
                      <Text>{list.GuestInvited}</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <MCIcon
                        size={SF(20)}
                        name="account-multiple-remove"
                        style={{...styles.boldstyle, marginRight: 3}}
                      />
                      <Text>{list.GuestConfirmed}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <MCIcon
                        size={SF(20)}
                        name="android-messages"
                        style={{...styles.boldstyle, marginRight: 3}}
                      />
                      <Text>{list.GuestFailed}</Text>
                    </View>
                  </View>
                );
              })}

              {/* Render button text based on the selected category */}
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 100,
                  backgroundColor: '#293170',
                  color: 'white',
                  marginLeft: 'auto',
                  borderTopLeftRadius: SF(10),
                  borderBottomRightRadius: SF(10),
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontWeight: '400',
                    fontSize: SF(12),
                  }}>
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainview}>
      {/* <Text
        style={{
          fontSize: SF(13),
          color: 'black',
          marginLeft: SW(18),
          marginTop: SH(5),
          fontWeight: '500',
        }}>
        WELCOME {username}
      </Text> */}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search By Event Name"
          placeholderTextColor="#000"
          value={search}
          onChangeText={text => onSearchHandler(text)}
          returnKeyType="search"
        />
        {isCancelVisible ?
          <TouchableOpacity onPress={cancelSearchEvents} disabled={loading}>
            <Entypo
              name="circle-with-cross"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        :
          <TouchableOpacity onPress={searchEvents} disabled={loading}>
            <Feather
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        }

      </View>
      <View style={HomeTabStyle.Container}>
        <View style={{marginBottom: 120}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
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
                  <Text style={styles.invitationstyle}>{wallet}</Text>
                </View>

                <View style={styles.topbtnview} onPress={DisplayingHome}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('TopUp')}>
                    <Text style={styles.topstyle}>Top Up</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 1}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.cardRow}>
                    <BirthdayCard
                      title="All Events"
                      imageUrl={images.Newimgone}
                      onPress={() => handleBirthdayCardClick('all')}
                      isSelected={selectedCard === 'all'}
                    />
                    <BirthdayCard
                      title="New Events"
                      imageUrl={images.allimgtwo}
                      onPress={() => handleBirthdayCardClick('new')}
                      isSelected={selectedCard === 'new'}
                    />
                    <BirthdayCard
                      title="Upcoming Events"
                      imageUrl={images.Upcommingimgthree}
                      onPress={() => handleBirthdayCardClick('upcoming')}
                      isSelected={selectedCard === 'upcoming'}
                      data={upcoming}
                    />
                    <BirthdayCard
                      title="Attended Events"
                      imageUrl={images.Attendedimagefour}
                      onPress={() => handleBirthdayCardClick('attended')}
                      isSelected={selectedCard === 'attended'}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </ScrollView>

              {/* Show data not found message */}
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : events && events?.length < 1 ? (
                <TouchableOpacity
                  onPress={() => handleGetEvents(selectedFilter)} 
                  style={{...styles.scanstyle, width: '80%', marginTop:50}}>
                  <Image
                    style={styles.noRecordImageStyle}
                    source={images.emptyerror}
                  />
                  {/* <Text style={styles.scanText}>No Events found.Try again</Text> */}
                </TouchableOpacity>
              ) : (
                <FlatList
                  data={events}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  style={{height:'100%', backgroundColor: 'pink'}}
                  ListFooterComponent={
                    currentPage < pageCount ? (
                      <TouchableOpacity
                        onPress={loadMoreData}
                        style={styles.scanstyle}>
                        {loadingMore ? (
                          <ActivityIndicator color={'#fff'} />
                        ) : (
                          <Text style={styles.scanText}>Load more </Text>
                        )}
                      </TouchableOpacity>
                    ) : null
                  }
                />
              )}
        </View>
      </View>
    </View>
  );
};

export default Home;
