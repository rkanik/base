import { Stack } from 'expo-router'
import { Fragment } from 'react'

export default function Layout() {
  return (
    <Fragment>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </Fragment>
  )
}
