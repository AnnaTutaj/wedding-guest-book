import { Col } from 'antd';
import styled, { css } from 'styled-components';

export const StyledEllipsisCol = styled(Col)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const colorWhiteSecondary = css`
  color: rgb(255 255 255/ 75%);
`;
