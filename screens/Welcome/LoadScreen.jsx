import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecurringPaymentsRequest, updateRecurringPaymentRequest } from '../../Redux/actions/recurringPayments';




const addActions = (recurringPayments, actionsAdded, setActionsAdded, dispatch) => {

  return new Promise((resolve, reject) => {
    try {
      if (!actionsAdded) {
        console.log(recurringPayments);
        const todays_date = new Date();
        for (let i = 0; i < recurringPayments.length; i++) {
          let { pay_date, saved, action_added, amount, id, name, categoryID, recipientID, frequency } = recurringPayments[i];
          if (amount > 0) {
            // this is an recurring income
            continue;
          }
          pay_date = pay_date.split('-')
          action_added = action_added.split('-')
          if (
            pay_date[0] > todays_date.getFullYear() ||
            (pay_date[0] == todays_date.getFullYear() && pay_date[1] > (todays_date.getMonth() + 1))
          ) {

            if (todays_date.getMonth() + 1 == pay_date[1] &&
              pay_date[2] <= todays_date.getDate() &&
              action_added[1] != todays_date.getMonth() + 1) {
              dispatch(addActionRequest({ actionAmount: Math.abs(amount) - saved, actionType: 'Pay', recurringPaymentID: id }));

            }
            else if (todays_date.getDate() >= 25 &&
              action_added[1] != todays_date.getMonth() + 1
            ) {
              const month_diff = (parseInt(pay_date[0]) - todays_date.getFullYear()) * 12 +
                parseInt(pay_date[1]) - (todays_date.getMonth() + 1) + 1;
              
              dispatch(addActionRequest({ actionAmount: Math.floor((Math.abs(amount) - saved) / month_diff), actionType: 'Save', recurringPaymentID: id }))

            }
            // update actionAdded
            dispatch(updateRecurringPaymentRequest({
              recPaymentID: id,
              recPaymentName: name,
              recPaymentAmount: amount,
              recPaymentCategory: categoryID,
              recPaymentRecipient: recipientID,
              recPaymentNextPayment: pay_date.reverse().join('/'),
              recPaymentFrequency: frequency,
              recPaymentType: '1',
              recPaymentActionAdded: new Intl.DateTimeFormat('en-GB').format(todays_date)
            }))

          }
          else {
            // update pay_date and next_date of the recurringPayment
          }
        }

        setActionsAdded(true);
        console.log("Actions Added")
        resolve('Added actions succesfully');

      }
    }
    catch (err) {
      console.error(err);
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
          await addActions(recurringPayments, actionsAdded, setActionsAdded, dispatch);
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