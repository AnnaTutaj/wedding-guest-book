import { homePaddingHorizontal } from '../styledHelper';
import styled, { css } from 'styled-components';

export const StyledContainer = styled.div<{ $coloredBg: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px ${homePaddingHorizontal};
  ${({ $coloredBg }) =>
    $coloredBg &&
    css`
      background-color: ${({ theme }) => theme.antd.colorPrimaryBgHover};
    `};
`;

export const StyledTitle = styled.div<{ $description: boolean }>`
  margin-bottom: ${({ $description, theme }) => ($description ? 0 : theme.antd.marginMD)}px;
  font-weight: ${({ theme }) => theme.antd.fontWeightStrong};
  font-size: 1.8rem;
  letter-spacing: 0.15em;
  text-align: center;

  @media (width >= 992px) {
    font-size: 2rem;
  }
`;

export const StyledDescription = styled.div`
  margin-bottom: ${({ theme }) => theme.antd.marginMD}px;
  color: ${({ theme }) => theme.antd.colorTextTertiary};
  font-size: 1.1rem;
  letter-spacing: 0.15em;
  text-align: center;
`;
