import { StyledEllipsisCol, colorWhiteSecondary } from '@common/styled';
import { Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import styled from 'styled-components';

export const StyledCreatedByUsername = styled(Paragraph)`
  && {
    margin-bottom: 0;
    color: ${({ theme }) => theme.antd.colorWhite};
    font-size: 30px;
    font-family: 'Ms Madi', cursive;
  }
`;

export const StyledCreatedAt = styled.div`
  margin-bottom: ${({ theme }) => theme.antd.marginXS}px;
  ${colorWhiteSecondary}
`;

export const StyledTagCol = styled(StyledEllipsisCol)`
  ${colorWhiteSecondary}
`;

export const StyledTagSpace = styled.div`
  display: flex;
`;

export const StyledTagRow = styled(Row)`
  margin-bottom: ${({ theme }) => theme.antd.marginXS}px;
`;
