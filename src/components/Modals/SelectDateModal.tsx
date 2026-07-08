import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';
import { useInfiniteCalendar } from '../../hooks/useINfiniteCalendar';
import InfiniteCalendar from '../InfiniteCalendar';
import WeekHeader from '../WeekHeader';
import dayjs from 'dayjs';
import { useCalendar } from '../../context/CalendarContext';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MODAL_WIDTH = SCREEN_WIDTH * 0.9;
type Props = {
    dateCategory : String;
 setTaskDate: (date: Date) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  visible: boolean;
  onClose: () => void;
  navigation: any;
};

const SelectDateModal = ({ visible, onClose,setTaskDate, setStartDate, setEndDate ,dateCategory }: Props) => {
  const { selectedDate } = useCalendar();
  const { months, handleMomentumEnd, flatListRef, currentDate } =
    useInfiniteCalendar();
    const targetDate = selectedDate || currentDate || new Date();
  const handleConform =()=>{
    if(dateCategory == 'taskDate'){

        setTaskDate(new Date(targetDate));
    }else if(dateCategory == 'startDate'){

        setStartDate(new Date(targetDate));
    }else{

        setEndDate(new Date(targetDate));
    }
    
    onClose();
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.container}>
          <Text style={styles.title}>Select Date</Text>
          <Text style={styles.date}>
            {selectedDate
              ? dayjs(selectedDate).format('MMM D, YYYY')
              : dayjs(currentDate).format('MMM D, YYYY')}
          </Text>
          <WeekHeader />
          <InfiniteCalendar
            width={MODAL_WIDTH}
            months={months}
            handleMomentumEnd={handleMomentumEnd}
            flatListRef={flatListRef}
          />
          <View style={styles.navigationButton}>
            <TouchableOpacity onPress={handleConform}>
              <Text style={styles.close}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.close}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectDateModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '90%',
    minHeight: 400,
    backgroundColor: COLORS.selectDateModal,
    borderRadius: 20,
    paddingVertical: 15,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  date: {
    color: COLORS.textPrimary,
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 20,
  },

  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },

  close: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  navigationButton: {
    flexDirection: 'row-reverse',
    gap: 30,
    paddingHorizontal: 20,
  },
});
