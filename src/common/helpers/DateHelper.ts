import dayjs from 'dayjs';

export const buildDate = (date?: string | number) => {
  return dayjs.tz(date, 'Europe/Warsaw');
};
