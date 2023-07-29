import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledColorTextLink = styled(Link)`
  white-space: pre;
  color: ${({ theme }) => theme.antd.colorText};

  &:hover {
    color: ${({ theme }) => theme.antd.colorPrimary};
  }
`;
