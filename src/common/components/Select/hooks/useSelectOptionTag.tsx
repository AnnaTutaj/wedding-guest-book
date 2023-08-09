import { Select } from 'antd';
import { useMemo } from 'react';

const { Option } = Select;

const useSelectOptionTag = () => {
  const selectOptionsTag = useMemo(() => {
    const allowedTags: string[] = ['życzenia', 'poradymałżeńskie', 'wspomnienia'];
    return allowedTags.map((tag) => <Option key={tag}>{tag}</Option>);
  }, []);

  return { selectOptionsTag };
};

export default useSelectOptionTag;
