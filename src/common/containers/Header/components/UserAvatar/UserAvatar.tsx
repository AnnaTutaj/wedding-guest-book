import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import SettingsModal from '../SettingsModal';
import { ISettingsModalProps } from '../SettingsModal/SettingsModal';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { faCog, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faUser as dummyUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledAvatar } from './styled';

const UserAvatar: React.FC = () => {
  const intl = useIntl();
  const { logout, userProfile } = useAuth();
  const [settingsModalConfig, setSettingsModalConfig] = useState<ISettingsModalProps>();

  const menuItems: DropdownMenuItemProps = [
    {
      key: 'userProfileGroup',
      title: userProfile.username || '',
      items: [
        {
          key: 'settings',
          item: {
            text: intl.formatMessage({ id: 'header.settings' }),
            icon: faCog
          },
          onClick: () => {
            setSettingsModalConfig({
              handleCancel: () => setSettingsModalConfig(undefined)
            });
          }
        },
        {
          key: 'logout',
          item: {
            text: intl.formatMessage({ id: 'header.logout' }),
            icon: faSignOut
          },
          onClick: () => {
            logout();
          }
        }
      ]
    }
  ];

  return (
    <>
      <Dropdown menuItems={menuItems}>
        <StyledAvatar
          size={40}
          icon={<FontAwesomeIcon icon={dummyUser} />}
          src={userProfile.pictureURL ? userProfile.pictureURL : undefined}
        />
      </Dropdown>

      {settingsModalConfig ? <SettingsModal {...settingsModalConfig} /> : null}
    </>
  );
};

export default UserAvatar;
