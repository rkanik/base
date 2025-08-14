import { Text } from '@/components/base/Text';
import { View } from '@/components/base/View';
import { Link } from 'expo-router';

const apps = [
  {
    name: 'Contacts',
    description: 'App 1 description',
    icon: '🚀',
    href: '/apps/contacts',
  },
  {
    name: 'Messages',
    description: 'App 2 description',
    icon: '🚀',
    href: '/apps/messages',
  },
];

export default function Screen() {
  return (
    <View className="flex-1 bg-base p-4">
      <View className="flex-1 flex-row flex-wrap gap-4">
        {apps.map((app) => (
          <Link href={app.href as any} key={app.name}>
            <View className="rounded bg-base2 p-4 shadow">
              <Text>{app.name}</Text>
            </View>
          </Link>
        ))}
      </View>
    </View>
  );
}
