import { Col } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IEntryModel } from '@modules/Entry/models/EntryModel';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import useConfirmModal from '@common/hooks/useConfirmModal';
import { useAuth } from '@common/contexts/AuthContext';
import { StyledEllipsisContainer } from '@common/styled';
import {
  StyledContentParagraph,
  StyledDropDownCol,
  StyledDropdown,
  StyledDropdownIconContainer,
  StyledListItem,
  StyledListItemRow
} from '@common/components/ListItem/styled';
import { StyledCreatedAt, StyledCreatedByUsername } from './styled';
import { buildDate } from '@common/helpers/DateHelper';

interface IProps {
  entry: IEntryModel;
  removeEntry?: (id: string) => void;
  updateEntry?: (entry: IEntryModel) => void;
}

const EntryListItem: React.FC<IProps> = ({ entry, removeEntry, updateEntry }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();

  const { confirmModal, confirmModalContextHolder } = useConfirmModal();

  const confirmDelete = async () => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'entry.confirmModal.delete.title' }),
      content: intl.formatMessage({ id: 'entry.confirmModal.delete.content' }),
      okText: intl.formatMessage({ id: 'entry.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'entry.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleDelete();
      }
    });
  };

  const handleDelete = async () => {
    if (removeEntry) {
      await deleteDoc(doc(db, 'entry', entry.id));
      removeEntry(entry.id);
    }
  };

  const handleUpdate = async () => {
    if (updateEntry) {
      updateEntry(entry);
    }
  };

  const menuItems: DropdownMenuItemProps = [
    {
      key: DropdownMenuKey.update,
      onClick: async () => handleUpdate()
    },
    {
      key: DropdownMenuKey.delete,
      onClick: () => confirmDelete()
    }
  ];

  const miliseconds = entry.createdAt.seconds * 1000;

  return (
    <>
      <StyledListItem $backgroundColor={entry.color}>
        <StyledListItemRow wrap={false}>
          <Col flex={1}>
            <StyledCreatedAt>{buildDate(miliseconds).format('LLL')}</StyledCreatedAt>
            {/* {entry.imageURLs.length ? <ImagePreview srcs={entry.imageURLs} /> : null} */}
            <StyledContentParagraph>{entry.content}</StyledContentParagraph>
            {entry.tags.map((tag) => (
              <StyledEllipsisContainer key={tag}>
                <small>#{tag}</small>
              </StyledEllipsisContainer>
            ))}
            <StyledCreatedByUsername>{entry.createdByUsername}</StyledCreatedByUsername>
          </Col>

          {entry.createdByUid === userProfile.uid ? (
            <StyledDropDownCol>
              <StyledDropdown menuItems={menuItems}>
                <StyledDropdownIconContainer $colorHover={entry.color}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </StyledDropdownIconContainer>
              </StyledDropdown>
            </StyledDropDownCol>
          ) : null}
        </StyledListItemRow>
      </StyledListItem>
      {confirmModalContextHolder}
    </>
  );
};

export default EntryListItem;
