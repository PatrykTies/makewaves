import {
  createTheme,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';

const palette = {
  white: 'white',
  yellow: 'yellow',
  black: '#0B0B0B',
  grey: '#909190',
  blue: '#0000ff',
  red: 'red',
  none: 'transparent',
};

const fontSize = {
  sm: 8,
  body: 16,
  lg: 20,
  xl: 28,
};

const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
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
    yellow: palette.yellow,
  },
  spacing: spacing,
  fontSize: fontSize,
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
      fontSize: fontSize.xl,
      lineHeight: 42.5,
      color: 'textPrimary',
    },
    h1_deco: {
      fontFamily: 'SFProDisplay-SemiBold',
      fontWeight: '400',
      fontSize: fontSize.xl,
      lineHeight: 42.5,
      color: 'textDecorated',
    },
    h2: {
      fontFamily: 'SFProDisplay-Regular',
      fontSize: fontSize.lg,
      lineHeight: 36,
      color: 'textPrimary',
    },
    body: {
      fontFamily: 'SFProDisplay-Regular',
      fontSize: fontSize.body,
      lineHeight: 28,
      color: 'textPrimary',
    },
    cta: {
      fontFamily: 'SFProDisplay-Semibold',
      fontSize: fontSize.body,
      lineHeight: 28,
      letterSpacing: 1,
      color: 'textPrimary',
    },
    inputError: {
      fontFamily: 'SFProDisplay-Regular',
      fontSize: fontSize.body,
      lineHeight: 22,
      color: 'error',
      position: 'absolute',
      bottom: -spacing.lg,
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
