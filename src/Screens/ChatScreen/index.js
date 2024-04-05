import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
  Avatar,
} from 'react-native-gifted-chat';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getFromLocalStorage} from '../../Services/Api';
import axios from 'axios';
import {SocketContext} from '../../socket';

const ChatDetailScreen = ({route}) => {
  const {chatItem} = route.params;
  console.log('🚀 ~ ChatDetailScreen ~ chatItem:', chatItem);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigation = useNavigation();
  const {socket} = useContext(SocketContext);

  const onNewMessage = newMessage => {
    console.log('🚀 ~ onNewMessage ~ newMessage:', newMessage);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, {
        _id: newMessage?.id?.toString(),
        text: newMessage.actionData,
        createdAt: new Date(),
        user: {_id: newMessage?.sentBy},
      }),
    );
  };

  useEffect(() => {
    if (chatItem && chatItem.invites && chatItem.events) {
      fetchChatMessages();
      // Listen to socket events for new messages
      socket.on('chat', onNewMessage);
    }
    return () => {
      // Clean up socket event listener when component unmounts
      socket.off('chat', onNewMessage);
    };
  }, [chatItem]);

  const fetchChatMessages = async () => {
    setLoading(true); // Set loading to true when fetching data
    const token = await getFromLocalStorage('@UserToken');
    try {
      const response = await axios.get(
        `https://backend.halla.sa/api/events/chats/messages/user/${chatItem.usersId}/event/${chatItem.eventId}/contact/${chatItem.invites.id}?order=ASC&page=1&take=10&filter=monthly`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('🚀 ~ fetchChatMessages ~ response:', response);
      const reversedMessages = response.data?.data?.reverse();
      console.log(
        '🚀 ~ fetchChatMessages ~ reversedMessages:',
        reversedMessages,
      );
      const formattedMessages = reversedMessages.map(message => ({
        _id: message?.id.toString(),
        text: message?.actionData,
        createdAt: new Date(message?.createdAt),
        user: {_id: message?.sentBy},
      }));
      console.log(
        '🚀 ~ formattedMessages ~ formattedMessages:',
        formattedMessages,
      );
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };

  const onSend = newMessages => {
    // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    const sms = {
      isRead: false,
      action: 'message',
      actionData: newMessages[0]?.text,
      actionType: 'text',
      actionUser: chatItem.usersId,
      contact: chatItem.invites.id,
      event: chatItem.events.id,
      sentBy: chatItem.usersId,
    };
    socket.emit('chat', sms);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={23} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{chatItem?.invites?.name}</Text>
        <View style={{width: 24}} />
      </View>
      {loading ? ( // Show loading indicator while data is being fetched
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{_id: chatItem?.usersId}}
          renderAvatar={null}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
          renderSend={renderSend}
          alwaysShowSend
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 30,
  },
  backButton: {
    position: 'absolute',
    marginTop: 8,
    left: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  composerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const renderBubble = props => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: {
        backgroundColor: '#FFFFFF',
      },
      right: {
        backgroundColor: '#293170',
      },
    }}
    textStyle={{
      left: {
        color: '#293170',
      },
      right: {
        color: '#fff',
      },
    }}
  />
);

const renderInputToolbar = props => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: 'transparent',
      borderTopWidth: 0,
    }}
  />
);

const renderComposer = props => (
  <View style={styles.composerContainer}>
    <Composer
      {...props}
      textInputStyle={{
        color: 'black',
        flex: 1,
      }}
    />
    <Send {...props}>
      <FontAwesome
        name="send"
        size={23}
        color="black"
        style={{marginBottom: 10, marginRight: 4}}
      />
    </Send>
  </View>
);

const renderSend = () => {
  return null;
};

export default ChatDetailScreen;
