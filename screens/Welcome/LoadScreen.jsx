import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../constants/colors';


export default function LoadScreen({ navigation }) {
  useEffect(() => {
    async function checkUser() {
      try {
        const user = await AsyncStorage.getItem('name');
        if (user) {
          navigation.replace('BottomTabsHome');
        } else {
          navigation.replace('Welcome');
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkUser();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: appColors.lightGrey}}>
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200}} /> 
      </View>
      <View style={{flex: 1}}>
        <ActivityIndicator color={appColors.blue} size='medium' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})