import React from 'react';
import WeddingDetail from '@common/constants/WeddingDetail';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import { useIntl } from 'react-intl';
import { StyledContainer } from './styled';
import { buildDate } from '@common/helpers/DateHelper';
import Image from '@common/components/Image/Image';
import churchImage from '@assets/church.jpg';

const HomeCeremony: React.FC = () => {
  const intl = useIntl();

  return (
    <HomeSectionWrapper
      coloredBg={false}
      title={intl.formatMessage({
        id: 'home.ceremony.title'
      })}
    >
      <StyledContainer>
        <div>{buildDate(WeddingDetail.date).format('LLLL')}</div>
        <Image style={{ maxHeight: 400 }} src={churchImage} preview={false} />
        <div>
          <div>{intl.formatMessage({ id: 'home.ceremony.churchName' })}</div>
          <div>{intl.formatMessage({ id: 'home.ceremony.churchAddress' })}</div>
        </div>
      </StyledContainer>
    </HomeSectionWrapper>
  );
};

export default HomeCeremony;
