import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { COLORS } from '../constants/colors';
import { Schedule } from '../database/scheduleRepository';

type Props = {
  date: Date;
  holiday: any;
  schedulesForDay: Schedule[];

  isSelected: boolean;

  onPress: (date: Date) => void;
};

function DayCell({
  date,
  holiday,
  schedulesForDay,
  isSelected,
  onPress,
}: Props) {
  const isToday = dayjs(date).isSame(new Date(), 'day');

  const handlePress = () => {
    onPress(date);
  };
console.log('DayCell render:', dayjs(date).format('DD-MM-YYYY'));  

  return (
    <TouchableOpacity
      style={styles.cell}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View
        style={[
          styles.dateCircle,
          isToday && styles.todayCircle,
          isSelected && styles.selectedCircle,
        ]}
      >
        <Text style={styles.text}>{date.getDate()}</Text>
      </View>

      <View style={styles.scheduleContainer}>
        {schedulesForDay.slice(0, 2).map(schedule => (
          <View
            key={schedule.id}
            style={[
              styles.scheduleBadge,
              schedule.type === 'event' ? styles.eventBadge : styles.taskBadge,
            ]}
          >
            <Text numberOfLines={1} style={styles.scheduleText}>
              {schedule.title}
            </Text>
          </View>
        ))}

        {schedulesForDay.length > 2 && (
          <Text style={styles.moreText}>+{schedulesForDay.length - 2}</Text>
        )}
      </View>

      <View style={styles.holidayContainer}>
        {holiday && (
          <Text numberOfLines={1} style={styles.holidayText}>
            {holiday[0].name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default memo(DayCell, (prevProps, nextProps) => {
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.holiday === nextProps.holiday &&
    prevProps.schedulesForDay.length ===
      nextProps.schedulesForDay.length
  );
});
const styles = StyleSheet.create({
  cell: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },

  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  todayCircle: {
    backgroundColor: COLORS.primary,
  },

  selectedCircle: {
    backgroundColor: COLORS.secondary,
  },

  scheduleContainer: {
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 4,
  },

  scheduleBadge: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginBottom: 2,
  },

  eventBadge: {
    backgroundColor: '#4285F4',
  },

  taskBadge: {
    backgroundColor: '#34A853',
  },

  scheduleText: {
    color: '#fff',
    fontSize: 10,
  },

  moreText: {
    color: COLORS.textPrimary,
    fontSize: 10,
    textAlign: 'center',
  },

  holidayContainer: {
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 2,
    alignItems: 'center',
  },

  holidayText: {
    color: '#ff6b6b',
    fontSize: 9,
    fontWeight: '500',
  },
});
