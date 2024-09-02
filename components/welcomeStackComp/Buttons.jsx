import {
  StyleSheet, Text, View, Pressable, Dimensions

} from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'


export default function Buttons({ onPress, value, color = "blue", percentWidth = 0.45 }) {
  return (
    <Pressable style={
      {
        margin: 5,
        padding: 15,
        backgroundColor: color,
        width: Dimensions.get('window').width * percentWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
      }}
      onPress={()=>{onPress()}}
    >
      <Text
        style={
          {
            fontWeight: 'bold',
            color: appColors.white,
            fontSize: 15
          }
        }
      >
        {value}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({})