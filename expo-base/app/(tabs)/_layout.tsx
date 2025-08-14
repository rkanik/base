import { Tabs } from 'expo-router';
import React from 'react';
import { useThemeColors } from '@/components/base/Theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const screens = [
  {
    name: 'index',
    title: 'Home',
    icon: 'house',
  },
  {
    name: 'apps/index',
    title: 'Apps',
    icon: 'apps',
  },
  {
    name: 'menu/index',
    title: 'Menu',
    icon: 'menu',
  },
];

export default function Layout() {
  const { colors } = useThemeColors();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        headerStyle: {
          backgroundColor: colors.base2,
        },
        tabBarStyle: {
          height: 86,
          paddingTop: 4,
          backgroundColor: colors.base2,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          marginTop: 4,
        },
      }}>
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color }: any) => (
              <MaterialIcons size={30} name={screen.icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
