import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'

export default function TopTitle({ title }) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:25,
    fontFamily: 'PTSansNarrow-Regular',
    marginLeft:10,
    fontWeight: '600',
    color:appColors.black
  }
})