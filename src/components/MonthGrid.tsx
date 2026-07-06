import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { getMonthDates } from '../utils/calendar';
import dayjs from 'dayjs';
import { COLORS } from '../constants/colors';

const CELL_SIZE = `${100/5}%`;
const SCREEN_WIDTH = Dimensions.get('window').width;
type Props = {
  currentDate : Date
}

export default function MonthGrid({currentDate}:Props) {
  const dates = getMonthDates(currentDate);
  console.log(dates);
  

  return (
  <View style={styles.page}>
    <View style={styles.container}>
      {dates.map((date) => {
        const isToday = dayjs(date).isSame(new Date(),'day')
        const isCurrentMonth = dayjs(date).month === dayjs(currentDate).month
        return(
        <View key={date.toISOString()} style={styles.cell}>
          <View style={[styles.dateCircle, isToday && styles.todayCircle]}>
          <Text style={[styles.text,{color : isToday ? COLORS.textPrimary :isCurrentMonth ? COLORS.textPrimary: COLORS.textDisabled}]}>
            {date.getDate()}
          </Text>
          </View>
        </View>
      )})}
    </View>
    </View>
  
  );
}

const styles = StyleSheet.create({
  page: {
  width: SCREEN_WIDTH,
},
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
    padding: 6,
  },

  text: {
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  dateCircle : {
     width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  },
  todayCircle: {
  backgroundColor: COLORS.primary,
},
});