import { ImageProps } from 'antd';
import Spinner from '../Spinner';
import { SpinnerContainer, StyledImage } from './styled';
import { SpinnerSize } from '../Spinner/Spinner';

export interface IImageProps extends ImageProps {
  spinnerSize?: SpinnerSize;
}

const Image: React.FC<IImageProps> = ({ src, spinnerSize = 'middle', ...props }) => {
  return (
    <StyledImage
      {...props}
      src={src}
      placeholder={
        <SpinnerContainer>
          <Spinner size={spinnerSize} />
        </SpinnerContainer>
      }
    />
  );
};

export default Image;
