import React from 'react';
import WeddingDetail from '@common/constants/WeddingDetail';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import { useIntl } from 'react-intl';
import { useCountdown } from '@common/hooks/useCountdown';
import CountdownTimer from '@common/components/Countdown/CountdownTimer/CountdownTimer';

const HomeCountdown: React.FC = () => {
  const intl = useIntl();
  const { days, hours, minutes, seconds } = useCountdown(WeddingDetail.date);

  const isAfterWedding = days + hours + minutes + seconds <= 0;

  return (
    <HomeSectionWrapper
      coloredBg={false}
      title={intl.formatMessage({
        id: isAfterWedding ? 'home.countdown.titleAfterWedding' : 'home.countdown.titleBeforeWedding'
      })}
    >
      <CountdownTimer days={days} hours={hours} minutes={minutes} seconds={seconds} />
    </HomeSectionWrapper>
  );
};

export default HomeCountdown;
