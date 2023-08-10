import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useAuth } from '@common/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import Button from '@common/components/Button';
import {
  SectionEndingTitle,
  StyledContentContainer,
  StyledDivider,
  StyledEndingContainer,
  StyledHeaderContentContainer,
  StyledHeaderImageContainer,
  StyledHeaderSubtitle,
  StyledHeaderTitle,
  StyledTitleSpace
} from './styled';
import AuthModal, { IAuthModalProps } from '@common/containers/Header/components/AuthModal/AuthModal';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import aiNarrow from '@assets/aiNarrow.jpg';
import { buildDate } from '@common/helpers/DateHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Space } from 'antd';
import WeddingDetail from '@common/constants/WeddingDetail';
import HomeCountdown from './components/HomeCountdown/HomeCountdown';
import HomeCeremony from './components/HomeCeremony/HomeCeremony';
import HomeReception from './components/HomeReception/HomeReception';

const Home: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authModalConfig, setAuthModalConfig] = useState<IAuthModalProps>();
  const divRef = useRef<HTMLDivElement>(null);

  const { userProfile } = useAuth();

  useEffect(() => {
    LayoutActions.setHidePaddingAction(true)(dispatch);

    return () => {
      LayoutActions.setHidePaddingAction(false)(dispatch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const executeScroll = () => {
    if (divRef && divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToEntry = () => {
    if (userProfile.uid) {
      navigate(Paths.Entry);
    } else {
      setAuthModalConfig({
        handleCancel: () => setAuthModalConfig(undefined),
        handleSuccess: () => {
          navigate(Paths.Entry);
        }
      });
    }
  };

  const goToPhoto = () => {
    if (userProfile.uid) {
      navigate(Paths.Photo);
    } else {
      setAuthModalConfig({
        handleCancel: () => setAuthModalConfig(undefined),
        handleSuccess: () => {
          navigate(Paths.Photo);
        }
      });
    }
  };

  return (
    <>
      <StyledHeaderImageContainer style={{ backgroundImage: `url('${aiNarrow}')` }}>
        <StyledHeaderContentContainer>
          <StyledTitleSpace direction="vertical">
            <StyledHeaderTitle>{intl.formatMessage({ id: 'home.header.subtitle' })}</StyledHeaderTitle>
            <StyledHeaderSubtitle>{buildDate(WeddingDetail.date).format('LL')}</StyledHeaderSubtitle>
          </StyledTitleSpace>
          <Space direction="vertical" size="large">
            <Button type="primary" onClick={goToEntry} text={intl.formatMessage({ id: 'home.header.button' })} />
            <Button
              type="primary"
              shape="circle"
              onClick={executeScroll}
              icon={<FontAwesomeIcon icon={faChevronDown} />}
            />
          </Space>
        </StyledHeaderContentContainer>
      </StyledHeaderImageContainer>
      <StyledContentContainer ref={divRef}>
        <HomeCountdown />
        <StyledDivider />
        <HomeCeremony />
        <StyledDivider />
        <HomeReception />
      </StyledContentContainer>
      <StyledEndingContainer>
        <SectionEndingTitle>{intl.formatMessage({ id: 'home.ending.title' })}</SectionEndingTitle>
        <Space direction="vertical">
          <Button type="primary" onClick={goToEntry}>
            {intl.formatMessage({ id: 'home.ending.button.goToEntries' })}
          </Button>
          {intl.formatMessage({ id: 'common.or' }).toLocaleLowerCase()}
          <Button ghost onClick={goToPhoto}>
            {intl.formatMessage({ id: 'home.ending.button.goToPhotos' })}
          </Button>
        </Space>
      </StyledEndingContainer>

      {authModalConfig ? <AuthModal {...authModalConfig} /> : null}
    </>
  );
};

export default Home;
