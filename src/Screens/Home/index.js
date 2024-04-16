import React, { useState, useMemo, useEffect } from 'react';
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
import { Spacing, Search, Button } from '../../Components';
import Style from '../../styles/CommonStyle/Style';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  getEventCategorywithid,
  getProfileWithUserId,
  getEventWithUserId,
} from '../../Services/ApiList';
import moment from 'moment';
import MessagingStyles from '../../styles/CommonStyle/MessagingStyles';
import IconG from 'react-native-vector-icons/Ionicons';
import {
  useNavigation,
  useTheme,
  useFocusEffect,
} from '@react-navigation/native';
import images from '../../index';
import { getFromLocalStorage } from '../../Services/Api';
import { useTranslation } from 'react-i18next';
import { SF, SW, SH, Colors } from '../../utils';
import BirthdayCard from '../../Components/commonComponents/BirthdayCard';
import notifee from '@notifee/react-native';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([handleGetByUserId(), handleGetdataByUserId()]);
    setRefreshing(false);
  };

  const handleGetByUserId = async () => {
    try {
      const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await getEventCategorywithid(Gettingtoken.id);
      setCard(response.data.allEvents);
      setUpcoming(response.data.upcoming);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleGetdataByUserId = async () => {
    try {
      const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await getEventWithUserId(Gettingtoken.id, 1, take);
      setEvents(response.data.data);
      setCurrentPage(response?.data?.meta?.page);
      setPageCount(response?.data?.meta?.pageCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getProfileWithUserId(Gettingtoken.id);
        setWallet(response.data.wallet);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchData();
    handleGetByUserId();
    handleGetdataByUserId();
  }, []);

  const loadMoreData = async () => {
    if (!loadingMore && currentPage < pageCount) {
      setLoadingMore(true);
      try {
        const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getEventWithUserId(Gettingtoken.id, currentPage + 1, take);
        setEvents(prevEvents => [...prevEvents, ...response.data.data]);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.error('Error loading more events:', error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  const handleUpcomingEventsPress = () => {
    navigation.navigate('Upcommingevents', { upcoming: upcoming });
  };

  const _renderItem = ({ item }) => {
    if (loading) {
      return <ActivityIndicator size="large" color="#293170" />;
    }
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => {
            console.log('🚀 ~ Home ~ test:', item.id);
            navigation.navigate('Invitationreport', { id: item.id });
          }}>
          <View style={styles.textrow}>
            <Text style={styles.textStyle}>{item.name}</Text>
            <Text style={styles.textStyleLight}>
              {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </View>

          <Image source={{ uri: item.image }} style={styles.images} />

          <Text style={styles.drafttext}>All Events</Text>
        </TouchableOpacity>
      </View>
    );
  };




  ///////////////////////////////////////
  const DisplayingHome = () => {
    // onDisplayNotification();
    navigation.navigate('CreateEvent', {
      latitude: null,
      longitude: null,
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 5,
        elevation: 2,
        height: 120,
        borderRadius: 2,
      }}>
      <Image
        source={{ uri: item.image }}
        style={{ height: 110, marginTop: 6, width: 180, borderRadius: 5 }}
      />
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            fontWeight: '500',
            marginTop: 30,
          }}>
          {item.name}
        </Text>
        <Text style={{ color: 'black', fontSize: 12, fontWeight: '500' }}>
          {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
      </View>

      {/* Render other event details as needed */}
    </View>
  );


  return (
    <View style={styles.mainview}>
      {/* <Search /> */}
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
        <View style={{ marginBottom: 120 }}>
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
            <View style={{ flex: 1 }}>
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

              <View style={styles.firstView}>
                <View style={styles.appintroView}>
                  <AppIntroSlider
                    renderItem={_renderItem}
                    data={card}
                    showNextButton={false} // Set showNextButton to false
                    showDoneButton={false}
                  />
                </View>
              </View>

              {/* <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.ScrollViewTestHeight}> */}
              <View style={styles.cardView}>
                <BirthdayCard
                  title="Upcoming Events"
                  imageUrl={images.cardOneImg}
                  onPress={() => handleUpcomingEventsPress()}
                  data={upcoming}
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
              {/* <Spacing space={SH(150)} /> */}
            </View>
            {/* Pagination list of data */}
            <View
              style={{ flex: 1, backgroundColor: 'white', marginBottom: 60 }}>
              <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={
                  currentPage < pageCount ? (
                    <TouchableOpacity
                      onPress={loadMoreData}
                      style={styles.scanstyle}>
                      {loadingMore ? <ActivityIndicator color={'#fff'} /> : <Text style={styles.scanText}>Load more </Text>}
                    </TouchableOpacity>
                  ) : null
                }
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
