import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import appColors from '../../constants/colors'
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
import SingleAction from './SingleAction';
import { updateRecurringPaymentRequest } from '../../Redux/actions/recurringPayments';
import { addActionRequest, deleteActionRequest } from '../../Redux/actions/actions';
import { addActionsLogic } from '../../utilities/actions';
import { addTransactionRequest } from '../../Redux/actions/transactions';
import { fetchCurrentMonthMoneyRequest } from '../../Redux/actions/users';
import ConfirmationModal from '../listScreenComponents/Forms/ConfirmationModal';

export default function Actions() {
  const [sort, setSort] = useState('');
  const fetchedActions = useSelector(state => state.actions.actions);
  const loading = useSelector(state => state.actions.loading);
  const error = useSelector(state => state.actions.error);

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();


  const fetchedRecurringPayments = useSelector(state => state.recurringPayments.recurringPayments);
  const currentMonthMoney = useSelector(state => state.users.currentMonthMoney[0]);


  function handleAction(type, recurring_payment_id, amount, action_id) {
    const {
      id, name, amount: recAmount, categoryID, pay_date, frequency, recipientID, action_added, saved, next_date
    } = fetchedRecurringPayments.filter(item => item.id === recurring_payment_id)[0];

    if ((type === 'Save' || type === 'Pay') && Math.abs(amount) >
      Math.abs(currentMonthMoney.positive + currentMonthMoney.negative)) {
      setShowModal(true);
      return;
    }

    let recPaymentNextPayment = pay_date;
    let recPaymentMoneySaved = saved;
    let transactionName = '';
    let transactionType = '';

    switch (type) {
      case 'Save':
        recPaymentMoneySaved += amount;
        transactionName = `Saved: ${name}`;
        transactionType = '1';
        break;
      case 'Add':
        recPaymentNextPayment = next_date;
        recPaymentMoneySaved = 0;
        transactionName = `Added: ${name}`;
        transactionType = '2';
        break;
      case 'Pay':
        recPaymentNextPayment = next_date;
        recPaymentMoneySaved = 0;
        transactionName = `Paid: ${name}`;
        transactionType = '1';
        break;
      default:
        console.error('Invalid action type');
        return;
    }

    dispatch(updateRecurringPaymentRequest({
      recPaymentID: id,
      recPaymentName: name,
      recPaymentAmount: recAmount,
      recPaymentCategory: categoryID,
      recPaymentRecipient: recipientID,
      recPaymentNextPayment: recPaymentNextPayment,
      recPaymentFrequency: frequency,
      recPaymentType: recAmount < 0 ? '1' : '2',
      recPaymentActionAdded: action_added,
      recPaymentMoneySaved: recPaymentMoneySaved
    }));

    dispatch(addTransactionRequest({
      transactionName: transactionName,
      transactionAmount: amount,
      transactionCategory: categoryID,
      transactionDate: new Intl.DateTimeFormat('en-GB').format(new Date()),
      transactionTime: new Date().toLocaleTimeString(),
      transactionRecipient: recipientID,
      transactionType: transactionType
    }));
    dispatch(fetchCurrentMonthMoneyRequest());
    dispatch(deleteActionRequest(action_id));
  }


  return (
    <View style={styles.container}>
      <ConfirmationModal
        enableOk={true}
        text={"Not enough money for this operation!"}
        onCancel={() => { setShowModal(false) }}
        visible={showModal}
        setVisible={setShowModal}
        onConfirm={() => (setShowModal(false))}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Actions:</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginRight: 10, backgroundColor: appColors.blue + '50', padding: 5, borderRadius: 50 }}
            onPress={() => { setSort(sort === 'asc' ? 'desc' : 'asc') }}
            disabled={fetchedActions.length === 0}
          >
            {
              sort === 'asc' ?
                <MaterialCommunityIcons name="sort-ascending" size={25} color={appColors.blue} />
                :
                <MaterialCommunityIcons name="sort-descending" size={25} color={appColors.blue} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10, backgroundColor: appColors.blue + '50', padding: 5, borderRadius: 50 }}
            onPress={() => { addActionsLogic(fetchedRecurringPayments, dispatch, addActionRequest, updateRecurringPaymentRequest) }}
            disabled={fetchedRecurringPayments.length === 0}
          >
            <MaterialCommunityIcons name="reload" size={25} color={appColors.blue} />
          </TouchableOpacity>
        </View>
      </View>
      {
        loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={appColors.blue} />
          </View>
          :
          <>
            {

              fetchedActions.length !== 0 ?
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={fetchedActions}
                    keyExtractor={item => item.act_id}
                    renderItem={({ item }) => (
                      <SingleAction name={item.name} act_id={item.act_id} amount={item.amount} type={item.type} rp_id={item.rp_id} handleAction={handleAction}
                      />
                    )}
                    ListFooterComponent={<View style={{ height: 50 }}></View>}
                  />
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="email-check" size={70} color={appColors.lightGrey} />
                  <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', fontWeight: '600', color: appColors.lightGrey }}>No Actions</Text>
                </View>
            }
          </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    marginLeft: 10,
    fontFamily: 'Roboto-Light',
    fontWeight: '600',
    color: appColors.black
  },
})

