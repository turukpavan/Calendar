import React, { memo, useCallback } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import MonthGrid from './MonthGrid';
import { Schedule } from '../database/scheduleRepository';


type Props = {
 
  schedules?: Schedule[];
  width: number;
  months: Date[];
  flatListRef: React.RefObject<FlatList<Date> | null>;

  selectedDate?: Date | null;

  setSelectedDate?: React.Dispatch<
    React.SetStateAction<Date | null>
  >;

  handleMomentumEnd: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
};

function InfiniteCalendar({
 
  schedules,
    width,
  months,
  flatListRef,
  handleMomentumEnd,
}: Props) {
  const renderItem = useCallback(
    ({ item }: { item: Date }) => (
      <MonthGrid schedules={schedules}  currentDate={item} width={width} />
    ),
    [width,schedules],
  );

  const keyExtractor = useCallback(
    (item: Date) => item.toISOString(),
    [],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  return (
    <FlatList
      ref={flatListRef}
      data={months}
      horizontal
      pagingEnabled
      initialScrollIndex={1}
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onMomentumScrollEnd={handleMomentumEnd}
      getItemLayout={getItemLayout}
      bounces={false}
      overScrollMode="never"
      removeClippedSubviews
      windowSize={2}
      maxToRenderPerBatch={2}
      initialNumToRender={1}
    />
  );
}

export default memo(InfiniteCalendar);