import { Image as AntdImage, ImageProps } from 'antd';
import Spinner from '../Spinner';
import { SpinnerContainer } from './styled';

const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  return (
    <AntdImage
      {...props}
      src={src}
      placeholder={
        <SpinnerContainer>
          <Spinner size="middle" />
        </SpinnerContainer>
      }
    />
  );
};

export default Image;
