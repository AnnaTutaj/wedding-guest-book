import { IEntryListFiltersModel } from './../../models/EntryListFiltersModel';
import { IEntryModel } from './../../models/EntryModel';

export interface IEntryAllListOwnState {
  entryAllList: IEntryAllListState;
}

export interface IEntryAllListState {
  data: IEntryModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  filters: Partial<IEntryListFiltersModel>;
}
