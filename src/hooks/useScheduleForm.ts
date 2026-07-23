import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import {
  insertSchedule,
  Schedule,
} from '../database/scheduleRepository';
import { scheduleNotification } from '../services/notificationService';
import { toastService } from '../services/toastService';

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
    // Validate title
    if (!title.trim()) {
      toastService.error(
        'Failed to save',
        'Title is required',
      );
      return;
    }

    // Validate event dates
    if (!isTask && endDate <= startDate) {
      toastService.error(
        'Invalid Event',
        'End date must be after start date',
      );
      return;
    }

    try {
      const now = new Date();

      const schedule: Schedule = {
        type: isTask ? 'task' : 'event',
        title: title.trim(),
        description: description.trim(),
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

      // Schedule notification only for future dates
      const notificationDate = new Date(
        schedule.startDate,
      );

      if (notificationDate > new Date()) {
        await scheduleNotification(
          schedule.title,
          schedule.description,
          notificationDate,
        );
      }

      toastService.success(
        'Success',
        'Task/Event saved successfully',
      );

      onSaveSuccess();
    } catch (error) {
      if (error instanceof Error) {
        toastService.error(
          'Failed to save',
          error.message,
        );
        console.log(error);
      } else {
        toastService.error(
          'Failed to save',
          'Something went wrong',
        );
        console.log(error);
      }
    }
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

  const openDateModal = (
    category: DateCategory,
  ) => {
    setDateCategory(category);
    setShowModal(true);
  };

  const openTimeModal = (
    category: TimeCategory,
  ) => {
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
    setAllDay,

    taskDate,
    startDate,
    endDate,

    handleDateSelect,
    handleAllDayChange,
    handleTimeSelect,
    handleSave,
  };
};