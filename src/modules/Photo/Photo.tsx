import Button from '@common/components/Button/Button';
import { Divider, Image, Space } from 'antd';
import { useIntl } from 'react-intl';
import googleDriveIcon from '@assets/google-drive-icon.svg';
import PhotoYear from './PhotoYear/PhotoYear';
import { StyledContainer } from './styled';

const Photo: React.FC = () => {
  const intl = useIntl();

  const photosByYears = [
    {
      year: 2022,
      urls: [
        'https://drive.google.com/uc?id=1JGVZen98bFrMThLdAqaqmDP5CIOQ5SEj',
        'https://drive.google.com/uc?id=1oHsLU7RFqMwkz65nJfWlx9as5rzr6zRx',
        'https://drive.google.com/uc?id=1-ly5fDRqSp5r7_owjhXKNFpMSn-Szbhd',
        'https://drive.google.com/uc?id=1-sj5tBYiO-_XDS79sjiG2N6bWrJ3bTNy',
        'https://drive.google.com/uc?id=1-wo8dlId6khY_xyHrToG0Tvzv-gH1I0w',
        'https://drive.google.com/uc?id=1e4uewLU_XPGUGPw2jbSXtZ4o4aQaaY6w',
        'https://drive.google.com/uc?id=1Z8J3PVl3GQOhH4CeUGoQ5bp2h8ef6i6s',
        'https://drive.google.com/uc?id=1cbxv216irkA-o1FfZPWHkpgEUSn7il2Z',
        'https://drive.google.com/uc?id=100Dgg8xn3NMFyfMfLQMSWDRH8yQ5vhzq',
        'https://drive.google.com/uc?id=103Mnb_MnJyz_M5QiAZpT3jm0iIilbDhq'
      ]
    },
    {
      year: 2021,
      urls: [
        'https://drive.google.com/uc?id=1k_eIr0536fBRUlPds4Uc1aWoloUt_unS',
        'https://drive.google.com/uc?id=1_H2w_ApQcJpbcv5Rgwr5wzJBmoQV5xas',
        'https://drive.google.com/uc?id=1c5E4vkrBMNrPw-3Q-3M-HEppVd7NKL8g',
        'https://drive.google.com/uc?id=11aSmV4oTXrn6RGYjzHdfedFcWVyvv2WC',
        'https://drive.google.com/uc?id=1EhBpgE2DbXYCJTDWtjaDUWht0jKlFLBB',
        'https://drive.google.com/uc?id=1ZWJhoPaYQFk8k2zrcBeF0T8hjQLnHkMN',
        'https://drive.google.com/uc?id=1f3Kp0-NTLkfNg5P795_Ktn6SJYuWLlkN',
        'https://drive.google.com/uc?id=1SNxT2Wl3FYreKf0jhCheNUH7jFsQf2G2'
      ]
    },
    {
      year: 2020,
      urls: [
        'https://drive.google.com/uc?id=1P-jQ9A_4FJ_cP3GRrV2t6hjqdH4BtTAl',
        'https://drive.google.com/uc?id=1K_ErkoX0ttxd8_h8I7mVpncptHpGqwKT',
        'https://drive.google.com/uc?id=1LZa8yx3OEmk5CTolYXpWx6CGOFeiCcf4',
        'https://drive.google.com/uc?id=1XtziwvL_LKoNENdkTc3MqgWEMVe08E-s'
      ]
    },
    {
      year: 2019,
      urls: [
        'https://drive.google.com/uc?id=1nfygmsPOuCJ8uN8a_GZsERhosmp0vjQm',
        'https://drive.google.com/uc?id=1y1zGHVlBg1UlVIeyA6Mj7B-PujHp27kv',
        'https://drive.google.com/uc?id=1TA0J83Ihtgxmrjf7sRJ5dY5LKKsx_Dxr',
        'https://drive.google.com/uc?id=1fzNJY0zDvqq2N8q5xp6HjCLaEbwNbYxf'
      ]
    },
    {
      year: 2018,
      urls: [
        'https://drive.google.com/uc?id=1XpPHCaiXw90126q-xK12yc5dz2LW2XuO',
        'https://drive.google.com/uc?id=18UjJ06g6Z02FFSyqXYaHOLqtHa2D9nbb',
        'https://drive.google.com/uc?id=18rkcR9B8l-x2VNFXyaPFzh3_BIlBdNHS',
        'https://drive.google.com/uc?id=1dcbl8I67LsGbHHrwDCv6Vcymczi9kxz4',
        'https://drive.google.com/uc?id=1i_nKz7oJ7TaM5KY66uap2DJyUl6KL3w5',
        'https://drive.google.com/uc?id=1MywKiszT3zEBcUHzvCXaB2fgEjCZGiK5'
      ]
    },
    {
      year: 2017,
      urls: [
        'https://drive.google.com/uc?id=1uHAw2yiN39pZq7wPhlaG21aiOXDMUMLN',
        'https://drive.google.com/uc?id=1Oxtp2_hw2-84g-9ioAXwmrINMUwRAX6D',
        'https://drive.google.com/uc?id=1VGKIX_yizUTregO21qr_ImbkKJRbO8R5',
        'https://drive.google.com/uc?id=14IRmv2Rt1BDnn8eGO6OpysJD6x7nb31m'
      ]
    },
    {
      year: 2016,
      urls: [
        'https://drive.google.com/uc?id=1YKx8U-MWG9uG-IjU3Vr5wkhlnNeLKFSD',
        'https://drive.google.com/uc?id=1YeGJz0ycQnTvw_RJw0Ds_Cd_r6dqp7-Z',
        'https://drive.google.com/uc?id=14pjkJhSU9RUiBX0R3d1EZAiOOlsxzXDn',
        'https://drive.google.com/uc?id=15Vm6FAb-C_aEn6Qziu3Lks8BQdk4SGLy'
      ]
    },
    {
      year: 2015,
      urls: [
        'https://drive.google.com/uc?id=1HhCXkmfWhHdZ7JvUYnoH_NQZe3mAuuJx',
        'https://drive.google.com/uc?id=1Y2NL9gG1_90f1SAkKL1pF9NiRSDeu_R6',
        'https://drive.google.com/uc?id=1LRmWlMayQ_74SjTLN_vaf1_ssEtbrDQ3',
        'https://drive.google.com/uc?id=1PHvPUJWuvHO2i7Ivk89NVhm0_-DYIuDS',
        'https://drive.google.com/uc?id=19tcBk2b-KnTDf_SKDT0bd3NlVS6td15L',
        'https://drive.google.com/uc?id=1JxWnBR28Rm75zcZU__lvk4H5Lf-jcb0U'
      ]
    },
    {
      year: 2014,
      urls: [
        'https://drive.google.com/uc?id=1EANAYGI76ctgZ50m7oQiDzNrDDyj5h79',
        'https://drive.google.com/uc?id=1vOVvLSP8vZrbANa_0PNZ3Ms9Oj20NxFJ',
        'https://drive.google.com/uc?id=16jw311FUldGyIgWNydb385Eq19JsJexA',
        'https://drive.google.com/uc?id=1iV0Wlvyr4UPgdf71gMXeFhcUzPZNxeZA'
      ]
    },
    {
      year: 2013,
      urls: [
        'https://drive.google.com/uc?id=1pBBsx3-xfk2D4N-zk1PC_Q0wlEseNSA_',
        'https://drive.google.com/uc?id=1JAxA0r8NbPD97JUtyRsHHSZSoNj6NAlI',
        'https://drive.google.com/uc?id=1iYQKDgETJr-583o4lUA_cBAcR5PCT3AF',
        'https://drive.google.com/uc?id=10gIBZL62zZ43uJwwhFL4Qryhex6TuOBQ',
        'https://drive.google.com/uc?id=10cegY7KLVYcQ2fuO5ZKtrB3seO1YBvaP',
        'https://drive.google.com/uc?id=10IelH8w-x3cdttUNu3tNm8S_iAnJPZTo'
      ]
    }
  ];
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
        {/* //todo: add virtual scroll */}
        {photosByYears.map((photosByYear) => (
          <PhotoYear photosByYear={photosByYear} key={photosByYear.year} />
        ))}
      </Space>
    </StyledContainer>
  );
};

export default Photo;
