import * as dayjs from 'dayjs';

// https://stackoverflow.com/questions/66639760/dayjs-diff-between-two-date-in-day-and-hours
export const calculateDaysBetweenTwoDates = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
): number => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const hours = end.diff(start, 'hours');
  const days = Math.floor(hours / 24);
  return days;
};
