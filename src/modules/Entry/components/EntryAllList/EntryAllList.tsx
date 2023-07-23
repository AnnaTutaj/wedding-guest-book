import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import EntryListScrolled from '../EntryListScrolled';
import { IEntryModel } from '@modules/Entry/models/EntryModel';
import { IEntryUpdateModalProps } from '@modules/Entry/components/EntryUpdateModal/EntryUpdateModal';
import EntryUpdateModal from '@modules/Entry/components/EntryUpdateModal/EntryUpdateModal';
import EntryListFiltersModel from '@modules/Entry/models/EntryListFiltersModel';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IEntryAllListOwnState } from '@modules/Entry/redux/EntryAllList/EntryAllListInterface';
import EntryAllListActions from '@modules/Entry/redux/EntryAllList/EntryAllListActions';

const EntryAllList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { data, isLoaded, isLoadingMore, hasMore, filters } = useSelector(
    ({ entryAllList }: IEntryAllListOwnState) => entryAllList,
    shallowEqual
  );

  const [entryUpdateModalConfig, setEntryUpdateModalConfig] = useState<IEntryUpdateModalProps>();

  const getLastFetchedEntry = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextEntries = async () => {
    const lastFetchedEntry = getLastFetchedEntry();
    const serializedFilters = EntryListFiltersModel.serialize(filters);

    EntryAllListActions.loadAction({
      filters: serializedFilters,
      lastFetchedEntry
    })(dispatch);
  };

  const removeEntry = (id: string) => {
    EntryAllListActions.removeAction(id)(dispatch);
  };

  const handleUpdateSubmit = async (entry: IEntryModel) => {
    EntryAllListActions.updateAction(entry)(dispatch);
  };

  const updateEntry = (item: IEntryModel) => {
    setEntryUpdateModalConfig({
      handleCancel: () => setEntryUpdateModalConfig(undefined),
      handleSubmit: () => {
        setEntryUpdateModalConfig(undefined);
        handleUpdateSubmit(item);
      },
      entry: item
    });
  };

  if (!isLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {data && data.length ? (
        <EntryListScrolled
          headerText={intl.formatMessage({ id: 'entry.all.list.title' })}
          entries={data}
          loading={isLoadingMore}
          getNextEntries={getNextEntries}
          moreEntries={hasMore}
          removeEntry={removeEntry}
          updateEntry={updateEntry}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'entry.all.list.empty' })} />
      )}

      {entryUpdateModalConfig ? <EntryUpdateModal {...entryUpdateModalConfig} /> : null}
    </>
  );
};

export default EntryAllList;
