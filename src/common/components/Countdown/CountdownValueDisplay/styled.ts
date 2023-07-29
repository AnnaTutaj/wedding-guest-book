import styled from 'styled-components';

export const StyledContainer = styled.div`
  text-align: center;
  min-width: 63px;

  @media (width <= 360px) {
    min-width: 42px;
  }
`;

export const StyledValue = styled.div`
  font-weight: ${({ theme }) => theme.antd.fontWeightStrong};
  font-size: ${({ theme }) => theme.antd.fontSizeHeading1}px;

  @media (width <= 360px) {
    font-size: ${({ theme }) => theme.antd.fontSizeHeading3}px;
  }
`;

export const StyledText = styled.div`
  text-transform: lowercase;
  font-size: ${({ theme }) => theme.antd.fontSizeHeading4}px;

  @media (width <= 360px) {
    font-size: ${({ theme }) => theme.antd.fontSize}px;
  }
`;
