import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CalendarScreen from './src/screens/CalendarScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CalendarScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}