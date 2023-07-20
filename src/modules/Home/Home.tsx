import { Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import guestBookLogo from '@assets/guest_book_logo.svg';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { useDispatch } from 'react-redux';
import { useAuth } from '@common/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import Button from '@common/components/Button';
import {
  SectionEndingTitle,
  StyledContentContainer,
  StyledEndingContainer,
  StyledHeaderContainer,
  StyledHeaderGuestBookSpace,
  StyledHeaderSubtitle,
  StyledHeaderTitle,
  StyledLogoImage
} from './styled';
import AuthModal, { IAuthModalProps } from '@common/containers/Header/components/AuthModal/AuthModal';

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
      <StyledHeaderContainer>
        <StyledHeaderGuestBookSpace size={16}>
          <StyledLogoImage src={guestBookLogo} alt="Wedding Guest Book Logo" />
          <StyledHeaderTitle>Wedding Guest Book</StyledHeaderTitle>
        </StyledHeaderGuestBookSpace>

        <StyledHeaderSubtitle>{intl.formatMessage({ id: 'home.header.subtitle' })}</StyledHeaderSubtitle>
        <Space direction="vertical">
          <Button type="primary" onClick={onClick} text={intl.formatMessage({ id: 'home.header.button' })} />
          {intl.formatMessage({ id: 'common.or' }).toLowerCase()}
          <Button
            type="text"
            onClick={executeScroll}
            icon={<FontAwesomeIcon icon={faChevronDown} />}
            text={intl.formatMessage({ id: 'home.header.discoverMore' })}
          />
        </Space>
      </StyledHeaderContainer>
      <StyledContentContainer ref={divRef}>
        {/* todo: content */}
      </StyledContentContainer>
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
