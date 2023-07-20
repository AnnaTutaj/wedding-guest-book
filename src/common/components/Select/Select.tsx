import { Select as AntDSelect, SelectProps } from 'antd';
import { useCallback } from 'react';
import useSelectOptionColor from './hooks/useSelectOptionColor';
import useSelectOptionTag from './hooks/useSelectOptionTag';

export const { Option } = AntDSelect;
type SelectType = 'color' | 'tag';

export interface ISelectProps<T> extends SelectProps<T> {
  type?: SelectType;
}

const Select = <T extends {}>({ type, children, ...props }: ISelectProps<T>) => {
  const { selectOptionsColor } = useSelectOptionColor();
  const { selectOptionsTag } = useSelectOptionTag();

  const renderOptions = useCallback(
    (type: SelectType): JSX.Element[] => {
      switch (type) {
        case 'color':
          return selectOptionsColor;

        case 'tag':
          return selectOptionsTag;
      }
    },
    [selectOptionsColor, selectOptionsTag]
  );

  return <AntDSelect {...props}>{type ? renderOptions(type) : children}</AntDSelect>;
};

export default Select;
