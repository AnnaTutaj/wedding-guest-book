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
  margin-bottom: ${({ theme }) => theme.antd.marginSM}px;
`;
