import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import EntryCreateModal from './components/EntryCreateModal';
import EntryAllList from './components/EntryAllList/EntryAllList';
import { IEntryCreateModalProps } from '@modules/Entry/components/EntryCreateModal/EntryCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import EntryListFilters from '@modules/Entry/components/EntryListFilters/EntryListFilters';
import EntryListFiltersModel, { IEntryListFiltersModelDTO } from '@modules/Entry/models/EntryListFiltersModel';
import EntryAllListActions from './redux/EntryAllList/EntryAllListActions';
import { IEntryAllListOwnState } from './redux/EntryAllList/EntryAllListInterface';
import Button from '@common/components/Button';
import { StyledHeaderContainer, StyledHeaderFilterContainer } from '@common/components/Header/styled';

const Entry: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [entryCreateModalConfig, setEntryCreateModalConfig] = useState<IEntryCreateModalProps>();

  const { isLoaded, filters } = useSelector(({ entryAllList }: IEntryAllListOwnState) => entryAllList, shallowEqual);

  const resetList = useCallback(() => {
    const serializedFilters = EntryListFiltersModel.serialize(filters);

    EntryAllListActions.loadAction({ filters: serializedFilters, reload: true })(dispatch);
  }, [dispatch, filters]);

  const refreshListAfterChangeFilters = useCallback(
    (newFilters: IEntryListFiltersModelDTO) => {
      EntryAllListActions.loadAction({ filters: newFilters, reload: true })(dispatch);
    },
    [dispatch]
  );

  const handleCreateEntry = () => {
    setEntryCreateModalConfig({
      handleCancel: () => setEntryCreateModalConfig(undefined),
      handleSubmit: async () => {
        setEntryCreateModalConfig(undefined);
        resetList();
      }
    });
  };

  //init
  useEffect(() => {
    if (!isLoaded) {
      resetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StyledHeaderContainer>
        <Button
          onClick={() => {
            setShowFilters((prevState) => !prevState);
          }}
          icon={<FontAwesomeIcon icon={faFilter} />}
          text={intl.formatMessage({ id: 'common.filters' })}
        />

        <Button
          type="primary"
          onClick={() => handleCreateEntry()}
          icon={<FontAwesomeIcon icon={faPlus} />}
          text={intl.formatMessage({ id: 'entry.create.button' })}
        />
      </StyledHeaderContainer>

      <StyledHeaderFilterContainer $showFilters={showFilters}>
        <EntryListFilters
          initialValues={filters}
          onFinish={(values) => {
            const serializedFilters = EntryListFiltersModel.serialize(values);
            const serializedCurrentFilters = EntryListFiltersModel.serialize(filters);

            if (!_.isEqual(serializedFilters, serializedCurrentFilters)) {
              EntryAllListActions.setFiltersAction(values)(dispatch);
              refreshListAfterChangeFilters(serializedFilters);
            }
          }}
        />
      </StyledHeaderFilterContainer>

      <EntryAllList />

      {entryCreateModalConfig ? <EntryCreateModal {...entryCreateModalConfig} /> : null}
    </>
  );
};

export default Entry;
