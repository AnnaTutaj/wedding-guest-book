import styled from 'styled-components';

export const StyledHeaderText = styled.span<{ $small?: boolean }>`
  font-size: ${({ $small }) => ($small ? 18 : 30)}px;
  font-family: 'Ms Madi', cursive;
  letter-spacing: 4px;
`;
