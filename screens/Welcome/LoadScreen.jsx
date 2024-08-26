import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../constants/colors';
import { useSelector } from 'react-redux';

const addActions = (recurringPayments) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        console.log("Actions Added")
        resolve('Actions added successfully')
      }, 2000)
    }
    catch (err) {
      console.log(err);
      reject('Failed to add actions');
    }
  });
}

export default function LoadScreen({ navigation }) {
  const recurringPayments = useSelector(state => state.recurringPayments.recurringPayments);
  const [recurrCount, setRecurrCount] = useState(-1);
  useEffect(() => {
    async function checkUser() {
      try {
        const user = await AsyncStorage.getItem('name');
        if (!user) {
          AsyncStorage.setItem('recurrCount', '0');
          navigation.replace('Welcome');
        }
        else {
          const count = await AsyncStorage.getItem('recurrCount');
          setRecurrCount(count);
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    if (recurrCount == 0) {
      navigation.replace('BottomTabsHome');
    }
    else if (recurrCount > 0) {
      async function addActionsAsync() {
        try {
          await addActions(recurringPayments);
          navigation.replace('BottomTabsHome');
        } catch (error) {
          console.error(error);
        }
      }
      addActionsAsync();
    }
  }, [recurrCount]);

  return (
    <View style={{ flex: 1, backgroundColor: appColors.lightGrey }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200 }} />
      </View>
      <View style={{ flex: 1 }}>
        <ActivityIndicator color={appColors.blue} size='medium' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})