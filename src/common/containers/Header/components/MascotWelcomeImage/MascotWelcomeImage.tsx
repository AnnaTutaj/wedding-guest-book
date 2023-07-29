import image from '@assets/logo_big.jpg';

import { StyledImage, StyledImageContainer } from './styled';

interface IProps {
  height?: number;
}

const MascotWelcomeImage: React.FC<IProps> = ({ height }) => {
  return (
    <StyledImageContainer>
      <StyledImage height={height || 180} src={image} alt="Wedding Guest Book Mascot" preview={false} />
    </StyledImageContainer>
  );
};

export default MascotWelcomeImage;
