import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-size: ${({ theme }) => theme.antd.fontSizeHeading4}px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.antd.marginMD}px;
`;
