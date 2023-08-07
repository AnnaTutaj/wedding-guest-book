import styled, { createGlobalStyle } from 'styled-components';
import { Image } from 'antd';

export const ImagePreviewCn = 'ImagePreviewCn';

export const GlobalStyle = createGlobalStyle`
  .${ImagePreviewCn} {
    min-width: 25px;
    max-width: 250px;
    max-height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - 10px)`};
    object-fit: cover;
    }
`;

export const StyledImage = styled(Image)`
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  aspect-ratio: 4/3;
  object-fit: cover;
`;
