import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Card from '../components/Card';
import { db } from '../contexts/FirebaseContext';
import routes from '../navigation/routes';

const ListingScreen = () => {
  const navigation = useNavigation();
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchListing = () => {
    setRefreshing(true);
    db.collection('listings').onSnapshot((snapshot) =>
      setListings(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = fetchListing();

    return unsubscribe;
  }, []);

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
              title={item.data.title}
              subTitle={'$' + item.data.price}
              image={item.data.images[0]}
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
