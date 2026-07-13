import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import {
  insertSchedule,
  Schedule,
} from '../database/scheduleRepository';
import { scheduleNotification } from '../services/notificationService';

export type DateCategory =
  | 'taskDate'
  | 'startDate'
  | 'endDate';

export type TimeCategory =
  | 'task'
  | 'start'
  | 'end';

type Props = {
  isTask: boolean;
  onSaveSuccess: () => void;
};

export const useScheduleForm = ({
  isTask,
  onSaveSuccess,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const [showSelectTimeModal, setShowSelectTimeModal] =
    useState(false);

  const [dateCategory, setDateCategory] =
    useState<DateCategory>('taskDate');

  const [timeCategory, setTimeCategory] =
    useState<TimeCategory>('task');

  const [repeatType, setRepeatType] =
    useState('none');

  const [title, setTitle] = useState('');

  const [description, setDescription] =
    useState('');

  const [allDay, setAllDay] = useState(false);

  const [taskDate, setTaskDate] =
    useState(new Date());

  const [startDate, setStartDate] =
    useState(new Date());

  const [endDate, setEndDate] =
    useState(new Date());

  const handleDateSelect = useCallback(
    (date: Date) => {
      switch (dateCategory) {
        case 'taskDate':
          setTaskDate(date);
          break;

        case 'startDate':
          setStartDate(date);
          break;

        case 'endDate':
          setEndDate(date);
          break;
      }

      setShowModal(false);
    },
    [dateCategory],
  );

  const handleAllDayChange = useCallback(
    (value: boolean) => {
      setAllDay(value);

      if (!value) {
        return;
      }

      if (isTask) {
        setTaskDate(
          dayjs(taskDate)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate(),
        );

        return;
      }

      setStartDate(
        dayjs(startDate)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .toDate(),
      );

      setEndDate(
        dayjs(endDate)
          .hour(23)
          .minute(59)
          .second(59)
          .millisecond(999)
          .toDate(),
      );
    },
    [
      isTask,
      taskDate,
      startDate,
      endDate,
    ],
  );

  const handleTimeSelect = useCallback(
    (date: Date) => {
      switch (timeCategory) {
        case 'task':
          setTaskDate(date);
          break;

        case 'start':
          setStartDate(date);
          break;

        case 'end':
          setEndDate(date);
          break;
      }

      setShowSelectTimeModal(false);
    },
    [timeCategory],
  );

  const handleSave = useCallback(async () => {
    const now = new Date();

    const schedule: Schedule = {
      type: isTask ? 'task' : 'event',
      title,
      description,
      startDate: isTask
        ? taskDate.toISOString()
        : startDate.toISOString(),
      endDate: isTask
        ? taskDate.toISOString()
        : endDate.toISOString(),
      allDay,
      repeatType: isTask
        ? repeatType
        : 'none',
      completed: false,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    await insertSchedule(schedule);
    // notification Serviced called
    await scheduleNotification(
  schedule.title,
  schedule.description,
  new Date(schedule.startDate),
);

    onSaveSuccess();
  }, [
    isTask,
    title,
    description,
    taskDate,
    startDate,
    endDate,
    allDay,
    repeatType,
    onSaveSuccess,
  ]);

  const openDateModal = (category: DateCategory) => {
  setDateCategory(category);
  setShowModal(true);
};

const openTimeModal = (category: TimeCategory) => {
  setTimeCategory(category);
  setShowSelectTimeModal(true);
};

  return {
    openDateModal,
    openTimeModal,

    showModal,
    setShowModal,

    showSelectTimeModal,
    setShowSelectTimeModal,

    dateCategory,

    timeCategory,

    repeatType,
    setRepeatType,

    title,
    setTitle,

    description,
    setDescription,

    allDay,

    taskDate,
    startDate,
    endDate,

    handleDateSelect,
    handleAllDayChange,
    handleTimeSelect,
    handleSave,
  };
};