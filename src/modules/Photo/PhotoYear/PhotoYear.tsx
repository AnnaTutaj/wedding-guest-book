import { Col, Row } from 'antd';
import { StyledImage } from './styled';

interface IProps {
  photosByYear: {
    year: number;
    urls: string[];
  };
}

const PhotoYear: React.FC<IProps> = ({ photosByYear }) => {
  return (
    <>
      <h2>{photosByYear.year}</h2>
      <Row gutter={[10, 10]} align="middle" justify="center">
        {photosByYear.urls.map((url, index) => (
          <Col span={12} key={url} style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
            <StyledImage src={url} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PhotoYear;
