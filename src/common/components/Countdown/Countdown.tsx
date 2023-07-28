import { useCountdown } from '@common/hooks/useCountdown';
import CountdownTimer from './CountdownTimer/CountdownTimer';

export interface IProps {
  targetDate: string;
}

const Countdown: React.FC<IProps> = ({ targetDate }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return null;
  } else {
    return <CountdownTimer days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }
};

export default Countdown;
