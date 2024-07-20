import { Dimensions, Linking, StyleSheet, Text, View, } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ConfirmationModal from '../components/listScreenComponents/Forms/ConfirmationModal';
import TextField from '../components/listScreenComponents/Forms/TextField';
import CategorySelector from '../components/listScreenComponents/Forms/CategorySelector';
import RecipientSelector from '../components/listScreenComponents/Forms/RecipientSelector';
import appColors from '../constants/colors';
import { addTransactionRequest } from '../Redux/actions/transactions';
import { fetchCurrentMonthMoneyRequest } from '../Redux/actions/users';
import DateTimeSelector from '../components/listScreenComponents/Forms/DateTimeSelector';
import { addRecipientRequest } from '../Redux/actions/recipients';



export default function QRCodeForm({ route, navigation }) {

  const { id, name, amount, category, date, time, recipient, type, addition, upiUrl, merchantName } = route.params;
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);

  const [transactionName, setTransactionName] = React.useState(name);
  const [transactionAmount, setTransactionAmount] = React.useState(Math.abs(amount) + '');
  const [transactionCategory, setTransactionCategory] = React.useState(category);
  const [transactionDate, setTransactionDate] = React.useState(date);
  const [transactionTime, setTransactionTime] = React.useState(time);
  const [transactionRecipient, setTransactionRecipient] = React.useState(recipient);
  const [transactionType, setTransactionType] = React.useState(type === 'Expense' ? '1' : '2');

  const recipients = useSelector(state => state.recipients.recipients);




  useFocusEffect(
    useCallback(() => {
      setTransactionName(name);
      setTransactionAmount(Math.abs(amount) + '');
      setTransactionCategory(category);
      setTransactionDate(date);
      setTransactionTime(time);
      setTransactionRecipient(recipient);
      setTransactionType(type === 'Expense' ? '1' : '2');

      return () => {
      };
    }, [name, amount, category, date, time, recipient, type])
  );

  const currentMonthMoney = useSelector(state => state.users.currentMonthMoney[0]);
  let positive = 0;
  let negative = 0;
  if (currentMonthMoney) {
    positive = currentMonthMoney.positive;
    negative = currentMonthMoney.negative;
    if (!positive) {
      positive = 0;
    }
    if (!negative) {
      negative = 0;
    }
  }

  const [udpdateState, setupdateState] = useState(false);

  const dispatch = useDispatch();

  const handleProcessPayment = () => {

    if (transactionName.length === 0 ||
      transactionAmount.length === 0 ||
      isNaN(transactionAmount) ||
      parseFloat(transactionAmount) <= 0 ||
      transactionCategory.length > 30
    ) {
      return;
    }
    
    if (positive < (parseFloat(transactionAmount) + Math.abs(negative)) && transactionType == '1') {
      setShowAddMoney(true);
      return;
    }
    
    Linking.openURL(upiUrl+'&am='+transactionAmount);

    if (transactionRecipient === '1') {
      dispatch(addRecipientRequest({
        recipientName: merchantName,
        recipientType: 'Recipient',
        recipientUrl: upiUrl,
        recipientIcon: '👾',
        recipientBackgroundColor: 'orange'
      }));
    }
    const newRecipientId = recipients[recipients.length - 1].id;
    setTransactionRecipient(newRecipientId);
    
    dispatch(addTransactionRequest({
      transactionName,
      transactionAmount,
      transactionCategory,
      transactionDate,
      transactionTime,
      transactionRecipient,
      transactionType
    }));
    dispatch(fetchCurrentMonthMoneyRequest());
    navigation.navigate('HomeScreen');
  }


  return (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: appColors.white }}>
      <ConfirmationModal
        text={"Not enough money to for this expense"}
        onCancel={() => {
          setShowAddMoney(false);
        }}
        onConfirm={() => {
          setShowAddMoney(false);
        }}
        setVisible={setShowAddMoney}
        visible={showAddMoney}
        enableOk={true}
      />

      <ScrollView>
        <SafeAreaView
          style={{ height: 750, width: Dimensions.get('window').width }}
        >

          {/* Form Section */}
          <View style={{ height: 700 }}>

            <TextField
              placeholder={'Transaction Name'}
              text={transactionName}
              setText={setTransactionName}
              errorMessage={'Max 30 characters'}
              isRequired={true}
              showErrorNow={transactionName.length === 0 || transactionName.length > 30 ? true : false}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
            />

            <TextField
              placeholder={'Amount'}
              text={transactionAmount}
              setText={setTransactionAmount}
              errorMessage={'Amount should be valid and greater than 0'}
              isRequired={true}
              showErrorNow={transactionAmount.length === 0 || isNaN(transactionAmount) || parseFloat(transactionAmount) <= 0 ? true : false}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
              keyboardType='decimal-pad'
            />

            <CategorySelector
              initialCategory={transactionCategory}
              setCategory={setTransactionCategory}
              type={transactionType === '1' ? 'Expense' : 'Income'}
              disabled={!addition && !udpdateState}
            />

            <RecipientSelector
              initialRecipient={transactionRecipient}
              setRecipient={setTransactionRecipient}
              disabled={!addition && !udpdateState}
              type={transactionType === '1' ? 'Recipient' : 'Payer'}
            />

            <DateTimeSelector initialDate={transactionDate} initialTime={transactionTime} setDate={setTransactionDate} setTime={setTransactionTime}
              disabled={!addition && !udpdateState}
            />

          </View>




          {/* Button Section */}


          <View
            style={{ flexDirection: 'row', alignItems: 'flex-end', height: 50, justifyContent: 'space-evenly' }}
          >

            {
              addition ?
                <>
                  <Button mode='outlined' onPress={() => navigation.goBack()} style={{ width: 200 }}>
                    Cancel
                  </Button>
                  <Button mode='contained'
                    onPress={() => {
                      setSubmitPressed(true);
                      handleProcessPayment();
                    }}
                    style={{ width: 200 }}>
                    Pay
                  </Button>
                </>
                : <></>
            }



          </View>


        </SafeAreaView>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({})