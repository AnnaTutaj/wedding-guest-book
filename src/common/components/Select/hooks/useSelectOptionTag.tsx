import { Select } from 'antd';
import { useMemo } from 'react';

const { Option } = Select;

//todo: delete if not needed
const useSelectOptionTag = () => {
  const selectOptionsTag = useMemo(() => {
    const allowedTags: string[] = [];
    return allowedTags.map((tag) => <Option key={tag}>{tag}</Option>);
  }, []);

  return { selectOptionsTag };
};

export default useSelectOptionTag;
