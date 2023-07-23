import { QueryDocumentSnapshot } from '@firebase/firestore';
import { db } from '@common/util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CategoryColorType } from '@common/containers/App/ColorPalette';

export interface IEntryModel {
  id: string;
  content: string | undefined;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  createdByUid: string;
  createdByPictureURL: string | undefined;
  createdByUsername: string;
  color: CategoryColorType;
  tags: string[];
  imageURLs: string[];
}

export interface IEntryModelDTO {
  id: string;
  content?: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  createdByUid: string;
  createdByPictureURL?: string;
  createdByUsername: string;
  color?: CategoryColorType;
  tags?: string[];
  imageURLs?: string[];
}

class EntryModel implements IEntryModel {
  constructor(
    public id: string,
    public content: string | undefined,
    public createdAt: {
      nanoseconds: number;
      seconds: number;
    },
    public createdByUid: string,
    public createdByPictureURL: string | undefined,
    public createdByUsername: string,
    public color: CategoryColorType,
    public tags: string[],
    public imageURLs: string[]
  ) {}

  static build(dto: IEntryModelDTO): IEntryModel {
    return new EntryModel(
      dto.id,
      dto.content || undefined,
      dto.createdAt,
      dto.createdByUid,
      dto.createdByPictureURL || undefined,
      dto.createdByUsername,
      dto.color || 'default',
      dto.tags || [],
      dto.imageURLs || []
    );
  }

  static converter = {
    toFirestore: (data: IEntryModelDTO) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      return { id: snap.id, ...snap.data() } as IEntryModelDTO;
    }
  };

  static fetchById = (id: string) => getDoc(doc(db, 'entry', id).withConverter(EntryModel.converter));
}

export default EntryModel;
