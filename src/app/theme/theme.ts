import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Text: {
      baseStyle: {
        fontSize: {
          base: '16px',
          sm: '16px',
          md: '16px',
          lg: '20px',
          xl: '24px',
        },
      },
    },
  },
});

export default theme;
