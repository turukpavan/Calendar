import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalendarScreen from '../screens/CalendarScreen';
import AddScheduleScreen from '../screens/AddScheduleScreen';
import { ROUTES } from '../constants/routes';
import { CalendarProvider } from '../context/CalendarContext';

export type RootStackParamList = {
  [ROUTES.CALENDAR]: undefined;
  [ROUTES.ADD_SCHEDULE]: {
    type: 'task' | 'event';
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <CalendarProvider>
    <Stack.Navigator
      initialRouteName={ROUTES.CALENDAR}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ROUTES.CALENDAR}
        component={CalendarScreen}
      />

      <Stack.Screen
        name={ROUTES.ADD_SCHEDULE}
        component={AddScheduleScreen}
      />
    </Stack.Navigator>
    </CalendarProvider>
  );
}