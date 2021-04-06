import {
  createTheme,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';

const palette = {
  white: 'white',
  black: '#0B0B0B',
  grey: '#909190',
  blue: '#0000ff',
  red: 'red',
  none: 'transparent',
};

const theme = createTheme({
  colors: {
    primaryBckgr: palette.white,
    secondaryBckgr: palette.grey,
    textPrimary: palette.black,
    textPrimaryInverse: palette.white,
    textDecorated: palette.blue,
    primary: palette.blue,
    primary_inverse: palette.white,
    none: palette.none,
    black: palette.black,
    shadow: palette.grey,
    error: palette.red,
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  fontSize: {
    sm: 8,
    md: 16,
    lg: 20,
    xl: 28,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  cardVariants: {
    shadow_md: {
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 10,
    },
    shadow_s: {
      shadowColor: 'shadow',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 3,
      shadowOpacity: 0.26,
      elevation: 6,
    },
  },
  textVariants: {
    h1: {
      fontFamily: 'SFProDisplay-SemiBold',
      fontWeight: '400',
      fontSize: 28,
      lineHeight: 42.5,
      color: 'textPrimary',
    },
    h1_deco: {
      fontFamily: 'SFProDisplay-SemiBold',
      fontWeight: '400',
      fontSize: 28,
      lineHeight: 42.5,
      color: 'textDecorated',
    },
    subheader: {
      fontFamily: 'ShopifySans-SemiBold',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    body: {
      fontFamily: 'SFProDisplay-Regular',
      fontSize: 16,
      lineHeight: 28,
      color: 'textPrimary',
    },
    cta: {
      fontFamily: 'SFProDisplay-Regular',
      fontSize: 16,
      lineHeight: 28,
      letterSpacing: 2,
      color: 'textPrimary',
    },
    error: {
      fontFamily: 'SFProDisplay-Regular',
      fontSize: 16,
      lineHeight: 22,
      color: 'error',
    },
  },
});

export const Box = createBox();
export const Text = createText();
export const Card = createRestyleComponent(
  [createVariant({themeKey: 'cardVariants'})],
  Box,
);

export default theme;
