import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors';

export default function PiggyBank() {
  return (
      <View style={styles.imageContainer}>
        {/* <View style={styles.coinStyle}><Text>$</Text></View> */}
        <View style={styles.piggyUpper}></View>
        <View style={styles.piggyLower}></View>
        <Image source={require('../../assets/images/piggyBankCutOut.png')} style={styles.imageStyle}/>
      </View>

  )
}

const styles = StyleSheet.create({
  imageContainer:{
    backgroundColor: appColors.white,
    height: 110,
    width: 110,
    overflow: 'hidden',
  },
  piggyUpper:{
    backgroundColor: appColors.lightGrey,
    flex: 70,
  },
  piggyLower:{
    backgroundColor: appColors.pink+'88',
    flex: 30,
  },
  imageStyle:{
    width: 110,
    height: 110,
    position: 'absolute',
    zIndex: 1
  },
  coinStyle:{
    height:24,
    width:24,
    position:'absolute',
    backgroundColor:'red',
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center'
  }
})
