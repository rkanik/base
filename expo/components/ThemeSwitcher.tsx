import { View } from '@/components/base/View';
import { Text } from './base/Text';
import { useColorScheme } from 'nativewind';
import { Button } from 'react-native';
import { themeNames, useTheme } from './base/Theme';

const colorSchemes = [
  {
    name: 'light',
    value: 'light',
  },
  {
    name: 'dark',
    value: 'dark',
  },
  {
    name: 'system',
    value: 'system',
  },
] as const;

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { colorScheme = 'light', setColorScheme } = useColorScheme();
  return (
    <View className="gap-4 py-4">
      <View className="bg-base border p-4">
        <Text className="text-basef">Theme: {theme}</Text>
        <View className="flex-row gap-2">
          {themeNames.map((theme) => (
            <Button key={theme} onPress={() => setTheme(theme)} title={theme} />
          ))}
        </View>
      </View>
      <View className="bg-base border p-4">
        <Text className="text-basef">Color Scheme: {colorScheme}</Text>
        <View className="flex-row gap-2">
          {colorSchemes.map(({ name, value }) => (
            <Button key={value} onPress={() => setColorScheme(value)} title={name} />
          ))}
        </View>
      </View>
    </View>
  );
};
