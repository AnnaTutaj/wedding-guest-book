import { Dispatch } from 'redux';
import { collection, query, where, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { IEntryListFiltersModel, IEntryListFiltersModelDTO } from '@modules/Entry/models/EntryListFiltersModel';
import EntryModel, { IEntryModel, IEntryModelDTO } from '@modules/Entry/models/EntryModel';
import { EntryAllListTypes } from './EntryAllListTypes';

const loadAction =
  ({
    lastFetchedEntry,
    filters,
    reload
  }: {
    lastFetchedEntry?: IEntryModel;
    filters: IEntryListFiltersModelDTO | undefined;
    reload?: boolean;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (reload) {
        dispatch(EntryAllListDispatch.reload());
      }

      const limitCount: number = 10;

      const startAfterEntry = lastFetchedEntry ? await getDoc(doc(db, 'entry', lastFetchedEntry.id)) : null;

      const whereConditions = [];
      if (filters?.color) {
        whereConditions.push(where('color', '==', filters.color));
      }

      if (filters?.tags) {
        whereConditions.push(where('tags', 'array-contains-any', filters.tags));
      }

      const q = startAfterEntry
        ? query(
            collection(db, 'entry').withConverter(EntryModel.converter),
            ...whereConditions,
            orderBy('createdAt', 'desc'),
            startAfter(startAfterEntry),
            limit(limitCount)
          )
        : query(
            collection(db, 'entry').withConverter(EntryModel.converter),
            ...whereConditions,
            orderBy('createdAt', 'desc'),
            limit(limitCount)
          );

      const querySnap = await getDocs(q);

      if (querySnap.docs.length === 0) {
        dispatch(EntryAllListDispatch.load([]));
      } else {
        const entries = querySnap.docs.map((i) => i.data());
        dispatch(EntryAllListDispatch.load(entries));
      }
    } catch (e) {}
  };

const removeAction = (entryId: string) => async (dispatch: Dispatch) => {
  dispatch(EntryAllListDispatch.remove(entryId));
};

const updateAction = (entry: IEntryModel) => async (dispatch: Dispatch) => {
  const entrySnap = await EntryModel.fetchById(entry.id);
  if (entrySnap.exists()) {
    const updatedEntry = EntryModel.build(entrySnap.data());
    dispatch(EntryAllListDispatch.update(entry, updatedEntry));
  }
};

const setFiltersAction = (filters: Partial<IEntryListFiltersModel>) => (dispatch: Dispatch) => {
  dispatch(EntryAllListDispatch.setFilters(filters));
};

export const EntryAllListDispatch = {
  reload: () => createActionHelper(EntryAllListTypes.ENTRY_ALL_LIST_RELOAD),
  load: (data: IEntryModelDTO[]) => createActionHelper(EntryAllListTypes.ENTRY_ALL_LIST_LOAD, { data }),
  remove: (id: string) => createActionHelper(EntryAllListTypes.ENTRY_ALL_LIST_ITEM_REMOVE, { id }),
  update: (entry: IEntryModel, updatedEntry: IEntryModel) =>
    createActionHelper(EntryAllListTypes.ENTRY_ALL_LIST_ITEM_UPDATE, { entry, updatedEntry }),
  setFilters: (filters: Partial<IEntryListFiltersModel>) =>
    createActionHelper(EntryAllListTypes.ENTRY_ALL_LIST_SET_FILTERS, { filters })
};

export type EntryAllListDispatchUnion = ActionsUnion<typeof EntryAllListDispatch>;

export default {
  loadAction,
  removeAction,
  updateAction,
  setFiltersAction
};
