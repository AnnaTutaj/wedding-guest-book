import { Space } from 'antd';
import { StyledContainer, StyledText, StyledValue } from './styled';

export interface IProps {
  value: number;
  text: string;
  colon?: boolean;
}

const CountdownValueDisplay: React.FC<IProps> = ({ value, text, colon }) => {
  return (
    <Space align="start">
      <StyledContainer>
        <StyledValue>{Math.abs(value)}</StyledValue>
        <StyledText>{text}</StyledText>
      </StyledContainer>
      {colon ? <StyledValue>:</StyledValue> : null}
    </Space>
  );
};

export default CountdownValueDisplay;
