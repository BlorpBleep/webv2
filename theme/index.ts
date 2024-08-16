import { extendTheme } from '@chakra-ui/react';
import { theme as saasTheme } from '@saas-ui/react';

import components from './components';
import { fontSizes } from './foundations/typography';

import '@fontsource/inter/variable.css';

const styles = {
  global: (props: any) => ({
    body: {
      color: 'gray.900',
      bg: 'white',
      fontSize: 'lg',
      _dark: {
        color: 'white',
        bg: 'gray.900',
      },
    },
  }),
};

const overrides = {
  colors: {
    primary: {
      50: '#ebf8ff',  // very light blue
      100: '#ceedff', // lighter blue
      200: '#90cdf4', // light blue
      300: '#63b3ed', // soft blue
      400: '#4299e1', // bright blue
      500: '#3182ce', // main blue
      600: '#2b6cb0', // medium blue
      700: '#2c5282', // dark blue
      800: '#2a4365', // darker blue
      900: '#1A365D'  // deepest blue
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles,
  fontSizes,
  components,
};

export default extendTheme(overrides, saasTheme);
