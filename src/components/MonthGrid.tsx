import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getMonthDates } from '../utils/calendar';
import dayjs from 'dayjs';
import { COLORS } from '../constants/colors';
import { useCalendar } from '../context/CalendarContext';

const CELL_SIZE = `${100 / 6}%`;

type Props = {
  width: number;
  currentDate: Date;   
};

function MonthGrid({ currentDate, width }: Props) {
 const {selectedDate, setSelectedDate} = useCalendar(); 
  const dates = useMemo(() => {
    return getMonthDates(currentDate);
  }, [currentDate]);

  return (
    <View style={{ width: width, flex: 1 }}>
      <View style={styles.container}>
        {dates.map((date) => {
          const isToday = dayjs(date).isSame(new Date(), 'day');
          
          const isSelected = selectedDate 
            ? dayjs(date).isSame(selectedDate, 'day') 
            : false;

          return (
            <TouchableOpacity 
              key={date.toISOString()} 
              style={styles.cell}
              activeOpacity={0.7}
              onPress={() => setSelectedDate(date)} 
            >
              <View style={[
                styles.dateCircle, 
                isToday && styles.todayCircle,
                isSelected && styles.selectedCircle 
              ]}>
                <Text style={[
                  styles.text,
                  
                ]}>
                  {date.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
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
  cell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color : COLORS.textPrimary,
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
    backgroundColor : COLORS.primary 
  },
  selectedCircle: {
        borderRadius: 16,

    backgroundColor: COLORS.secondary, 
  },
});