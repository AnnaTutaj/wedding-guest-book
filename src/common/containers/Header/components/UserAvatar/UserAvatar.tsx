import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import SettingsModal from '../SettingsModal';
import { ISettingsModalProps } from '../SettingsModal/SettingsModal';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { faCog, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { StyledAvatar } from './styled';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';

const UserAvatar: React.FC = () => {
  const intl = useIntl();
  const { logout } = useAuth();
  const { userProfile } = useUserProfile();
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
        <StyledAvatar size={40} src={userProfile.pictureURL ? userProfile.pictureURL : undefined}>
          {!userProfile.pictureURL
            ? userProfile.username
                .toUpperCase()
                .split(' ')
                .map((i) => i.charAt(0))
            : null}
        </StyledAvatar>
      </Dropdown>

      {settingsModalConfig ? <SettingsModal {...settingsModalConfig} /> : null}
    </>
  );
};

export default UserAvatar;
