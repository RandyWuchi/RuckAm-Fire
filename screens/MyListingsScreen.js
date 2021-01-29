import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ProductCard from '../components/ProductCard';
import { UserContext } from '../contexts/UserContext';

const MyListingsScreen = () => {
  const [myListings, setMyListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [user] = useContext(UserContext);

  const fetchMyListings = () => {};

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        data={myListings}
        onRefresh={fetchMyListings}
        refreshing={refreshing}
        keyExtractor={(myListing) => myListing.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cards}>
            <ProductCard
              title={item.title}
              subTitle={'$' + item.price}
              image={item.images}
              onPress={() => console.log('Touched', item)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default MyListingsScreen;

const styles = StyleSheet.create({
  cards: {
    padding: 10,
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
