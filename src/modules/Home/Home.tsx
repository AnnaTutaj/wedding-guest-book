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

const Home: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authModalConfig, setAuthModalConfig] = useState<IAuthModalProps>();
  const divRef = useRef<HTMLDivElement>(null);

  const { userProfile } = useAuth();

  const date = '2023-09-02 16:00';

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

  const onClick = () => {
    if (userProfile.uid) {
      navigate(Paths.Entry);
    } else {
      setAuthModalConfig({
        handleCancel: () => setAuthModalConfig(undefined)
      });
    }
  };

  return (
    <>
      <StyledHeaderImageContainer style={{ backgroundImage: `url('${aiNarrow}')` }}>
        <StyledHeaderContentContainer>
          <StyledTitleSpace direction="vertical">
            <StyledHeaderTitle>{intl.formatMessage({ id: 'home.header.subtitle' })}</StyledHeaderTitle>
            <StyledHeaderSubtitle>{buildDate(date).format('LL')}</StyledHeaderSubtitle>
          </StyledTitleSpace>
          <Space direction="vertical" size="large">
            <Button type="primary" onClick={onClick} text={intl.formatMessage({ id: 'home.header.button' })} />
            <Button
              type="primary"
              shape="circle"
              onClick={executeScroll}
              icon={<FontAwesomeIcon icon={faChevronDown} />}
            />
          </Space>
        </StyledHeaderContentContainer>
      </StyledHeaderImageContainer>
      <StyledContentContainer ref={divRef}>{/* todo: content */}</StyledContentContainer>
      <StyledEndingContainer>
        <SectionEndingTitle>{intl.formatMessage({ id: 'home.ending.title' })}</SectionEndingTitle>

        <Button type="primary" onClick={onClick}>
          {intl.formatMessage({ id: 'home.ending.button' })}
        </Button>
      </StyledEndingContainer>

      {authModalConfig ? <AuthModal {...authModalConfig} /> : null}
    </>
  );
};

export default Home;
