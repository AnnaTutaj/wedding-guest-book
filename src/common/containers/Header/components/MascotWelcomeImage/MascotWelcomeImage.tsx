import Image from '@common/components/Image/Image';
import image from '@assets/mascot_welcome.svg';
import { StyledImageContainer } from './styled';

const MascotWelcomeImage: React.FC = () => {
  return (
    <StyledImageContainer>
      <Image width={300} src={image} alt="Wedding Guest Book Mascot" preview={false} />
    </StyledImageContainer>
  );
};

export default MascotWelcomeImage;
