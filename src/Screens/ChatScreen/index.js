// import {View, Text, TouchableOpacity} from 'react-native';
// import React from 'react';
// import {useNavigation, useTheme} from '@react-navigation/native';
// // import {app, analytics} from '../../config/firebase';

// const ChatScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <View>
//       <TouchableOpacity onPress={navigation.navigate('LoginScreen')}>
//         <Text>ChatScreen</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ChatScreen;

import React, {useState, useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatScreen;
