/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#24251f',
    background: '#f3eee4',
    backgroundElement: '#e4ded1',
    backgroundSelected: '#d7d0c1',
    textSecondary: '#69665b',
  },
  dark: {
    text: '#f0e7d5',
    background: '#1b1c1a',
    backgroundElement: '#242522',
    backgroundSelected: '#34362f',
    textSecondary: '#a69c8d',
  },
} as const;

export const RouteColors = {
  ink: '#0b0b0b',
  inkDeep: '#070707',
  panel: '#161616',
  panelRaised: '#222222',
  line: '#2d2d2d',
  text: '#ffffff',
  muted: '#777777',
  signal: '#e10600',
  signalSoft: 'rgba(225,6,0,0.12)',
  cyan: '#00d4e8',
  green: '#0d1a0d',
  amber: '#c8a84b',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
