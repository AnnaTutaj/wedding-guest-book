import { IModule } from 'redux-dynamic-modules';
import { IEntryAllListOwnState } from './EntryAllListInterface';
import EntryAllListReducer from './EntryAllListReducer';

const EntryAllListModule: IModule<IEntryAllListOwnState> = {
  id: 'entryAllListModule',
  reducerMap: {
    entryAllList: EntryAllListReducer
  }
};

export default EntryAllListModule;
