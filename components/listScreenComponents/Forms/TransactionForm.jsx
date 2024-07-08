import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from './TextField';
import CategorySelector from './CategorySelector';
import RecipientSelector from './RecipientSelector';
import appColors from '../../../constants/colors';
import TransactionSelector from './TransactionSelector';
import DateTimeSelector from './DateTimeSelector';
import { addTransactionRequest } from '../../../Redux/actions/transactions';

export default function TransactionForm({ route, navigation }) {

  const { id, name, amount, category, date, time, recipient, type, addition } = route.params;

  const [transactionName, setTransactionName] = React.useState(name);
  const [transactionAmount, setTransactionAmount] = React.useState(amount);
  const [transactionCategory, setTransactionCategory] = React.useState(category);
  const [transactionDate, setTransactionDate] = React.useState(date);
  const [transactionTime, setTransactionTime] = React.useState(time);
  const [transactionRecipient, setTransactionRecipient] = React.useState(recipient);
  const [transactionType, setTransactionType] = React.useState(type=== 'Expense' ? '1' : '2');


  const [udpdateState, setupdateState] = useState(false);

  const dispatch = useDispatch();

  const handleTransactionAddition = () => {
    dispatch(addTransactionRequest({
      transactionName,
      transactionAmount, 
      transactionCategory,
      transactionDate,
      transactionTime, 
      transactionRecipient,
      transactionType
    }));
    navigation.navigate('TransactionList');
  }


  return (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor:appColors.white }}>
        <SafeAreaView
          style={{ height: 750, width: Dimensions.get('window').width }}
        >

          {/* Form Section */}
          <View style={{ height: 700}}>

            <TextField
              placeholder={'Transaction Name'}
              text={transactionName}
              setText={setTransactionName}
              errorMessage={'Max 30 characters'}
              isRequired={true}
              showErrorNow={false}
              submitPressed={false}
              disabled={false}
            />

            <TextField
              placeholder={'Amount'}
              text={transactionAmount}
              setText={setTransactionAmount}
              errorMessage={'Amount should be valid and greater than 0'}
              isRequired={true}
              showErrorNow={false}
              submitPressed={false}
              disabled={false}
              keyboardType='decimal-pad'
            />

            <CategorySelector initialCategory={transactionCategory} setCategory={setTransactionCategory} type={transactionType==='1'?'Expense':'Income'}/>

            <RecipientSelector initialRecipient={transactionRecipient} setRecipient={setTransactionRecipient} />

            <DateTimeSelector initialDate={transactionDate} initialTime={transactionTime} setDate={setTransactionDate} setTime={setTransactionTime}/>

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
                  <Button mode='contained' onPress={() => {handleTransactionAddition()}} style={{ width: 200 }}>
                    Add
                  </Button>
                </>
                : (
                  udpdateState ?
                    <>
                      <Button mode='outlined' onPress={() => navigation.navigate('TransactionList')} style={{ width: 120 }}>
                        Cancel
                      </Button>
                      <Button mode='contained' onPress={() => console.log('Delete')} style={{ width: 120 }}>
                        Delete
                      </Button>
                      <Button mode='contained' onPress={() => console.log('Update')} style={{ width: 120 }}>
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
    </View>
  )
}

const styles = StyleSheet.create({})