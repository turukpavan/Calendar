import Holidays from 'date-holidays';

const hd = new Holidays('IN');

export function getHolidays(year: number) {
  return hd.getHolidays(year);
}

export function isHoliday(date: Date) {
  return hd.isHoliday(date);
}