import React, { memo, useCallback } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import MonthGrid from './MonthGrid';


type Props = {
    width : number;
  months: Date[];
  flatListRef: React.RefObject<FlatList<Date> | null>;
  handleMomentumEnd: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
};

function InfiniteCalendar({
    width,
  months,
  flatListRef,
  handleMomentumEnd,
}: Props) {
  const renderItem = useCallback(
    ({ item }: { item: Date }) => (
      <MonthGrid  currentDate={item} width={width} />
    ),
    [width],
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
      windowSize={3}
      maxToRenderPerBatch={3}
      initialNumToRender={3}
    />
  );
}

export default memo(InfiniteCalendar);