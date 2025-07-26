import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme, vars } from 'nativewind';
import { View } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

export const themes = {
  default: {
    light: vars({
      '--color-base': '255, 255, 255',
      '--color-basef': '0, 0, 0',
    }),
    dark: vars({
      '--color-base': '0, 0, 0',
      '--color-basef': '255, 255, 255',
    }),
  },
  nativewind: {
    light: vars({
      '--color-base': '255, 45, 45',
      '--color-basef': '0, 255, 0',
    }),
    dark: vars({
      '--color-base': '0, 255, 0',
      '--color-basef': '255, 45, 45',
    }),
  },
};

export type TTheme = keyof typeof themes;
export const themeNames = Object.keys(themes) as TTheme[];

export const useTheme = () => {
  const [theme = 'default', setTheme] = useMMKVString('theme');
  return {
    theme: theme as TTheme,
    setTheme: setTheme as Dispatch<SetStateAction<TTheme>>,
  };
};

export const Theme = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const { colorScheme = 'dark' } = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={themes[theme][colorScheme]} className="flex-1">
        {children}
      </View>
    </ThemeProvider>
  );
};
