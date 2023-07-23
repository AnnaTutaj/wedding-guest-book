import React from 'react';
import { IEntryModel } from '@modules/Entry/models/EntryModel';
import EntryListItem from './EntryListItem/EntryListItem';
import { StyledList } from '@common/components/List/styled';
import { StyledHeaderText } from '@common/components/HeaderText/styled';

interface IProps {
  entries: IEntryModel[];
  headerText: string;
  removeEntry?: (id: string) => void;
  updateEntry?: (item: IEntryModel) => void;
}

const EntryList: React.FC<IProps> = ({ entries, headerText, removeEntry, updateEntry }) => {
  return (
    <StyledList
      header={<StyledHeaderText>{headerText}</StyledHeaderText>}
      dataSource={entries}
      renderItem={(item) => {
        return (
          <EntryListItem entry={item} removeEntry={removeEntry} updateEntry={updateEntry} />
        );
      }}
    />
  );
};

export default EntryList;
