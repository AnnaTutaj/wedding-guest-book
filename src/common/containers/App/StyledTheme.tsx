import React, { useContext } from 'react';
import { theme } from 'antd';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { layout } from './layout';
import GlobalStyle from './GlobalStyle';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { IUserTheme } from '@common/contexts/UserProfile/UserProfileContext';

export interface IProps {
  children: JSX.Element;
  customizeColorsPreview?: IUserTheme;
}

const StyledTheme: React.FC<IProps> = ({ children, customizeColorsPreview }) => {
  const { token } = theme.useToken();
  const { darkMode, footerHeight } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();

  return (
    <ThemeProvider
      theme={{
        antd: token,
        layout: { ...layout(darkMode, userProfile.theme), footerHeight: footerHeight }
      }}
    >
      <GlobalStyle $darkMode={darkMode} />
      {children}
    </ThemeProvider>
  );
};

export default StyledTheme;
