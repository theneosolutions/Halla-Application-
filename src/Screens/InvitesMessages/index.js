import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {getEventUserChat} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';

const InvitesMessages = ({route}) => {
  const {eventId} = route.params;

  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState('');
  useEffect(() => {
    handleDetailInvitesInfo();
  }, []);
  const handleDetailInvitesInfo = async listValue => {
    try {
      const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
      console.log('🚀 ~ handleDetailInvitesInfo ~ userInfo:', userInfo);
      const response = await getEventUserChat(userInfo.id, eventId);
      console.log(
        '🚀 ~ handleDetailInvitesInfo ~ response:=====',
        response?.data,
      );
      setMessages(response?.data);
      //   setInvitesDetail(response?.data?.data);
      //  console.log('response?.data?.data', intvitesDetail);
    } catch (error) {
      console.log('Error sending invites:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderView}>
        <Text style={styles.textStyle}>{item.name}</Text>
        <Text
          style={{
            marginLeft: 'auto',
            marginBottom: 2,
            color: 'black',
            fontWeight: '500',
            fontSize: 12,
          }}>
          {item.status}
        </Text>
        <Text style={styles.textStyle}>
          {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search By Conversation"
          placeholderTextColor="#000"
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    width: '90%',
    margin: 5,
    marginLeft: 20,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    color: 'black',
    transform: [{translateY: -12}],
  },
  searchInput: {
    flex: 1,
    height: 50, // Increased height for search input
    paddingHorizontal: 15, // Increased paddingHorizontal for search input
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: 'black',
    marginRight: 0,
    borderWidth: 1,
    borderColor: '#BD9956', // Added marginRight for search input
  },
  renderView: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 5,
    flexDirection: 'column',
  },
  textStyle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default InvitesMessages;
