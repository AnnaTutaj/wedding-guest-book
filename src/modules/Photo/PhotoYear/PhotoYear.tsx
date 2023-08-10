import { Col, Row } from 'antd';
import { StyledImage, StyledYear } from './styled';
import { IPhotosByYear } from '@common/constants/Photos';

export interface IProps {
  photosByYear: IPhotosByYear;
}

const PhotoYear: React.FC<IProps> = ({ photosByYear }) => {
  return (
    <>
      <StyledYear>{photosByYear.year}</StyledYear>
      <Row gutter={[10, 10]} align="middle" justify="center">
        {photosByYear.images.map((image, index) => (
          <Col span={12} key={image.src} style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
            <StyledImage src={image.thumbnailSrc} preview={{ src: image.src }} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PhotoYear;
