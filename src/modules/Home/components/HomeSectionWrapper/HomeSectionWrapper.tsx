import React from 'react';
import { StyledContainer, StyledDescription, StyledTitle } from './styled';

interface IProps {
  coloredBg: boolean;
  title?: string;
  description?: JSX.Element;
  children: JSX.Element;
}

const HomeSectionWrapper: React.FC<IProps> = ({ coloredBg, title, description, children }) => {
  return (
    <StyledContainer $coloredBg={coloredBg}>
      {title ? <StyledTitle $description={!!description}>{title}</StyledTitle> : null}
      {description ? <StyledDescription>{description}</StyledDescription> : null}
      {children}
    </StyledContainer>
  );
};

export default HomeSectionWrapper;
