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
import Ionicons from 'react-native-vector-icons/Ionicons';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Spacing, Search, Button} from '../../Components';
import Style from '../../styles/CommonStyle/Style';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  getEventCategorywithid,
  getProfileWithUserId,
  getEventWithUserId,
  getEventCategoryByUserId,
} from '../../Services/ApiList';
import moment from 'moment';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import IconG from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import Feather from 'react-native-vector-icons/Feather';
const Home = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [wallet, setWallet] = useState('');
  const [searchText, setSearchText] = useState('');
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [take, setTake] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false); // State for showing data not found message
  const [username, setUsername] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // State to store selected filter

  useEffect(() => {
    setLoading(true);
    handleGetEvents(selectedFilter); // Fetch events initially with 'ALL' filter
  }, [selectedFilter]);

  const handleGetEvents = async filter => {
    try {
      const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await getEventCategoryByUserId(
        userInfo.id,
        currentPage,
        take,
        selectedFilter,
      );

      console.log(
        '🚀 ~ handleGetEvents ~ response?.data?.data:',
        response?.data,
      );
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
    await Promise.all([
      // handleGetByUserId(),
      // handleGetdataByUserId()
    ]);
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getProfileWithUserId(Gettingtoken.id);
        // console.log('response++++++++++', response?.data?.username);
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
      buttonText = 'All Events';
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
                paddingVertical: 1,
                paddingHorizontal: 2,
              }}>
              <View
                style={{
                  width: 120,
                  flexDirection: 'row',
                  width: 60,
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  paddingHorizontal: 2,
                }}>
                <MCIcon
                  size={SF(20)}
                  name="account-multiple-plus"
                  style={{...styles.boldstyle, marginRight: 3}}
                />
                <MCIcon
                  size={SF(20)}
                  name="account-multiple-check-outline"
                  style={{...styles.boldstyle, marginRight: 3}}
                />
                <MCIcon
                  size={SF(20)}
                  name="account-multiple-remove"
                  style={{...styles.boldstyle, marginRight: 3}}
                />
                <MCIcon
                  size={SF(20)}
                  name="android-messages"
                  style={{...styles.boldstyle, marginRight: 3}}
                />
              </View>
              {/* Render button text based on the selected category */}
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 120,
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
          placeholder="Search"
          placeholderTextColor="#000"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
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
                    />
                    <BirthdayCard
                      title="New Events"
                      imageUrl={images.allimgtwo}
                      onPress={() => handleBirthdayCardClick('new')}
                    />
                    <BirthdayCard
                      title="Upcoming Events"
                      imageUrl={images.Upcommingimgthree}
                      onPress={() => handleBirthdayCardClick('upcoming')}
                      data={upcoming}
                    />
                    <BirthdayCard
                      title="Attende Events"
                      imageUrl={images.Attendedimagefour}
                      onPress={() => handleBirthdayCardClick('attended')}
                    />
                  </View>
                </ScrollView>
              </View>

              {/* Show data not found message */}
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : events && events?.length < 1 ? (
                <TouchableOpacity
                  onPress={() => handleGetEvents(selectedFilter)}>
                  {/* // style={{...styles.scanstyle, marginTop: 50}}> */}
                  <Image
                    style={{...styles.scanstyle, marginTop: 50}}
                    source={images.emptyerror}
                  />
                  {/* <Text style={styles.scanText}>No Events found.Try again</Text> */}
                </TouchableOpacity>
              ) : (
                <FlatList
                  data={events}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
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
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
