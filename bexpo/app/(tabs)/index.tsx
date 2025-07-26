import { Counter } from '@/components/Counter';
import { View } from '@/components/base/View';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function HomeScreen() {
  return (
    <View className="bg-base flex-1 px-4 py-16">
      <Counter />
      <ThemeSwitcher />
    </View>
  );
}
