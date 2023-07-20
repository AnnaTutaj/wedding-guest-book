import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';
import LayoutModule from './modules/Layout/LayoutModule';

//todo: add here e.g. Entry Module
export const moduleStore: IModuleStore<any> = createStore(
  {
    extensions: [getThunkExtension()]
  },
  LayoutModule,
);

export default moduleStore;
