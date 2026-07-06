import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import MonthGrid from '../components/MonthGrid';
import WeekHeader from '../components/WeekHeader';
import CalendarHeader from '../components/CalendarHeader';
import { COLORS } from '../constants/colors';
import dayjs from 'dayjs';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const flatListRef = useRef<FlatList<Date>>(null);
  const isResetting = useRef(false);
  const [months, setMonths] = useState([
    dayjs(currentDate).subtract(1, 'month').toDate(),
    currentDate,
    dayjs(currentDate).add(1, 'month').toDate(),
  ]);

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    // Ignore the scroll event caused by scrollToIndex()
    if (isResetting.current) {
      isResetting.current = false;
      return;
    }

    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);

    // Next month
    if (index === 2) {
      const newCurrent = dayjs(currentDate).add(1, 'month');

      setCurrentDate(newCurrent.toDate());

      setMonths([
        dayjs(newCurrent).subtract(1, 'month').toDate(),
        newCurrent.toDate(),
        dayjs(newCurrent).add(1, 'month').toDate(),
      ]);

      isResetting.current = true;

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({
          index: 1,
          animated: false,
        });
      });
    }

    // Previous month
    if (index === 0) {
      const newCurrent = dayjs(currentDate).subtract(1, 'month');

      setCurrentDate(newCurrent.toDate());

      setMonths([
        dayjs(newCurrent).subtract(1, 'month').toDate(),
        newCurrent.toDate(),
        dayjs(newCurrent).add(1, 'month').toDate(),
      ]);

      isResetting.current = true;

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({
          index: 1,
          animated: false,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <CalendarHeader currentDate={currentDate} />
      <WeekHeader />
      <FlatList
        ref={flatListRef}
        data={months}
        horizontal
        pagingEnabled
        initialScrollIndex={1}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toISOString()}
        renderItem={({ item }) => <MonthGrid currentDate={item} />}
        onMomentumScrollEnd={handleMomentumEnd}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
