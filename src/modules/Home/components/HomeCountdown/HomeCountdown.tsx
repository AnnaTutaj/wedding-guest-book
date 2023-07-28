import React from 'react';
import Countdown from '@common/components/Countdown/Countdown';
import WeddingDetail from '@common/constants/WeddingDetail';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import { useIntl } from 'react-intl';

const HomeCountdown: React.FC = () => {
  const intl = useIntl();

  //todo: add "Days until we say I do"
  return (
    <HomeSectionWrapper coloredBg={false} title={intl.formatMessage({ id: 'home.countdown.title' })}>
      <Countdown targetDate={WeddingDetail.date} />
    </HomeSectionWrapper>
  );
};

export default HomeCountdown;
