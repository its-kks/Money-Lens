import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors';

export default function PiggyBank({ moneyPos, moneyNeg }) {
  if (moneyPos === 0 && moneyNeg === 0) {
    moneyPos = 1;
    moneyNeg = -1;
  }

  const upperPercentange = Math.floor(Math.abs(moneyNeg) / (moneyPos) * 100);
  const lowerPercentange = 100 - upperPercentange;
  return (
    <View style={styles.imageContainer}>
      {/* <View style={styles.coinStyle}><Text>$</Text></View> */}
      <View style={{ backgroundColor: appColors.lightGrey, flex: upperPercentange }}></View>
      <View style={{ backgroundColor: appColors.pink + '88', flex: lowerPercentange }}></View>
      <Image source={require('../../assets/images/piggyBankCutOut.png')} style={styles.imageStyle} />
    </View>

  )
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: appColors.white,
    height: 110,
    width: 110,
    overflow: 'hidden',
  },
  loaderConatiner: {
    backgroundColor: appColors.blue,
    height: 110,
    width: 110,
    justifyContent:'center',
    alignItems:'center'
  },
  imageStyle: {
    width: 110,
    height: 110,
    position: 'absolute',
    zIndex: 1
  },
  coinStyle: {
    height: 24,
    width: 24,
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
