import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme, vars } from 'nativewind'
import { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { View } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { Text } from './Text'

const colors = <T extends Record<string, string>>(colors: T) => {
  return {
    ...colors,
    vars: vars(
      Object.entries(colors).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`--${key}`]: value.replace('rgb(', '').replace(')', ''),
        }),
        {}
      )
    ),
  }
}

export const themes = {
  default: {
    light: colors({
      base: 'rgb(245, 245, 245)',
      basef: 'rgb(0, 0, 0)',
      base2: 'rgb(255, 255, 255)',
      base2f: 'rgb(0, 0, 0)',
      accent: 'rgb(233, 30, 99)',
      accentf: 'rgb(255, 255, 255)',
    }),
    dark: colors({
      base: 'rgb(33, 33, 33)',
      basef: 'rgb(255, 255, 255)',
      base2: 'rgb(45, 45, 45)',
      base2f: 'rgb(255, 255, 255)',
      accent: 'rgb(233, 30, 99)',
      accentf: 'rgb(255, 255, 255)',
    }),
  },
}

export type TTheme = keyof typeof themes
export type TThemeColor = keyof typeof themes.default.light

export const themeNames = Object.keys(themes) as TTheme[]

export const useTheme = () => {
  const [theme = 'default', setTheme] = useMMKVString('theme')
  return {
    theme: theme as TTheme,
    setTheme: setTheme as Dispatch<SetStateAction<TTheme>>,
  }
}

export const useThemeColors = () => {
  const { theme } = useTheme()
  const { colorScheme = 'dark' } = useColorScheme()
  return { colors: themes[theme][colorScheme] }
}

export const Theme = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme()
  const { colorScheme = 'dark' } = useColorScheme()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={themes[theme][colorScheme].vars} className="flex-1">
        <Text.Provider className="text-basef">{children}</Text.Provider>
      </View>
    </ThemeProvider>
  )
}
