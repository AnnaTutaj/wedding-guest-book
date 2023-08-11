import Image from '@common/components/Image/Image';
import styled from 'styled-components';

export const StyledIframe = styled.iframe`
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 400px;
`;

export const StyledImage = styled(Image)`
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  min-width: 25px;
  max-width: 250px;
  max-height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - 10px)`};
  object-fit: cover;
  min-height: 125px;
`;
