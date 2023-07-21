import { Divider } from 'antd';
import styled, { css } from 'styled-components';

export const StyledDivider = styled(Divider)<{ $size?: 'small'; $uppercase?: boolean }>`
  && {
    ${({ $size }) =>
      $size === 'small' &&
      css`
        margin: ${({ theme }) => theme.antd.marginXXS}px 0;
      `}

    ${({ $uppercase }) =>
      $uppercase &&
      css`
        text-transform: uppercase;
      `}
  }
`;
