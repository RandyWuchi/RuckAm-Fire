import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ListItemSeparator, MessageListItem } from '../components/Lists';

const MessagesScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <MessageListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
