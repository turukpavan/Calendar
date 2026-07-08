import {
    Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import WeekHeader from '../components/WeekHeader';
import CalendarHeader from '../components/CalendarHeader';
import { COLORS } from '../constants/colors';
import { useInfiniteCalendar } from '../hooks/useINfiniteCalendar';
import { useState } from 'react';
import Icon from '../components/Icon';
import AddEventModal from '../components/Modals/AddEventModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfiniteCalendar from '../components/InfiniteCalendar';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default function CalendarScreen({ navigation }: any) {
  const [showModal, setShowModal] = useState(false);
  const { months, handleMomentumEnd, flatListRef, currentDate } =
    useInfiniteCalendar();
  

  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader currentDate={currentDate} />
      <WeekHeader />
        <InfiniteCalendar width={SCREEN_WIDTH} months={months} flatListRef={flatListRef} handleMomentumEnd={handleMomentumEnd}/>
      <TouchableOpacity
        style={styles.addEvent}
        activeOpacity={0.8}
        onPress={() => setShowModal(true)}
      >
        <Icon name="Plus" color={COLORS.textPrimary} />
      </TouchableOpacity>
      <AddEventModal
        navigation={navigation}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  addEvent: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: COLORS.eventIconBackground,
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  absoluteView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000a4',
  },
});
