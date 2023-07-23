import { CategoryColorType } from '@common/containers/App/ColorPalette';

export interface IEntryListFiltersModel {
  color?: CategoryColorType;
  tags?: string[];
}

export interface IEntryListFiltersModelDTO {
  color?: CategoryColorType;
  tags?: string[];
}

class EntryListFiltersModel {
  static serialize({ color, tags }: IEntryListFiltersModel): IEntryListFiltersModelDTO {
    return {
      color: color || undefined,
      tags: tags && tags.length ? tags : undefined
    };
  }
}

export default EntryListFiltersModel;
