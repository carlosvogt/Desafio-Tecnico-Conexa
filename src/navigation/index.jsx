import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@theme';

import Routes from './Routes';

const Navigation = () => {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Routes />
    </NavigationContainer>
  );
};

export default Navigation;
