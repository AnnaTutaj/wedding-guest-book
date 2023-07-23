import React from 'react';
import { useIntl } from 'react-intl';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { useAuth } from '@common/contexts/AuthContext';
import EntryFormModel, { IEntryFormModel } from '@modules/Entry/models/EntryFormModel';
import EntryForm from '@modules/Entry/components/EntryForm';
import useErrorMessage from '@common/hooks/useErrorMessage';

export interface IEntryCreateModalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
}

const EntryCreateModal: React.FC<IEntryCreateModalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();
  const { showError } = useErrorMessage();

  const onFinish = async (values: IEntryFormModel) => {
    try {
      const finalValues = EntryFormModel.serializeToCreate({
        createdByUid: userProfile.uid,
        createdByPictureURL: userProfile.pictureURL,
        ...values
      });

      await addDoc(collection(db, 'entry'), finalValues);
      handleSubmit();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <EntryForm
      onFinish={onFinish}
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'entry.create.title' })}
      initialValues={{
        color: 'default',
        createdByUsername: userProfile.username
      }}
    />
  );
};

export default EntryCreateModal;
