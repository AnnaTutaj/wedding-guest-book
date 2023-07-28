import image from '@assets/logo_big.jpg';

import { StyledImage, StyledImageContainer } from './styled';

const MascotWelcomeImage: React.FC = () => {
  return (
    <StyledImageContainer>
      <StyledImage height={180} src={image} alt="Wedding Guest Book Mascot" preview={false} />
    </StyledImageContainer>
  );
};

export default MascotWelcomeImage;
