import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export interface ICountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetDate: string): ICountdown => {
  const [secondDiff, setSecondDiff] = useState<number>(dayjs(targetDate).diff(dayjs(), 'seconds'));

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = dayjs(targetDate).diff(dayjs(), 'seconds');

      setSecondDiff(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(secondDiff);
};

const getReturnValues = (secondDiff: number): ICountdown => {
  const days = Math.floor(secondDiff / (60 * 60 * 24));
  const hours = Math.floor((secondDiff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((secondDiff % (60 * 60)) / 60);
  const seconds = Math.floor(secondDiff % 60);

  return { days, hours, minutes, seconds };
};

export { useCountdown };
