import { QueryDocumentSnapshot } from '@firebase/firestore';
import { db } from '@common/util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { adminIds } from '@common/constants/AdminIds';

export enum Language {
  pl = 'pl',
  en = 'en'
}

export interface IUserModel {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
  language: Language | undefined;
  isAdmin: boolean;
}

export interface IUserModelDTO {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
  language: Language | undefined;
}

class UserModel implements IUserModel {
  constructor(
    public id: string,
    public createdAt: {
      nanoseconds: number;
      seconds: number;
    },
    public pictureURL: string,
    public username: string,
    public language: Language | undefined,
    public isAdmin: boolean
  ) {}

  static build(dto: IUserModelDTO): IUserModel {
    return new UserModel(
      dto.id,
      dto.createdAt,
      dto.pictureURL || '',
      dto.username,
      dto.language,
      adminIds.indexOf(dto.id) > -1
    );
  }

  static converter = {
    toFirestore: (data: IUserModelDTO) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      return { id: snap.id, ...snap.data() } as IUserModelDTO;
    }
  };

  static fetchById = (id: string) => getDoc(doc(db, 'users', id).withConverter(UserModel.converter));
}

export default UserModel;
