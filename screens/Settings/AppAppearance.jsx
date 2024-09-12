import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleSetting from './SingleSetting'

export default function AppAppearance() {
  const handleMode = () => {
    console.log('Mode')
  }
  return (
    <View>
      <SingleSetting heading="Appearance" settingObject={
        {
          "Mode": handleMode,
        }
      } />
    </View>

  )
}

const styles = StyleSheet.create({})