import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { createTables } from './src/database/migration';
import notifee from '@notifee/react-native'
import { createNotificationChannel } from './src/services/notificationService';

export default function App() {
  useEffect(() => {
  createTables();
   async function init() {
    await notifee.requestPermission();
    await createNotificationChannel();
  }

  init();
}, []);
  return (
    <SafeAreaProvider>
        <NavigationContainer>
           <AppNavigator/>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}