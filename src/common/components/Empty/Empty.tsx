import { useIntl } from 'react-intl';
import image from '@assets/mascot_void.jpg';
import { StyledEmpty, StyledEmptyHeaderText, StyledEmptyImage } from './styled';

export interface IEmptyProps {
  description: string;
}

const Empty: React.FC<IEmptyProps> = ({ description }) => {
  const intl = useIntl();

  return (
    <StyledEmpty
      image={<StyledEmptyImage src={image} alt="Wedding Guest Book Mascot" />}
      description={
        <>
          <StyledEmptyHeaderText>{intl.formatMessage({ id: 'common.empty' })}</StyledEmptyHeaderText>
          <div>{description}</div>
        </>
      }
    />
  );
};

export default Empty;
