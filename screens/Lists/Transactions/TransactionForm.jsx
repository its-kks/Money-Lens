import { Dimensions, StyleSheet, Text, View, } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../../../components/listScreenComponents/Forms/TextField';
import CategorySelector from '../../../components/listScreenComponents/Forms/CategorySelector';
import RecipientSelector from '../../../components/listScreenComponents/Forms/RecipientSelector';
import appColors from '../../../constants/colors';
import TransactionSelector from '../../../components/listScreenComponents/Forms/TransactionSelector';
import DateTimeSelector from '../../../components/listScreenComponents/Forms/DateTimeSelector';
import {
  addTransactionRequest,
  updateTransactionRequest,
  deleteTransactionRequest
} from '../../../Redux/actions/transactions';
import { ScrollView } from 'react-native-gesture-handler';
import ConfirmationModal from '../../../components/listScreenComponents/Forms/ConfirmationModal';
import { useFocusEffect } from '@react-navigation/native';
import { fetchCurrentMonthMoneyRequest } from '../../../Redux/actions/users';
import { useSelector } from 'react-redux';

export default function TransactionForm({ route, navigation }) {

  const { id, name, amount, category, date, time, recipient, type, addition } = route.params;
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

  const [udpdateState, setupdateState] = useState(false);

  const dispatch = useDispatch();

  const handleTransactionAddition = () => {
    if (transactionName.length === 0 ||
      transactionAmount.length === 0 ||
      isNaN(transactionAmount) ||
      parseFloat(transactionAmount) <= 0 ||
      transactionCategory.length > 30
    ) {
      return;
    }

    if(positive<(parseFloat(transactionAmount) + Math.abs(negative) ) && transactionType=='1'){
      setShowAddMoney(true);
      return;
    }

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
    navigation.navigate('TransactionList');
  }

  const handleTransactionUpdate = () => {
    if (transactionName.length === 0 ||
      transactionAmount.length === 0 ||
      isNaN(transactionAmount) ||
      parseFloat(transactionAmount) <= 0 ||
      transactionCategory.length > 30
    ) {
      return;
    }
    dispatch(updateTransactionRequest({
      transactionId: id,
      transactionName,
      transactionAmount,
      transactionCategory,
      transactionDate,
      transactionTime,
      transactionRecipient,
      transactionType
    }));
    dispatch(fetchCurrentMonthMoneyRequest());
    navigation.navigate('TransactionList');
  }

  const handleTransactionDelete = () => {

    dispatch(deleteTransactionRequest(id));
    dispatch(fetchCurrentMonthMoneyRequest());
    setShowModal(false);
    navigation.navigate('TransactionList');
  }


  return (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: appColors.white }}>
      <ConfirmationModal
        text={"Are you sure you want to delete?"}
        onCancel={() => { setShowModal(false) }}
        visible={showModal}
        setVisible={setShowModal}
        onConfirm={handleTransactionDelete}
      />
      <ConfirmationModal
        text = {"Not enough money to for this expense"}
        onCancel={()=>{
          setShowAddMoney(false);
        }}
        onConfirm={()=>{
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

            {
              !addition ? null : (
                <TransactionSelector initialType={transactionType} setType={setTransactionType} setCategory={setTransactionCategory} />
              )
            }




          </View>




          {/* Button Section */}


          <View
            style={{ flexDirection: 'row', alignItems: 'flex-end', height: 50, justifyContent: 'space-evenly' }}
          >

            {
              addition ?
                <>
                  <Button mode='outlined' onPress={() => navigation.navigate('TransactionList')} style={{ width: 200 }}>
                    Cancel
                  </Button>
                  <Button mode='contained'
                    onPress={() => {
                      setSubmitPressed(true);
                      handleTransactionAddition();
                    }}
                    style={{ width: 200 }}>
                    Add
                  </Button>
                </>
                : (
                  udpdateState ?
                    <>
                      <Button mode='outlined' onPress={() => navigation.navigate('TransactionList')} style={{ width: 120 }}>
                        Cancel
                      </Button>
                      <Button mode='contained' onPress={
                        () => {
                          setShowModal(true);
                        }}
                        style={{ width: 120 }}
                      >
                        Delete
                      </Button>
                      <Button mode='contained' onPress={
                        () => {
                          setSubmitPressed(true);
                          handleTransactionUpdate();
                        }

                      } style={{ width: 120 }}>
                        Update
                      </Button>
                    </>
                    :
                    <>
                      <Button mode='outlined' onPress={() => navigation.navigate('TransactionList')} style={{ width: 200 }}>
                        Cancel
                      </Button>
                      <Button mode='contained' onPress={() => setupdateState(true)} style={{ width: 200 }}>
                        Edit
                      </Button>
                    </>
                )
            }



          </View>


        </SafeAreaView>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({})