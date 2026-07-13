import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import { COLORS } from '../../constants/colors';

type Props = {
  visible: boolean;
  onClose: () => void;
  time: Date;
  onConfirm: (date: Date) => void;
};

export default function SelectTimeModal({
  visible,
  onClose,
  time,
  onConfirm
}: Props) {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  useEffect(() => {
    setHour(dayjs(time).format('hh'));
    setMinute(dayjs(time).format('mm'));
    setPeriod(dayjs(time).format('A') as 'AM' | 'PM');
  }, [time]);

  const handleConfirm = () => {
    let h = parseInt(hour, 10);
    let m = parseInt(minute, 10);

    if (isNaN(h) || h < 1) h = 1;
    if (h > 12) h = 12;

    if (isNaN(m) || m < 0) m = 0;
    if (m > 59) m = 59;

    let hour24 = h;

    if (period === 'AM') {
      if (hour24 === 12) hour24 = 0;
    } else {
      if (hour24 !== 12) hour24 += 12;
    }

    const newDate = dayjs(time)
      .hour(hour24)
      .minute(m)
      .second(0)
      .millisecond(0)
      .toDate();

    onConfirm(newDate);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        <View style={styles.container}>
          <Text style={styles.title}>Select Time</Text>

          <View style={styles.timeContainer}>
            <TextInput
              value={hour}
              onChangeText={setHour}
              keyboardType="number-pad"
              maxLength={2}
              style={styles.input}
              textAlign="center"
            />

            <Text style={styles.colon}>:</Text>

            <TextInput
              value={minute}
              onChangeText={setMinute}
              keyboardType="number-pad"
              maxLength={2}
              style={styles.input}
              textAlign="center"
            />

            <TouchableOpacity
              style={styles.periodButton}
              onPress={() =>
                setPeriod(period === 'AM' ? 'PM' : 'AM')
              }
            >
              <Text style={styles.periodText}>{period}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '90%',
    backgroundColor: COLORS.selectDateModal,
    borderRadius: 20,
    padding: 20,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 25,
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  input: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.switchButton,
    borderRadius: 12,
    color: COLORS.textPrimary,
    fontSize: 30,
    fontWeight: '600',
  },

  colon: {
    color: COLORS.textPrimary,
    fontSize: 34,
    marginHorizontal: 10,
    fontWeight: '700',
  },

  periodButton: {
    marginLeft: 15,
    backgroundColor: COLORS.switchButton,
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderRadius: 12,
  },

  periodText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30,
  },

  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});