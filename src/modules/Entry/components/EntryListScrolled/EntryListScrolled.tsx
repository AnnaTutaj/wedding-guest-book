import { Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IEntryModel } from '@modules/Entry/models/EntryModel';
import EntryList from '../EntryList';
import { useIntl } from 'react-intl';
import Button from '@common/components/Button';
import { StyledFooter } from './styled';

interface IProps {
  entries: IEntryModel[];
  headerText: string;
  getNextEntries: () => void;
  loading: boolean;
  moreEntries: boolean;
  removeEntry: (id: string) => void;
  updateEntry: (entry: IEntryModel) => void;
}

const EntryListScrolled: React.FC<IProps> = ({
  entries,
  headerText,
  getNextEntries,
  loading,
  moreEntries,
  removeEntry,
  updateEntry
}) => {
  const intl = useIntl();

  return (
    <>
      {entries && entries.length ? (
        <>
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextEntries}
            hasMore={!loading && moreEntries}
            initialLoad={false}
          >
            <EntryList
              entries={entries}
              headerText={headerText}
              removeEntry={removeEntry}
              updateEntry={updateEntry}
            />
          </InfiniteScroll>
          <StyledFooter>
            {!loading && moreEntries ? (
              <Button type="primary" onClick={getNextEntries}>
                {intl.formatMessage({ id: 'common.list.loadMore' })}
              </Button>
            ) : null}

            {loading ? <Spin size="large" /> : null}
          </StyledFooter>
        </>
      ) : null}
    </>
  );
};

export default EntryListScrolled;
