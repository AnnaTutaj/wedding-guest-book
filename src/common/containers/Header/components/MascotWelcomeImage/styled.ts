import Image from '@common/components/Image/Image';
import styled from 'styled-components';

export const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledImage = styled(Image)`
  border-radius: ${({ theme }) => theme.antd.borderRadius}px;
`;
