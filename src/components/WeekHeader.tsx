import { View, Text, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { COLORS } from '../constants/colors';
import dayjs from 'dayjs';

function WeekHeader() {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const activeDay = dayjs().day();

  return (
    <View style={styles.container}>
      {weekDays.map((day, idx) => (
        <Text key={idx+1} style={[styles.day, activeDay === idx && styles.activeDay]}>
          {day}
        </Text>
      ))}
    </View>
  );
}

export default memo(WeekHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 8,
  },
  day: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.weekDay,
    fontWeight: '500',
    fontSize: 14,
  },
  activeDay: {
    color: COLORS.primary,
    fontWeight: '900',
  },
});
