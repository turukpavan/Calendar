import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';
import Icon from '../Icon';
import { ROUTES } from '../../constants/routes';

type Props = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
};

export default function AddEventModal({ visible, onClose, navigation }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} style={styles.container}>
        <View style={styles.eventTaskContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(ROUTES.ADD_SCHEDULE,{type : 'task'})}
            style={styles.addTask}
          >
            <Icon name="CircleCheckBig" color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(ROUTES.ADD_SCHEDULE,{type : 'event'})}
            style={styles.addEvent}
          >
            <Icon name="CalendarPlus" color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 20,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  eventTaskContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 30,
    right: 10,
    gap: 15,
  },
  addTask: {
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.taskIconBackground,
  },
  addEvent: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: COLORS.eventIconBackground,
  },
});
