import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'

export default function ButtonPay({icon,text, onPress, iconColor}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.iconContainer,{backgroundColor:iconColor+'50'}]}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{text}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container:{
    height: 120,
    width: 84,
    // marginTop: 20,
    overflow:'hidden',
  },
  iconContainer:{
    flex:70,
    width:84,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10
  },
  textContainer:{
    flex:30,
    justifyContent:'flex-start',
    alignItems:'center',
    padding:4
  },
  textStyle:{
    fontSize: 12,
    color: appColors.black,
    fontFamily:'Roboto-Light',
    fontWeight:'bold',
    textAlign:'center',
  }
})