import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecurringPaymentsRequest, updateRecurringPaymentRequest } from '../../Redux/actions/recurringPayments';
import { addActionRequest } from '../../Redux/actions/actions';
import { addActionsLogic } from '../../utilities/actions';


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
          await addActionsLogic(recurringPayments, dispatch, addActionRequest, updateRecurringPaymentRequest)
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


[{ "action_added": "2024-08-28", "amount": -349, "categoryColor": "red", "categoryID": 7, "categoryIcon": "💡", "frequency": 1, "id": 1, "name": "Mobile Recharge", "next_date": "2024-10-02", "pay_date": "2024-09-02", "recipientID": 1, "saved": 0 },
{ "action_added": "2024-08-28", "amount": -19500, "categoryColor": "purple", "categoryID": 1, "categoryIcon": "❓", "frequency": 12, "id": 2, "name": "Income Tax", "next_date": "2026-06-15", "pay_date": "2025-06-15", "recipientID": 1, "saved": 0 },
  { "action_added": "1900-01-01", "amount": -150, "categoryColor": "purple", "categoryID": 6, "categoryIcon": "👕", "frequency": 1, "id": 3, "name": "Haircut", "next_date": "2024-09-28", "pay_date": "2024-08-28", "recipientID": 1, "saved": 0 }]