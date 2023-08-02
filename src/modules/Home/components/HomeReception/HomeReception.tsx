import React from 'react';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import { useIntl } from 'react-intl';
import { StyledContainer } from './styled';
import Image from '@common/components/Image/Image';
import receptionImage from '@assets/reception.jpg';

const HomeReception: React.FC = () => {
  const intl = useIntl();

  return (
    <HomeSectionWrapper
      coloredBg={false}
      title={intl.formatMessage({
        id: 'home.reception.title'
      })}
    >
      <StyledContainer>
        <div>
          <div>{intl.formatMessage({ id: 'home.reception.description' })}</div>
          <div>{intl.formatMessage({ id: 'home.reception.placeName' })}</div>
        </div>
        <Image style={{ maxHeight: 400 }} src={receptionImage} preview={false} />
        <div>{intl.formatMessage({ id: 'home.reception.placeAddress' })}</div>
      </StyledContainer>
    </HomeSectionWrapper>
  );
};

export default HomeReception;
