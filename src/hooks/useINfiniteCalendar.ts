import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
const SCREEN_WIDTH = Dimensions.get('window').width;

export  const useInfiniteCalendar = ()=>{
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const flatListRef = useRef<FlatList<Date>>(null);
  const isResetting = useRef(false);
  const [months, setMonths] = useState([
    dayjs(currentDate).subtract(1, 'month',).toDate(),
    currentDate,
    dayjs(currentDate).add(1, 'month').toDate(),
  ]);
  

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (isResetting.current) {
      isResetting.current = false;
      return;
    }

    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);

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

  return {months, handleMomentumEnd, flatListRef, currentDate }

}