import Image from '@common/components/Image/Image';
import styled from 'styled-components';

export const StyledImage = styled(Image)`
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  aspect-ratio: 4/3;
  min-width: 25px;
  max-width: 250px;
  max-height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - 10px)`};
  object-fit: cover;
`;
