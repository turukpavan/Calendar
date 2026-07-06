import dayjs from 'dayjs';

export const getMonthDates = (date: Date) => {
  const current = dayjs(date); // 15 Sep 2026

  const startOfMonth = current.startOf('month'); // 1 Sep 2026
  const endOfMonth = current.endOf('month'); // 30 Sep 2026

  const start = startOfMonth.startOf('week'); // 30 aug
  const end = endOfMonth.endOf('week'); //3 oct 

  const dates: Date[] = [];

  let day = start;

  while (day.isBefore(end) || day.isSame(end, 'day')) {
    dates.push(day.toDate());
    day = day.add(1, 'day');
  }

  return dates;
};