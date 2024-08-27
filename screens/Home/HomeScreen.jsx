import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopText from '../../components/homeScreenComp/TopText';
import PayButtons from '../../components/homeScreenComp/PayButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesRequest } from '../../Redux/actions/categories';
import { fetchRecipientsRequest } from '../../Redux/actions/recipients';
import { fetchTransactionRequest } from '../../Redux/actions/transactions';
import { fetchCurrentMonthMoneyRequest } from '../../Redux/actions/users';
import { fetchRecurringPaymentsRequest } from '../../Redux/actions/recurringPayments';
import Actions from '../../components/homeScreenComp/Actions';
import { fetchActionsRequest } from '../../Redux/actions/actions';

export default function HomeScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState(require('../../assets/images/man.png'));
  const dispatch = useDispatch();
  useEffect(()=>{
    async function updateData(){
      const name = await AsyncStorage.getItem('name')
      const avatar = await AsyncStorage.getItem('avatar')
      setUserName(name);
      setAvatar(avatar==='man' ? require('../../assets/images/man.png') : require('../../assets/images/woman.png'));

    }
    dispatch(fetchCategoriesRequest());
    dispatch(fetchRecipientsRequest());
    dispatch(fetchTransactionRequest());
    dispatch(fetchCurrentMonthMoneyRequest());
    dispatch(fetchRecurringPaymentsRequest());
    dispatch(fetchActionsRequest());
    updateData();
  },[])

  const currentMonthMoney = useSelector(state => state.users.currentMonthMoney[0]);
  let positive = 0;
  let negative = 0;
  if(currentMonthMoney){
    positive = currentMonthMoney.positive;
    negative = currentMonthMoney.negative;
    if(!positive){
      positive = 0;
    }
    if(!negative){
      negative = 0;
    }
  }


  return (
    
      <SafeAreaView style={styles.homeScreenContainer}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <TopText userName={userName} src={avatar} moneyPos={positive} moneyNeg={negative}/>
        <PayButtons navigation={navigation}/>
        <Actions />
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex:1
  },
});