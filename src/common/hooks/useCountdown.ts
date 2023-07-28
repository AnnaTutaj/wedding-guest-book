import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export interface ICountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetDate: string): ICountdown => {
  const [secondDiff, setSecondDiff] = useState<number>(dayjs.tz(targetDate).diff(dayjs.tz(), 'seconds'));

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = dayjs.tz(targetDate).diff(dayjs.tz(), 'seconds');

      setSecondDiff(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(secondDiff);
};

const getReturnValues = (secondDiff: number): ICountdown => {
  const daysCount = secondDiff / (60 * 60 * 24);
  const hoursCount = (secondDiff % (60 * 60 * 24)) / (60 * 60);
  const minutesCount = (secondDiff % (60 * 60)) / 60;
  const secondsCount = secondDiff % 60;

  if (secondDiff > 0) {
    const days = Math.floor(daysCount);
    const hours = Math.floor(hoursCount);
    const minutes = Math.floor(minutesCount);
    const seconds = Math.floor(secondsCount);

    return { days, hours, minutes, seconds };
  }

  const days = Math.ceil(daysCount);
  const hours = Math.ceil(hoursCount);
  const minutes = Math.ceil(minutesCount);
  const seconds = Math.ceil(secondsCount);

  return { days, hours, minutes, seconds };
};

export { useCountdown };
