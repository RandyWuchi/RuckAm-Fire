import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import InputBox from '../components/InputBox';
import MessageBox from '../components/MessageBox';

const MessagesRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();

  //Fetch messages from backend
  const fetchMessages = async () => {};

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBox message={item} />}
        inverted
        keyExtractor={(item) => item.id}
      />
      <InputBox />
    </View>
  );
};

export default MessagesRoomScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
