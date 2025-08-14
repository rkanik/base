import { Text } from '@/components/base/Text'
import { View } from '@/components/base/View'
import { Stack } from 'expo-router'
import * as Contacts from 'expo-contacts'
import { Fragment, useEffect, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { Pressable } from 'react-native'
// import { useThemeColors } from '@/components/base/Theme'

const ContactItem = ({ item }: { item: Contacts.Contact }) => {
  // const { colors } = useThemeColors()
  return (
    <Pressable onPress={() => {}} android_ripple={{}} className="flex-1 flex-row gap-4 bg-base p-4">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-base2">
        <Text className="text-base2f">{item.name?.[0]?.toUpperCase()}</Text>
      </View>
      <View>
        <Text>{item.name}</Text>
        <Text>{item.phoneNumbers?.[0]?.number}</Text>
        {!!item.emails?.length && <Text>{item.emails?.[0]?.email}</Text>}
      </View>
    </Pressable>
  )
}
export default function Screen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  useEffect(() => {
    ;(async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          sort: 'firstName',
        })
        setContacts(data)
      }
    })()
  }, [])
  return (
    <Fragment>
      <Stack.Screen options={{ title: 'Contacts' }} />
      <FlashList
        data={contacts}
        className="bg-base"
        estimatedItemSize={73}
        renderItem={ContactItem}
      />
    </Fragment>
  )
}
