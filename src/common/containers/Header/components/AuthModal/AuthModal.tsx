import React from 'react';
import { useIntl } from 'react-intl';
import Modal from '@common/components/Modal';
import MascotWelcomeImage from '../MascotWelcomeImage/MascotWelcomeImage';
import RegisterForm from './RegisterForm/RegisterForm';
import { StyledContentContainer } from './styled';

export interface IAuthModalProps {
  handleCancel: () => void;
}

const AuthModal: React.FC<IAuthModalProps> = ({ handleCancel }) => {
  const intl = useIntl();

  return (
    <Modal title={intl.formatMessage({ id: 'register.form.title' })} open={true} onCancel={handleCancel} width={400}>
      <StyledContentContainer>
        <MascotWelcomeImage />
        <RegisterForm handleCancel={handleCancel} />
      </StyledContentContainer>
    </Modal>
  );
};

export default AuthModal;
