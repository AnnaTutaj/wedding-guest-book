import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { IEntryModel } from './EntryModel';
import { FieldValue, serverTimestamp } from 'firebase/firestore';

export interface IEntryFormModel {
  createdByUsername: string;
  content: string;
  color: CategoryColorType;
  tags: string[];
  imageURLs: string[];
}

export interface IEntryFormModelDTO {
  createdByUsername: string;
  content: string;
  createdByUid: string;
  createdByPictureURL: string;
  createdAt: FieldValue;
  color: CategoryColorType;
  tags: string[];
  imageURLs: string[];
}

class EntryFormModel {
  static serializeToCreate({
    createdByUid,
    createdByPictureURL,
    createdByUsername,
    content,
    color,
    tags,
    imageURLs
  }: IEntryFormModel & {
    createdByUid: string;
    createdByPictureURL: string;
  }): IEntryFormModelDTO {
    return {
      createdByUid,
      createdByUsername: createdByUsername || '',
      createdByPictureURL: createdByPictureURL || '',
      content: content || '',
      createdAt: serverTimestamp(),
      color: color || 'default',
      tags: tags || [],
      imageURLs: imageURLs || []
    };
  }

  static serializeToUpdate({
    createdByUsername,
    content,
    color,
    tags,
    imageURLs
  }: IEntryFormModel): Partial<IEntryFormModelDTO> {
    return {
      createdByUsername: createdByUsername,
      content: content || '',
      color: color || 'default',
      tags: tags || [],
      imageURLs: imageURLs || []
    };
  }

  static build(data: IEntryModel): IEntryFormModel {
    return {
      createdByUsername: data.createdByUsername,
      content: data.content || '',
      color: data.color ? data.color : 'default',
      tags: data.tags ? data.tags : [],
      imageURLs: data.imageURLs ? data.imageURLs : []
    };
  }
}

export default EntryFormModel;
