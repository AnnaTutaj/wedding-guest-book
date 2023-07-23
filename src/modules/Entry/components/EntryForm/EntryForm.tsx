import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Row, Col } from 'antd';
import { IEntryFormModel } from '@modules/Entry/models/EntryFormModel';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormModal from '@common/components/FormModal';
import Button from '@common/components/Button';
import Select from '@common/components/Select';
import { StyledIconImageRemove } from './styled';

const { TextArea } = Input;

interface IProps {
  title: string;
  initialValues: Partial<IEntryFormModel>;
  onFinish: (values: IEntryFormModel) => Promise<void>;
  handleCancel: () => void;
}

const EntryForm: React.FC<IProps> = ({ title, initialValues, onFinish, handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const maxLengthCreatedByUsername = 100;
  const maxContentLength = 5000;

  const handleOnPaste = (e: any, filedNumber: number) => {
    const pastedText = e.clipboardData.getData('Text');
    if (pastedText.includes('https://drive.google.com/file/d/')) {
      e.preventDefault();
      const splitText = pastedText.split('/');
      const convertedUrls = form.getFieldValue('imageURLs');
      convertedUrls[filedNumber] = `https://drive.google.com/uc?id=${splitText[5]}`;
      form.setFieldValue('imageURLs', convertedUrls);
    }
  };

  return (
    <FormModal<IEntryFormModel>
      modalProps={{ title, onCancel: handleCancel }}
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText={intl.formatMessage({ id: 'entry.form.submit' })}
    >
      <>
        <Form.Item
          label={intl.formatMessage({ id: 'entry.form.field.content' })}
          name="content"
          rules={[
            {
              max: maxContentLength,
              message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxContentLength })
            }
          ]}
        >
          <TextArea rows={6} showCount maxLength={maxContentLength} />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'entry.form.field.tags' })} name="tags">
          <Select<string[]>
            type="tag"
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) })}
          />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.color' })} name="color">
          <Select<CategoryColorType> type="color" />
        </Form.Item>
        {/* //todo: maybe later uncomment */}
        {false ? (
          <Form.List name="imageURLs">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    key={field.key}
                    label={index === 0 ? intl.formatMessage({ id: 'entry.form.field.links' }) : ''}
                  >
                    <Row gutter={20} align="middle" wrap={false}>
                      <Col flex={1}>
                        <Form.Item
                          {...field}
                          name={[field.name]}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: intl.formatMessage({ id: 'common.form.field.requiredOrDelete.error' })
                            },
                            {
                              type: 'url',
                              message: intl.formatMessage({ id: 'common.form.field.url.error' })
                            }
                          ]}
                          noStyle
                        >
                          <Input onPaste={(e) => handleOnPaste(e, field.name)} />
                        </Form.Item>
                      </Col>
                      <Col>
                        <StyledIconImageRemove icon={faTrash} onClick={() => remove(field.name)} />
                      </Col>
                    </Row>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    text={intl.formatMessage({ id: 'entry.form.field.addLink' })}
                  />
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        ) : null}
        <Form.Item
          label={intl.formatMessage({ id: 'entry.form.field.createdByUsername' })}
          name="createdByUsername"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
            {
              max: maxLengthCreatedByUsername,
              message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxLengthCreatedByUsername })
            }
          ]}
        >
          <Input showCount maxLength={maxLengthCreatedByUsername} />
        </Form.Item>
      </>
    </FormModal>
  );
};

export default EntryForm;
