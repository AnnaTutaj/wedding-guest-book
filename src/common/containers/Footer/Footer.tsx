import React, { useContext, useLayoutEffect, useRef } from 'react';
import { Space } from 'antd';
import { useIntl } from 'react-intl';
import { StyledFooter } from './styled';
import { StyledColorTextLink } from '@common/components/Link/styled';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import dayjs from 'dayjs';
import WeddingDetail from '@common/constants/WeddingDetail';

const Footer: React.FC = () => {
  const intl = useIntl();
  const contentRef = useRef<HTMLDivElement>(null);
  const { setFooterHeight } = useContext(ThemeContext);
  const isAfterWedding = dayjs.tz().isAfter(WeddingDetail.date);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (contentRef?.current?.offsetHeight) {
        setFooterHeight(contentRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setFooterHeight]);

  return (
    <StyledFooter ref={contentRef}>
      <Space direction="vertical" size={4}>
        <span>
          <span>©2023 {intl.formatMessage({ id: 'footer.credits' })} </span>
          <StyledColorTextLink as="a" href="mailto:tutaj.anna.93@gmail.com">
            {isAfterWedding ? 'Anna Tutaj—Lamentowicz' : 'Anna Tutaj'}
          </StyledColorTextLink>
        </span>
        <Space size={10}>
          <StyledColorTextLink
            as="a"
            href="https://www.freeprivacypolicy.com/live/90bcffd5-ffa3-40dd-835b-3fe0fd26985f"
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
