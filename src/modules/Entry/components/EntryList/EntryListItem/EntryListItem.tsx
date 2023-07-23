import { Col, Row } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IEntryModel } from '@modules/Entry/models/EntryModel';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import useConfirmModal from '@common/hooks/useConfirmModal';
import ImagePreview from '@common/components/ImagePreview';
import { useAuth } from '@common/contexts/AuthContext';
import { StyledEllipsisContainer } from '@common/styled';
import {
  StyledDate,
  StyledContentParagraph,
  StyledDropDownCol,
  StyledDropdown,
  StyledDropdownIconContainer,
  StyledListItem,
  StyledListItemRow,
  StyledSmallText,
  StyledTitle
} from '@common/components/ListItem/styled';

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
  const monthShort = dayjs(miliseconds).format('MMM');
  const monthDay = dayjs(miliseconds).format('D');
  const weekDayShort = dayjs(miliseconds).format('ddd');

  return (
    <>
      <StyledListItem $backgroundColor={entry.color}>
        <StyledListItemRow wrap={false}>
          <Col>
            <StyledDate>
              <StyledSmallText>{monthShort}</StyledSmallText>
              <div>{monthDay}</div>
              <StyledSmallText>{weekDayShort}</StyledSmallText>
            </StyledDate>
          </Col>
          <Col flex={1}>
            <StyledTitle level={5}>{entry.createdByUsername}</StyledTitle>
            {entry.imageURLs.length ? <ImagePreview srcs={entry.imageURLs} /> : null}
            <StyledContentParagraph>{entry.content}</StyledContentParagraph>
            <Row gutter={10}>
              {entry.tags.map((tag) => (
                <StyledEllipsisContainer as={Col} key={tag}>
                  <small>#{tag}</small>
                </StyledEllipsisContainer>
              ))}
            </Row>
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
