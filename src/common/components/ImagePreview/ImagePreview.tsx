import { useState } from 'react';
import Image from '../Image/Image';
import { Image as AntDImage } from 'antd';
import { GlobalStyle, ImagePreviewCn, StyledImage } from './styled';

export interface IImageProps {
  srcs: string[];
}
//todo: add group preview
const ImagePreview: React.FC<IImageProps> = ({ srcs }) => {
  const [visible, setVisible] = useState<boolean>(false);

  if (!srcs.length) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <StyledImage
        rootClassName={ImagePreviewCn}
        preview={{ visible: false }}
        src={srcs[0]}
        onClick={() => setVisible(true)}
      />

      <div style={{ display: 'none' }}>
        <AntDImage.PreviewGroup preview={{ visible, onVisibleChange: (value) => setVisible(value) }}>
          {srcs.map((src, index) => (
            <Image key={index} src={src} />
          ))}
        </AntDImage.PreviewGroup>
      </div>
    </>
  );
};

export default ImagePreview;
