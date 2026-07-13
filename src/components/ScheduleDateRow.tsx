import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { COLORS } from '../constants/colors';

type DateCategory = 'taskDate' | 'startDate' | 'endDate';
type TimeCategory = 'task' | 'start' | 'end';

type Props = {
  label?: string;
  date: Date;
  allDay: boolean;
  dateCategory: DateCategory;
  timeCategory: TimeCategory;
  onDatePress: (category: DateCategory) => void;
  onTimePress: (category: TimeCategory) => void;
};

const ScheduleDateRow = ({
  label,
  date,
  allDay,
  dateCategory,
  timeCategory,
  onDatePress,
  onTimePress,
}: Props) => {
  return (
    <>
      {label && <Text style={styles.subtitle}>{label}</Text>}

      <View style={styles.timeDateContainer}>
        <Text
          style={styles.title}
          onPress={() => onDatePress(dateCategory)}
        >
          {date.toDateString()}
        </Text>

        {!allDay && (
          <Text
            style={styles.timeTxt}
            onPress={() => onTimePress(timeCategory)}
          >
            {dayjs(date).format('hh:mm A')}
          </Text>
        )}
      </View>
    </>
  );
};

export default React.memo(ScheduleDateRow);

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.textDisabled,
    marginTop: 4,
    fontSize: 14,
  },

  timeDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '500',
  },

  timeTxt: {
    color: COLORS.textPrimary,
    fontSize: 15,
  },
});