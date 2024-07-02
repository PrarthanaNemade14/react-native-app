import { StyleSheet, Text, View } from 'react-native'
//import React from 'react'
import {Slot, Stack} from 'expo-router';
import {useFonts} from 'expo-font'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>
  )
}

export default RootLayout

