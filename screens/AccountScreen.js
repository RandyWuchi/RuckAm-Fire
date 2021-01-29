import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Icon from '../components/Icon';

import { ListItem, ListItemSeparator } from '../components/Lists';
import Screen from '../components/Screen';
import { FirebaseContext } from '../contexts/FirebaseContext';
import { UserContext } from '../contexts/UserContext';

const menuItems = [
  {
    title: 'My Listings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: '#DB3022',
    },
    route: 'MY_LISTINGS',
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: '#2AA952',
    },
    route: 'MESSAGES',
  },
];

const AccountScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const handleLogOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.username}
          subTitle={user.email}
          image={user.profilePhotoUrl}
          onPress={() => console.log('clicked profile')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        title='Log Out'
        IconComponent={<Icon name='logout' backgroundColor='#ffe66d' />}
        onPress={handleLogOut}
      />
      <View style={styles.brand}>
        <Text style={styles.brandText}>RuckAm</Text>
      </View>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginVertical: 20,
  },
  brand: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  brandText: {
    color: '#9B9B9B',
    fontWeight: '500',
  },
});
