import React from 'react';
import { useIntl } from 'react-intl';
import Modal from '@common/components/Modal';
import MascotWelcomeImage from '../MascotWelcomeImage/MascotWelcomeImage';
import { StyledContentContainer } from './styled';
import { Button, Form, Input } from 'antd';
import FederatedLogin from './FederatedLogin/FederatedLogin';
import { StyledDivider } from '@common/components/Divider/styled';
import useErrorMessage from '@common/hooks/useErrorMessage';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { db } from '@common/util/firebase';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';

export interface IAuthModalProps {
  handleCancel: () => void;
}

interface IRegisterFormProps {
  username: string;
}

const AuthModal: React.FC<IAuthModalProps> = ({ handleCancel }) => {
  const intl = useIntl();
  const auth = getAuth();
  const { showError } = useErrorMessage();
  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);
  const maxUsernameLength = 100;

  const onFinish = async (values: IRegisterFormProps) => {
    try {
      const createdUser = await signInAnonymously(auth);

      const newUser = {
        username: values.username,
        language: siteLanguage,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, `users/${createdUser.user.uid}`), { ...newUser });

      handleCancel();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Modal title={intl.formatMessage({ id: 'auth.form.title' })} open={true} onCancel={handleCancel} width={400}>
      <StyledContentContainer>
        <MascotWelcomeImage />
        <Form name="AuthModalForm" onFinish={onFinish} layout={'vertical'}>
          <StyledContentContainer>
            <Form.Item
              style={{ marginBottom: 0 }}
              label={intl.formatMessage({ id: 'auth.form.field.name' })}
              name="username"
              rules={[
                { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
                {
                  max: maxUsernameLength,
                  message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxUsernameLength })
                }
              ]}
            >
              <Input showCount maxLength={maxUsernameLength} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              {intl.formatMessage({ id: 'auth.form.submit' })}
            </Button>

            <StyledDivider $size="small" $uppercase plain>
              {intl.formatMessage({ id: 'common.or' })}
            </StyledDivider>

            <FederatedLogin closeModal={handleCancel} />
          </StyledContentContainer>
        </Form>
      </StyledContentContainer>
    </Modal>
  );
};

export default AuthModal;
