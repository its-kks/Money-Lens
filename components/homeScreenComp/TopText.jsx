import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PiggyBank from './PiggyBank';
import numToWords from '../../utilities/numerical';

export default function TopText({userName, src, moneyPos, moneyNeg}) {
  const [showWords, setShowWords] = useState(false);
  const handleShowWords = async () => {
    setShowWords(!showWords);
    setTimeout(() => {
      setShowWords(false);
    }, 2000);
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.upperTextConainer}>
          <View>
            <Image source={src} style={styles.avatarImage}/>
          </View>
          <View style={{marginLeft:10}}>
            <Text style={{fontSize:25, fontFamily:'Roboto-Bold', color:appColors.white}}>Welcome</Text>
            <Text style={{fontSize:14, fontFamily:'Roboto-Regular'}}>{userName}</Text>
          </View>
        </View>
        <View style={{flex:60, alignItems:'flex-start', justifyContent:'flex-start'}}>
          <Text style={{fontSize:18, fontFamily:'Roboto-Bold', marginLeft:10}}>Your Balance:</Text>
          {showWords ?
          (
            <Text style={styles.moneyWordsText}>{numToWords(moneyPos+moneyNeg)}</Text>
          ) : 
          (
            <Pressable onPress={handleShowWords}>
              <Text style={styles.moneyText}>{moneyPos+moneyNeg}</Text>
            </Pressable>
          )}
        </View>
      </View>
      <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' , marginBottom:1}}>
        <PiggyBank moneyNeg={moneyNeg} moneyPos={moneyPos} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.blue,
    flex: 30,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  appName: {
    color: appColors.white,
    margin: 10,
    fontSize: 30,
    fontFamily: 'Serif',
  },
  moneyText: {
    marginLeft:10,
    fontFamily:'PTSansNarrow-Regular',
    fontSize:70,
    color:appColors.white
  },
  moneyWordsText: {
    marginLeft:10,
    fontFamily:'Roboto-Light',
    fontSize:22,
    color:appColors.white
  },
  textContainer: { 
    flex: 5.5, 
    justifyContent: 'flex-end', 
    flexDirection:'column'

  },
  avatarImage: {
    height:44,
    width:44,
    borderRadius:22,
    marginLeft:10

  },
  upperTextConainer:{
    flex:40, 
    alignItems:'flex-start', 
    justifyContent:'flex-end', 
    flexDirection:'row',
    justifyContent:'flex-start' ,
    alignItems:'flex-end',
    marginBottom:10
    
  }
})