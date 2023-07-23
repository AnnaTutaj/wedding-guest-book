import { UserDispatchUnion } from '@common/redux/UserActions';
import { produce } from 'immer';
import _ from 'lodash';
import EntryModel from '@modules/Entry/models/EntryModel';
import { EntryAllListDispatchUnion } from './EntryAllListActions';
import { IEntryAllListState } from './EntryAllListInterface';
import { EntryAllListTypes } from './EntryAllListTypes';
import { UserTypes } from '@common/redux/UserType';

const initialState: IEntryAllListState = {
  data: [],
  isLoaded: false,
  isLoadingMore: false,
  hasMore: false,
  filters: {}
};

const EntryAllListReducer = (
  state = initialState,
  action: EntryAllListDispatchUnion | UserDispatchUnion
): IEntryAllListState =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserTypes.USER_LOG_OUT: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;
        draft.filters = initialState.filters;

        break;
      }

      case EntryAllListTypes.ENTRY_ALL_LIST_RELOAD: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;

        break;
      }

      case EntryAllListTypes.ENTRY_ALL_LIST_LOAD: {
        const nextEntries = action.payload.data.map((i) => EntryModel.build(i));
        const array = _.uniqBy([...draft.data, ...nextEntries], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.createdAt.seconds], ['desc']);
        draft.data = sortedArray;
        draft.isLoadingMore = false;
        draft.isLoaded = true;
        draft.hasMore = nextEntries && nextEntries.length > 1;

        break;
      }

      case EntryAllListTypes.ENTRY_ALL_LIST_ITEM_REMOVE: {
        draft.data = _.remove(draft.data, (i) => i.id !== action.payload.id);

        break;
      }

      case EntryAllListTypes.ENTRY_ALL_LIST_ITEM_UPDATE: {
        const array = draft.data.map((prevEntry) =>
          prevEntry.id === action.payload.updatedEntry.id ? action.payload.updatedEntry : prevEntry
        );

        // if createdBy changes, it cannot be added as the last fetched (cuz gaps risk)
        if (
          array[array.length - 1].id === action.payload.updatedEntry.id &&
          action.payload.entry.createdAt.seconds !== action.payload.updatedEntry.createdAt.seconds
        ) {
          array.pop();
          draft.hasMore = true;
        }

        const sortedArray = _.orderBy(array, [(item) => item.createdAt.seconds], ['desc']);
        draft.data = [...sortedArray];

        break;
      }

      case EntryAllListTypes.ENTRY_ALL_LIST_SET_FILTERS: {
        draft.filters = action.payload.filters;

        break;
      }
    }
  });

export default EntryAllListReducer;
