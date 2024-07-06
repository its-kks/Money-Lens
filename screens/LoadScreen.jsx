import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        console.log(error);
      }
    }
    checkUser();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Text>LoadScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})