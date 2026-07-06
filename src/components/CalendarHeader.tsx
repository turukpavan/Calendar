import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import { COLORS } from '../constants/colors';
import Icon from './Icon';

type Props = {
  currentDate: Date;
};
export default function CalendarHeader({ currentDate }: Props) {
  const month = dayjs(currentDate).format('MMMM');
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="Menu" color={COLORS.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {month.slice(0, 3)} {dayjs(currentDate).format('YYYY')}
      </Text>
      <TouchableOpacity>
        <Icon name="Search" color={COLORS.textPrimary} />
      </TouchableOpacity>
      <View style={styles.profile}>
        <Text style={styles.initial}>PT</Text>
      </View>
      <Text style={styles.currentDate}>{dayjs(currentDate).format('D')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  currentDate: {
    textAlign: 'center',
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.white,
    width: 25,
    height: 25,
    borderRadius: 4,
    textAlignVertical: 'center',
  },
  profile: {
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.white,
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    color: COLORS.textPrimary,
    fontSize: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
});
