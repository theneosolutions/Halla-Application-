import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput,TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { getFromLocalStorage } from '../../Services/Api';
import { useNavigation } from '@react-navigation/native';

const ChatListingScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
    const token = await getFromLocalStorage('@UserToken');
    try {
      const response = await axios.get(`https://backend.halla.sa/api/events/chats/user/${userInfo.id}?order=DESC&page=1&take=100&filter=monthly`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ fetchData ~ response.data:", response.data)
      setChatData([...response?.data?.data]);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // useEffect(() => {
  //   if (chatData.length === 0) {
  //     fetchData();
  //   }
  // }, [chatData]);

  // Dummy data for chat list
  const chatListData = chatData.length > 0 ? chatData : null;

  const navigateToChatDetail = (chatItem) => {
    navigation.navigate('ChatScreen', { chatItem });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToChatDetail(item)}>
      <View style={[styles.chatItem, { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 8 }]}>
        <Text style={styles.avatar}>{item?.invites?.name.charAt(0)}</Text>
        <View style={styles.chatInfo}>
          <Text style={styles.username}>{item?.invites?.name}</Text>
          {0 > 0 && (
            <Text style={styles.unreadCount}>{item.unreadMessages}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#000"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <Feather name="search" size={24} color="black" style={styles.searchIcon} />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : chatListData ? (
        <FlatList
          data={chatListData}
          renderItem={renderChatItem}
          keyExtractor={item => item?.invites?.id.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No chats available yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30, // Increased paddingTop for header
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28, // Increased fontSize for header
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50, // Increased height for search input
    paddingHorizontal: 15, // Increased paddingHorizontal for search input
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: 'black',
    marginRight: 0, // Added marginRight for search input
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    textAlign: 'center',
    lineHeight: 50,
    marginRight: 15,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    color: 'black',
  },
  unreadCount: {
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
  },
});

export default ChatListingScreen;
