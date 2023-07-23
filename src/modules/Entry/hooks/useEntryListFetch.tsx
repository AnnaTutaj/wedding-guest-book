import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import EntryModel from '@modules/Entry/models/EntryModel';
import { IEntryListFiltersModelDTO } from '../models/EntryListFiltersModel';
import { useCallback } from 'react';

interface IProps {
  filters?: IEntryListFiltersModelDTO | undefined;
  limitCount?: number;
}

const useEntryListFetch = () => {
  const limitFetch = useCallback(({ limitCount }: Pick<IProps, 'limitCount'>): number => {
    if (limitCount) {
      return limitCount;
    }

    if (limitCount === 0) {
      return 0;
    }

    return 10;
  }, []);

  const getEntries = async ({ filters, limitCount }: IProps) => {
    const conditions = [];
    //todo: add createdBy filter?
    if (filters?.color) {
      conditions.push(where('color', '==', filters.color));
    }

    if (filters?.tags) {
      conditions.push(where('tags', 'array-contains-any', filters.tags));
    }

    const _limit = limitFetch({ limitCount });
    if (_limit > 0) {
      conditions.push(limit(_limit));
    }

    const q = query(
      collection(db, 'entry').withConverter(EntryModel.converter),
      ...conditions,
      orderBy('createdAt', 'desc')
    );

    const querySnap = await getDocs(q);

    if (querySnap.docs.length === 0) {
      return [];
    }

    const entries = querySnap.docs.map((i) => EntryModel.build(i.data()));
    return entries;
  };

  return { getEntries };
};

export default useEntryListFetch;
