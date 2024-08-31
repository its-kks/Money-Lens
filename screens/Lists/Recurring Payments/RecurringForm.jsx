import { Dimensions, StyleSheet, Text, View, } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../../../components/listScreenComponents/Forms/TextField';
import CategorySelector from '../../../components/listScreenComponents/Forms/CategorySelector';
import RecipientSelector from '../../../components/listScreenComponents/Forms/RecipientSelector';
import appColors from '../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import ConfirmationModal from '../../../components/listScreenComponents/Forms/ConfirmationModal';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import DateFrequency from '../../../components/listScreenComponents/Forms/DateFrequency';
import TransactionSelector from '../../../components/listScreenComponents/Forms/TransactionSelector';
import { addRecurringPaymentRequest, deleteRecurringPaymentRequest, updateRecurringPaymentRequest } from '../../../Redux/actions/recurringPayments';
import Buttons from '../../../components/listScreenComponents/Forms/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Recur({ route, navigation }) {

  const { id, name, amount, category, nextPayment, frequency, recipient, addition, type, action_added, money_saved } = route.params;
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [recPaymentName, setRecPaymentName] = React.useState(name);
  const [recPaymentAmount, setRecPaymentAmount] = React.useState(Math.abs(amount) + '');
  const [recPaymentCategory, setRecPaymentCategory] = React.useState(category);
  const [recPaymentRecipient, setRecPaymentRecipient] = React.useState(recipient);
  const [recPaymentNextPayment, setRecPaymentNextPayment] = React.useState(nextPayment);
  const [recPaymentFrequency, setRecPaymentFrequency] = React.useState(frequency);
  const [recPaymentType, setRecPaymentType] = React.useState(type === 'Expense' ? '1' : '2');
  const [recPaymentActionAdded, setRecPaymentActionAdded] = useState(action_added);
  const [recPaymentMoneySaved, setRecPaymentMoneySaved] = useState(money_saved);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setRecPaymentName(name);
      setRecPaymentAmount(Math.abs(amount) + '');
      setRecPaymentCategory(category);
      setRecPaymentRecipient(recipient);
      setRecPaymentNextPayment(nextPayment);
      setRecPaymentFrequency(frequency);
      return () => {
      };
    }, [id, name, amount, category, nextPayment, frequency, recipient])
  );



  const [udpdateState, setupdateState] = useState(false);

  const handleRecPaymentAddition = () => {
    if (recPaymentName.length === 0 ||
      recPaymentAmount.length === 0 ||
      isNaN(recPaymentAmount) ||
      parseFloat(recPaymentAmount) <= 0
    ) {
      return;
    }
    async function increaseCount() {
      try {
        const count = await AsyncStorage.getItem('recurrCount');
        await AsyncStorage.setItem('recurrCount', (parseInt(count) + 1) + '');
      } catch (error) {
        console.error(error);
      }
    }
    increaseCount();
    dispatch(addRecurringPaymentRequest({
      recPaymentName,
      recPaymentAmount,
      recPaymentCategory,
      recPaymentRecipient,
      recPaymentNextPayment,
      recPaymentFrequency,
      recPaymentType
    }));

    navigation.goBack();

  }

  const handleRecPaymentUpdate = () => {
    if (recPaymentName.length === 0 ||
      recPaymentAmount.length === 0 ||
      isNaN(recPaymentAmount) ||
      parseFloat(recPaymentAmount) <= 0
    ) {
      return;
    }
    dispatch(updateRecurringPaymentRequest({
      recPaymentID:id,
      recPaymentName,
      recPaymentAmount,
      recPaymentCategory,
      recPaymentRecipient,
      recPaymentNextPayment,
      recPaymentFrequency,
      recPaymentType,
      recPaymentActionAdded,
      recPaymentMoneySaved
    }));
    navigation.goBack();
  }

  const handleRecPaymentDelete = () => {
    async function decreaseCount() {
      try {
        const count = await AsyncStorage.getItem('recurrCount');
        await AsyncStorage.setItem('recurrCount', (parseInt(count) - 1) + '');
      } catch (error) {
        console.error(error);
      }
    }
    decreaseCount();
    dispatch(deleteRecurringPaymentRequest(id));
    setShowModal(false);
    navigation.goBack();

  }



  return (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: appColors.white }}>
      <ConfirmationModal
        text={"Are you sure you want to delete?"}
        onCancel={() => { setShowModal(false) }}
        visible={showModal}
        setVisible={setShowModal}
        onConfirm={handleRecPaymentDelete}
      />

      <View>
        <View
          style={{ flex: 1, width: Dimensions.get('window').width }}
        >

          {/* Form Section */}
          <ScrollView style={{ flex: 1 }}>

            <TextField
              placeholder={'Recurring Payment Name'}
              text={recPaymentName}
              setText={setRecPaymentName}
              errorMessage={'Max 30 characters'}
              isRequired={true}
              showErrorNow={recPaymentName.length === 0 || recPaymentName.length > 30 ? true : false}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
            />

            <TextField
              placeholder={'Amount'}
              text={recPaymentAmount}
              setText={setRecPaymentAmount}
              errorMessage={'Amount should be valid and greater than 0'}
              isRequired={true}
              showErrorNow={recPaymentAmount.length === 0 || isNaN(recPaymentAmount) || parseFloat(recPaymentAmount) <= 0 ? true : false}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
              keyboardType='decimal-pad'
            />

            <CategorySelector
              initialCategory={recPaymentCategory}
              setCategory={setRecPaymentCategory}
              type={recPaymentType === '1' ? 'Expense' : 'Income'}
              disabled={!addition && !udpdateState}
            />

            <RecipientSelector
              initialRecipient={recPaymentRecipient}
              setRecipient={setRecPaymentRecipient}
              disabled={!addition && !udpdateState}
              type={recPaymentType === '1' ? 'Recipient' : 'Payer'}
            />

            <DateFrequency
              recPaymentNextPayment={recPaymentNextPayment}
              setRecPaymentNextPayment={setRecPaymentNextPayment}
              recPaymentFrequency={recPaymentFrequency}
              setRecPaymentFrequency={setRecPaymentFrequency}
              disabled={!addition && !udpdateState}
            />

            {
              !addition ? null : (
                <TransactionSelector
                  initialType={recPaymentType}
                  setType={setRecPaymentType}
                  setCategory={setRecPaymentCategory}
                  heading={'Recurring Payment Type'}
                />

              )
            }



          </ScrollView>




          {/* Button Section */}


          <View
            style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly', height: 60,
              flexShrink: 0
             }}
          >

            {
              addition ?
              <>
                <Buttons onPress={() => navigation.goBack()} value={'Cancel'} color={appColors.red} />
                <Buttons mode='contained'
                  onPress={() => {
                    setSubmitPressed(true);
                    handleRecPaymentAddition();
                  }}
                  style={{ width: 200 }}
                  value={'Add'}
                  color={appColors.blue}
                />
              </>
              : (
                udpdateState ?
                  <>
                    <Buttons onPress={() => navigation.goBack()} value={'Cancel'} color={appColors.grey} percentWidth={0.30} />
                    <Buttons onPress={
                      () => {
                        setShowModal(true);
                      }}
                      value={'Delete'}
                      percentWidth={0.30}
                      color={appColors.red}
                    />
                    <Buttons onPress={
                      () => {
                        setSubmitPressed(true);
                        handleRecPaymentUpdate();
                      }

                    }
                      value={'Update'}
                      percentWidth={0.30}
                      color={appColors.blue}
                    />
                  </>
                  :
                  <>
                    <Buttons onPress={() => navigation.goBack()} value={'Cancel'} color={appColors.red} />
                    <Buttons onPress={() => setupdateState(true)} value={'Edit'} color={appColors.blue} />
                  </>
              )
            }



          </View>


        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})