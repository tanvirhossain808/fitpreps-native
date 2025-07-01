import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
// import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

import {
  createTamagui,
  styled,
  SizableText,
  H1,
  YStack,
  Button as ButtonTamagui,
  createFont,
} from 'tamagui';

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
  lazy: {
    damping: 20,
    type: 'spring',
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
});

const headingFont = createInterFont();

const bodyFont = createInterFont();

const oswaldFont = createFont({
  face: {
    700: { normal: 'Oswald-bold', fontWeight: '700' },
  },
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
  },
  weight: {
    400: '400',
    500: '500',
    600: '600',
    700: '700',
  },
});

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
});

export const Main = styled(YStack, {
  flex: 1,
  justifyContent: 'space-between',
  maxWidth: 960,
});

// export const Title = styled(H1, {
//   color: '#000',
//   size: '$12',
// });

// export const Subtitle = styled(SizableText, {
//   color: '#38434D',
//   size: '$9',
// });
export const fonts = createFont({
  face: {
    400: { normal: 'Gilroy-Regular' },
    500: { normal: 'Gilroy-Medium' },
    600: { normal: 'Gilroy-SemiBold' },
    700: { normal: 'Gilroy-Bold' },
    800: { normal: 'Gilroy-ExtraBold' },
    oswald: { normal: 'Oswald-bold', fontWeight: '700' },
    // 300: { normal: 'ClashDisplayLight' },
  },
  body: 'Gilroy-Regular,Gilroy-Medium',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
  },
  weight: {
    400: '400',
    500: '500',
    600: '600',
    700: '700',
  },
});

export const Button = styled(ButtonTamagui, {
  backgroundColor: '#6366F1',
  borderRadius: 28,
  hoverStyle: {
    backgroundColor: '#5a5fcf',
  },
  pressStyle: {
    backgroundColor: '#5a5fcf',
  },
  maxWidth: 500,

  // Shaddows
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  // Button text
  color: '#FFFFFF',
  fontWeight: '600', // Is not passed down to the text. Probably a bug in Tamagui: https://github.com/tamagui/tamagui/issues/1156#issuecomment-1802594930
  fontSize: 16,
});

const config = createTamagui({
  light: {
    color: {
      background: 'gray',
      text: 'red',
    },
  },
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    // family:""
    body: fonts,
    heading: headingFont,
    oswald: oswaldFont,
  },
  themes: {
    ...themes,
    dark: {
      color: '#1E1F20',
      background: 'white',
      trackingPrimary: '#588DF5',
    },
    light: {
      color: '#1E1F20',
      background: 'white',
      'tracking-primary': '#588DF5',
    },
  },
  tokens,
  media: createMedia({
    xs: { maxWidth: 350 },
    sm: { maxWidth: 420 },
    smm: { maxWidth: 600 },
    lm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },

    gtXs: { minWidth: 661 },
    gtSm: { minWidth: 801 },
    gtMd: { minWidth: 1021 },
    gtLg: { minWidth: 1281 },

    short: { maxHeight: 820 },
    tall: { minHeight: 820 },

    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
