import { Collapse, CollapseProps, Space } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { StyledIframe, StyledImage } from './styled';
import { Link } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import aiNarrow from '@assets/aiNarrow.jpg';

const Support: React.FC = () => {
  const intl = useIntl();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'support.question1' }),
      children: (
        <>
          <StyledIframe
            src="https://www.youtube.com/embed/LL7k5ohMgYk"
            title="A Komu to potrzebne? A dlaczego?"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
          <div>{intl.formatMessage({ id: 'support.question1.answer' })}</div>
          <ul>
            <li>{intl.formatMessage({ id: 'support.question1.answer.reason1' })}</li>
            <li>{intl.formatMessage({ id: 'support.question1.answer.reason2' })}</li>
            <li>{intl.formatMessage({ id: 'support.question1.answer.reason3' })}</li>
          </ul>
        </>
      )
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'support.question2' }),
      children: (
        <Space wrap>
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png"
            alt="React"
            title="React"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png"
            alt="Redux"
            title="Redux"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png"
            alt="HTML"
            title="HTML"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png"
            alt="CSS"
            title="CSS"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png"
            alt="GitHub"
            title="GitHub"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png"
            alt="Visual Studio Code"
            title="Visual Studio Code"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png"
            alt="Firebase"
            title="Firebase"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png"
            alt="JavaScript"
            title="JavaScript"
          />
          <img
            width="50"
            src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png"
            alt="TypeScript"
            title="TypeScript"
          />
        </Space>
      )
    },
    {
      key: '3',
      label: intl.formatMessage({ id: 'support.question3' }),
      children: (
        <>
          <StyledImage src={aiNarrow} />
          <div>
            {intl.formatMessage(
              { id: 'support.question3.answer' },
              {
                aiLink: (
                  <a href="https://www.fotor.com/images/create" target="_blank" rel="noreferrer">
                    AI
                  </a>
                ),
                photosLink: <Link to={Paths.Photo}>{intl.formatMessage({ id: 'header.photos.genitiveCase' })}</Link>
              }
            )}
          </div>
        </>
      )
    }
  ];

  return <Collapse items={items} defaultActiveKey={['1']} />;
};

export default Support;
