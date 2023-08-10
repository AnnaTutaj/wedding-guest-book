import { Col, Image as AntdImage, Row } from 'antd';
import { StyledImage, StyledPreviewImage, StyledYear } from './styled';
import { IPhotosByYear } from '@common/constants/Photos';

export interface IProps {
  photosByYear: IPhotosByYear;
}

const PhotoYear: React.FC<IProps> = ({ photosByYear }) => {
  return (
    <>
      <StyledYear>{photosByYear.year}</StyledYear>
      <Row gutter={[10, 10]} align="middle" justify="center">
        <AntdImage.PreviewGroup
          preview={{
            imageRender: (originalNode, info) => (
              <StyledPreviewImage preview={false} src={photosByYear.images[info.current].src} spinnerSize="large" />
            )
          }}
        >
          {photosByYear.images.map((image, index) => (
            <Col span={12} key={image.src} style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
              <StyledImage src={image.thumbnailSrc} />
            </Col>
          ))}
        </AntdImage.PreviewGroup>
      </Row>
    </>
  );
};

export default PhotoYear;
