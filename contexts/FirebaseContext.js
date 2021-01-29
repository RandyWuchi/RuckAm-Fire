import React, { createContext } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import config from '../config/firebase';

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },

  createUser: async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl = 'default';

      await db.collection('users').doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl,
      });

      if (user.profilePhoto) {
        profilePhotoUrl = await Firebase.upLoadImage(user.profilePhoto);
      }

      delete user.password;

      return { ...user, profilePhotoUrl, uid };
    } catch (error) {
      console.log('Error @createUser:', error.message);
    }
  },

  createListing: async (listing) => {
    try {
      const images = listing.images;
      let imagesUrl = [];
      imagesUrl = await Promise.all(
        images.map((image) => Firebase.upLoadListingImage(image))
      );

      const uid = Firebase.getCurrentUser().uid;

      const userInfo = await Firebase.getUserInfo(uid);

      await db.collection('listings').doc().set({
        title: listing.title,
        price: listing.price,
        description: listing.description,
        category: listing.category,
        images: imagesUrl,
        username: userInfo.username,
        email: userInfo.email,
        profilePhotoUrl: userInfo.profilePhotoUrl,
      });
    } catch (error) {
      console.log('Error @createListing:', error);
    }
  },

  upLoadImage: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const photo = await Firebase.getBlob(uri);

      const imageRef = firebase.storage().ref('profilePhotos').child(uid);
      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      await db.collection('users').doc(uid).update({
        profilePhotoUrl: url,
      });

      return url;
    } catch (error) {
      console.log('Error @upLoadImage:', error);
    }
  },

  upLoadListingImage: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;
    try {
      const photo = await Firebase.getBlob(uri);

      const imageRef = firebase.storage().ref('listingPhotos').child(uid);
      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      return url;
    } catch (error) {
      console.log('Error @upLoadListingImage:', error);
    }
  },

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError('Network request failed'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection('users').doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log('Error @getUserInfo:', error);
    }
  },

  logOut: async () => {
    try {
      await firebase.auth().signOut();

      return true;
    } catch (error) {
      console.log('Error @logOut:', error);
    }

    return false;
  },

  logIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
};

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
