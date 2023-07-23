import React from 'react';
import { useIntl } from 'react-intl';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import EntryFormModel, { IEntryFormModel } from '@modules/Entry/models/EntryFormModel';
import EntryForm from '@modules/Entry/components/EntryForm';
import { IEntryModel } from '@modules/Entry/models/EntryModel';
import useErrorMessage from '@common/hooks/useErrorMessage';

export interface IEntryUpdateModalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  entry: IEntryModel;
}

const EntryUpdateModal: React.FC<IEntryUpdateModalProps> = ({ handleSubmit, handleCancel, entry }) => {
  const intl = useIntl();
  const { showError } = useErrorMessage();

  const onFinish = async (values: IEntryFormModel) => {
    try {
      const finalValues = EntryFormModel.serializeToUpdate({
        ...values
      });

      await updateDoc(doc(db, 'entry', entry.id), finalValues);

      handleSubmit();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <EntryForm
      onFinish={onFinish}
      initialValues={EntryFormModel.build(entry)}
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'entry.update.title' })}
    />
  );
};

export default EntryUpdateModal;
