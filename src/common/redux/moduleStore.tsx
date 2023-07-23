import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';
import LayoutModule from './modules/Layout/LayoutModule';
import EntryAllListModule from '@modules/Entry/redux/EntryAllList/EntryAllListModule';

export const moduleStore: IModuleStore<any> = createStore(
  {
    extensions: [getThunkExtension()]
  },
  LayoutModule,
  EntryAllListModule
);

export default moduleStore;
