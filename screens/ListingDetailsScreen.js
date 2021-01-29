import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import ContactSellerForm from '../components/ContactSellerForm';
import { ListItem } from '../components/Lists';
import Text from '../components/Text';
import Colors from '../constants/Colors';

const ListingDetailsScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
      style={styles.container}
    >
      <ScrollView>
        <Image style={styles.image} source={listing.images} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>${listing.price}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={listing.user.imageUri}
              title={listing.user.name}
              subTitle='5 Listings'
            />
          </View>
          <ContactSellerForm listing={listing} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ListingDetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
  container: {
    backgroundColor: Colors.light.background,
  },
});
