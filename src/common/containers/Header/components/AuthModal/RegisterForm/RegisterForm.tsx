import { Form } from 'antd';
import React from 'react';
// import { useIntl } from 'react-intl';
import FederatedLogin from '../FederatedLogin';
import { StyledContentContainer } from '../styled';

export interface IRegisterFormProps {
  handleCancel: () => void;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ handleCancel }) => {
  // const intl = useIntl();

  //todo: add anonymous login
  return (
    <Form name="RegisterForm" layout={'vertical'}>
      <StyledContentContainer>
        <FederatedLogin closeModal={handleCancel} />
      </StyledContentContainer>
    </Form>
  );
};

export default RegisterForm;
