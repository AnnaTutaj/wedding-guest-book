import { ICountdown } from '@common/hooks/useCountdown';
import React from 'react';
import CountdownValueDisplay from '../CountdownValueDisplay/CountdownValueDisplay';
import { useIntl } from 'react-intl';
import { Space } from 'antd';
import { StyledDaysContainer } from './styled';

const CountdownTimer: React.FC<ICountdown> = ({ days, hours, minutes, seconds }) => {
  const intl = useIntl();

  return (
    <Space size={12}>
      <StyledDaysContainer>
        <CountdownValueDisplay value={days} text={intl.formatMessage({ id: 'common.countdownTimer.days' })} />
      </StyledDaysContainer>
      <CountdownValueDisplay value={hours} colon text={intl.formatMessage({ id: 'common.countdownTimer.hours' })} />
      <CountdownValueDisplay value={minutes} colon text={intl.formatMessage({ id: 'common.countdownTimer.minutes' })} />
      <CountdownValueDisplay value={seconds} text={intl.formatMessage({ id: 'common.countdownTimer.seconds' })} />
    </Space>
  );
};

export default CountdownTimer;
