import { View, Button } from 'react-native';
import { ThemedText } from './ThemedText';
import { useMMKVNumber } from 'react-native-mmkv';

export const Counter = () => {
  const [count = 0, setCount] = useMMKVNumber('counter');
  return (
    <View className="flex-row items-center gap-2">
      <View className="flex-1">
        <Button title="-" onPress={() => setCount((count = 0) => count - 1)} />
      </View>
      <ThemedText className="flex-1 text-center">{count}</ThemedText>
      <View className="flex-1">
        <Button title="+" onPress={() => setCount((count = 0) => count + 1)} />
      </View>
    </View>
  );
};
