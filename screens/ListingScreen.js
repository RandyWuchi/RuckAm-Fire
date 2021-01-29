import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Card from '../components/Card';
import routes from '../navigation/routes';

const ListingScreen = () => {
  const navigation = useNavigation();
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchListing = () => {};

  return (
    <View style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        onRefresh={fetchListing}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <View style={{ padding: 20 }}>
            <Card
              title={item.title}
              subTitle={'$' + item.price}
              image={item.images}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
