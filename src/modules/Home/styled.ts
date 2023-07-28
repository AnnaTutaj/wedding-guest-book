import { Space } from 'antd';
import styled from 'styled-components';
const gradientColors = '#288275, #388c6f, #4e9667, #699e5c, #86a551, #a6aa48, #c8ad44, #ebad49';
const homeEndingGradient = `radial-gradient(circle at 10% 80%, ${gradientColors})`;

export const StyledHeaderImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
  min-height: 450px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const StyledHeaderContentContainer = styled.div`
  height: 60%;
  padding: 0 30px;
  color: ${({ theme }) => theme.antd.colorWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 80px;
`;

export const StyledEndingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - ${theme.layout.footerHeight}px)`};
  min-height: 200px;
  padding: 30px;
  color: ${({ theme }) => theme.antd.colorWhite};
  text-align: center;
  background: ${homeEndingGradient};
`;

export const StyledTitleSpace = styled(Space)`
  background: rgb(0 0 0 / 25%);
  padding: 20px;
  border-radius: 50px;
`;

export const StyledHeaderTitle = styled.div`
  font-weight: 900;
  font-size: clamp(40px, min(10vw, 10vh), 90px);
  letter-spacing: 0.1em;
  transform: scaleY(1.3);
  font-family: 'Ms Madi', cursive;
`;

export const StyledHeaderSubtitle = styled.div`
  font-size: 1.5rem;
  letter-spacing: 0.1em;
`;

export const StyledContentContainer = styled.div`
  scroll-margin-top: ${({ theme }) => theme.layout.headerHeight};
`;

export const SectionEndingTitle = styled.div`
  margin-bottom: 20px;
  font-size: 1.7em;
`;
