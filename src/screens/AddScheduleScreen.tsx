import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from 'react-native';

import Icon from '../components/Icon';
import { COLORS } from '../constants/colors';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/AppNavigator';
import { ROUTES } from '../constants/routes';
import SelectDateModal from '../components/Modals/SelectDateModal';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.ADD_SCHEDULE
>;
export default function AddScheduleScreen({ navigation, route }: Props) {
  const [showModal, setShowModal] = useState(false);
  const isTask = route.params?.type === 'task';

    const [dateCategory ,setDateCategory] = useState('')
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allDay, setAllDay] = useState(false);

  const [taskDate, setTaskDate] = useState(new Date());

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.CALENDAR)}
          >
            <Icon name="X" color={COLORS.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={`Add ${isTask ? 'Task' : 'Event'} Title`}
            placeholderTextColor={COLORS.textDisabled}
            style={styles.titleInput}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon name="Calendar1" color={COLORS.textPrimary} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{isTask ? 'Task' : 'Event'}</Text>

            <Text style={styles.subtitle}>email</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon name="Menu" color={COLORS.textPrimary} />
          </View>

          <View style={styles.content}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add Description"
              placeholderTextColor={COLORS.textDisabled}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon name="Clock" color={COLORS.textPrimary} />
          </View>

          <View style={styles.content}>
            <View style={styles.switchRow}>
              <Text style={styles.title}>All-day</Text>

              <View style={styles.switchContainer}>
                <Switch
                  value={allDay}
                  onValueChange={setAllDay}
                  trackColor={{
                    false: COLORS.transferent,
                    true: COLORS.transferent,
                  }}
                  thumbColor={COLORS.textPrimary}
                />
              </View>
            </View>

            {isTask ? (
              <>
                <Text onPress={() => {setShowModal(true); setDateCategory('taskDate')}} style={styles.title}>{taskDate.toDateString()}</Text>
              </>
            ) : (
              <>
                <Text style={styles.subtitle}>Starts</Text>

                <Text onPress={() => {setShowModal(true); setDateCategory('startDate')}} style={styles.title}>
                  {startDate.toDateString()}
                </Text>

                <View style={{ height: 10 }} />

                <Text style={styles.subtitle}>Ends</Text>

                <Text onPress={() => {setShowModal(true); setDateCategory('endDate')}} style={styles.title}>
                  {endDate.toDateString()}
                </Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon name="RotateCcw" color={COLORS.textPrimary} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Does not repeat</Text>
          </View>
          <SelectDateModal
            dateCategory = {dateCategory}
            setTaskDate ={setTaskDate}
            setStartDate = {setStartDate}
            setEndDate= {setEndDate}
            navigation={navigation}
            visible={showModal}
            onClose={() => setShowModal(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  saveButton: {
    backgroundColor: COLORS.saveButton,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  saveText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },

  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  titleInput: {
    fontSize: 34,
    color: COLORS.textPrimary,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },

  row: {
    flexDirection: 'row',
    minHeight: 72,
    alignItems: 'center',
  },

  icon: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    paddingRight: 20,
    justifyContent: 'center',
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '500',
  },

  subtitle: {
    color: COLORS.textDisabled,
    marginTop: 4,
    fontSize: 14,
  },

  input: {
    color: COLORS.textPrimary,
    fontSize: 18,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  switchContainer: {
    backgroundColor: COLORS.switchButton,
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
