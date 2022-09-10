import merge from 'deepmerge';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const BaseTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const GenericThemeColors = {
  primary: '#3558CF',
  secondary: '#1F137D',
  warning: '#FF9800',
  background: '#FFF',
  success: '#4CAF50',
  error: '#F44336',
  gray: '#D9D2D0',
  darkGray: '#575453',
  whiteBlue: '#DDEFFC',
};

const GenericTheme = merge(BaseTheme, {
  colors: {
    ...GenericThemeColors,
  },
});

export default {
  generic: GenericTheme,
};
