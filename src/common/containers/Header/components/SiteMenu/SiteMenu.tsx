import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { User as FirebaseUser } from 'firebase/auth';
import { Paths } from '@common/constants/Paths';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledMenu } from './styled';

export interface ISiteMenuProps {
  isMobile?: boolean;
  userAuth: FirebaseUser | null;
  openRegisterModal: () => void;
  hideDrawer?: () => void;
}

const SiteMenu: React.FC<ISiteMenuProps> = ({ isMobile, userAuth, openRegisterModal, hideDrawer }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentKeys, setCurrentKeys] = useState<string[]>([]);

  useEffect(() => {
    const pathNameParts = location.pathname.split('/');
    setCurrentKeys([pathNameParts[1] || 'witaj']);
  }, [location.pathname]);

  const items = useMemo(() => {
    const commonItems = isMobile
      ? [
          {
            key: 'witaj',
            label: intl.formatMessage({ id: 'header.home' }),
            onClick: () => {
              navigate(Paths.Welcome);
              if (hideDrawer) {
                hideDrawer();
              }
            }
          }
        ]
      : [];

    const itemsByAuth = userAuth
      ? [
          {
            key: 'wpisy',
            label: intl.formatMessage({ id: 'header.entries' }),
            onClick: () => {
              navigate(Paths.Entry);
              if (hideDrawer) {
                hideDrawer();
              }
            }
          },
          {
            key: 'album-wspomnien',
            label: intl.formatMessage({ id: 'header.photos' }),
            onClick: () => {
              navigate(Paths.Photos);
              if (hideDrawer) {
                hideDrawer();
              }
            }
          }
        ]
      : [
          {
            key: 'register',
            label: intl.formatMessage({ id: 'header.register' }),
            onClick: () => {
              openRegisterModal();
              if (hideDrawer) {
                hideDrawer();
              }
            }
          }
        ];

    return [...commonItems, ...itemsByAuth];
  }, [hideDrawer, intl, isMobile, navigate, openRegisterModal, userAuth]);

  return (
    <StyledMenu
      $isMobile={isMobile}
      mode={isMobile ? 'vertical' : 'horizontal'}
      items={items}
      disabledOverflow
      selectedKeys={currentKeys}
    />
  );
};

export default SiteMenu;
