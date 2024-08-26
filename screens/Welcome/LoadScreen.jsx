import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecurringPaymentsRequest } from '../../Redux/actions/recurringPayments';



const addActions = (recurringPayments, actionsAdded, setActionsAdded) => {
  return new Promise((resolve, reject) => {
    try {
      if (!actionsAdded) {
        setTimeout(() => {
          console.warn(recurringPayments);
          console.log("Actions Added")
          setActionsAdded(true);
          resolve('Actions added successfully')
        }, 2000)
      }
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
  const [actionsAdded, setActionsAdded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await AsyncStorage.getItem('name');
        if (!user) {
          AsyncStorage.setItem('recurrCount', '0');
          navigation.replace('Welcome');
        }
        else {
          dispatch(fetchRecurringPaymentsRequest());
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
          await addActions(recurringPayments, actionsAdded, setActionsAdded);
          navigation.replace('BottomTabsHome');
        } catch (error) {
          console.error(error);
        }
      }
      addActionsAsync();
    }
  }, [recurringPayments]);

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