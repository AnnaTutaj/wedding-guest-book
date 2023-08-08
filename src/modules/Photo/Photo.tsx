import Button from '@common/components/Button/Button';
import { Divider, Image, Space } from 'antd';
import { useIntl } from 'react-intl';
import googleDriveIcon from '@assets/google-drive-icon.svg';
import PhotoYear from './PhotoYear/PhotoYear';
import { StyledContainer } from './styled';
import { photosByYears } from '@common/constants/Photos';

const Photo: React.FC = () => {
  const intl = useIntl();

  return (
    <StyledContainer>
      <Space direction="vertical" size={20}>
        <h2>{intl.formatMessage({ id: 'photo.googleDriveInfo' })}</h2>
        <Button
          type="primary"
          style={{ minHeight: '50px' }}
          block
          onClick={() =>
            window.open(
              'https://drive.google.com/drive/folders/1XsxA2Ir_dm4rJIYG90HZM-7ColtqVbeL?usp=sharing',
              '_blank'
            )
          }
        >
          <Space>
            <Image style={{ height: '35px' }} src={googleDriveIcon} preview={false} />
            {intl.formatMessage({ id: 'photo.goToPhotos' })}
          </Space>
        </Button>
        <Divider />
        <h2>{intl.formatMessage({ id: 'photo.archivePhotosTitle' })}</h2>
        {photosByYears.map((photosByYear) => (
          <PhotoYear photosByYear={photosByYear} key={photosByYear.year} />
        ))}
      </Space>
    </StyledContainer>
  );
};

export default Photo;
