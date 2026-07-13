import React, { memo, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { getMonthDates } from '../utils/calendar';
import { Schedule } from '../database/scheduleRepository';
import { isHoliday } from '../services/holidayService';
import DayCell from './DayCell';
import { useCalendar } from '../context/CalendarContext';
dayjs.extend(isBetween);

type Props = {
  schedules?: Schedule[];
  width: number;
  currentDate: Date;
};

function MonthGrid({ currentDate, width, schedules }: Props) {
  const { selectedDate, setSelectedDate } = useCalendar();
  const dates = useMemo(() => getMonthDates(currentDate), [currentDate]);
 const handleDatePress = useCallback(
  (date: Date) => {
    if (selectedDate && dayjs(date).isSame(selectedDate, 'day')) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  },
  [selectedDate, setSelectedDate],
);

  return (
    <View style={{ width, flex: 1 }}>
      <View style={styles.container}>
        {dates.map(date => {
          const holiday = isHoliday(date);

          const schedulesForDay = (schedules ?? []).filter(schedule => {
            const current = dayjs(date);

            if (schedule.type === 'event') {
              return current.isBetween(
                dayjs(schedule.startDate),
                dayjs(schedule.endDate),
                'day',
                '[]',
              );
            }

            return current.isSame(dayjs(schedule.startDate), 'day');
          });

          return (
            <DayCell
              isSelected={
                selectedDate ? dayjs(date).isSame(selectedDate, 'day') : false
              }
              onPress={handleDatePress}
              key={date.toISOString()}
              date={date}
              holiday={holiday}
              schedulesForDay={schedulesForDay}
            />
          );
        })}
      </View>
    </View>
  );
}

export default memo(MonthGrid);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
