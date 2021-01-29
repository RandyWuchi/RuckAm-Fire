import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FirebaseProvider } from './contexts/FirebaseContext';
import { UserProvider } from './contexts/UserContext';

import Navigation from './navigation/index';

export default function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <SafeAreaProvider>
          <StatusBar style='auto' />
          <Navigation />
        </SafeAreaProvider>
      </UserProvider>
    </FirebaseProvider>
  );
}
