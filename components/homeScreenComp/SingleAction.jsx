import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SingleAction({name}) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})