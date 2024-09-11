import {
  StyleSheet, Text, View, Pressable, Dimensions

} from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import { ActivityIndicator } from 'react-native-paper'


export default function Buttons({ onPress, value, color = "blue", percentWidth = 0.45, showLoader = false }) {
  return (
    <Pressable style={
      {
        margin: 5,
        padding: 15,
        backgroundColor: color,
        width: Dimensions.get('window').width * percentWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
      }}
      onPress={() => { onPress() }}
    >
      {
        !showLoader ?
          <Text
            style={
              {
                fontWeight: 'bold',
                color: appColors.white,
                fontSize: 18
              }
            }
          >
            {value}
          </Text> :
          <ActivityIndicator size={'small'} color={appColors.white} style={{margin: 0}} />
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({})