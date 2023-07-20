import React from 'react';
import { Space } from 'antd';
import { useIntl } from 'react-intl';
import { StyledFooter } from './styled';
import { StyledColorTextLink } from '@common/components/Link/styled';

const Footer: React.FC = () => {
  const intl = useIntl();

  // todo: update my last name & privacypolicy
  return (
    <StyledFooter>
      <Space direction="vertical" size={4}>
        <span>
          <span>©2023 {intl.formatMessage({ id: 'footer.credits' })} </span>
          <StyledColorTextLink as="a" href="mailto:tutaj.anna.93@gmail.com">
            Anna Tutaj
          </StyledColorTextLink>
        </span>
        <Space size={10}>
          <StyledColorTextLink
            as="a"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            {intl.formatMessage({ id: 'footer.privacyPolicy' })}
          </StyledColorTextLink>
        </Space>
      </Space>
    </StyledFooter>
  );
};

export default Footer;
