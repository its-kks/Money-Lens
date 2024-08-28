import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import appColors from '../../constants/colors'
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
import SingleAction from './SingleAction';
import { updateRecurringPaymentRequest } from '../../Redux/actions/recurringPayments';
import { addActionRequest } from '../../Redux/actions/actions';

const addActions = (recurringPayments, dispatch) => {

  try {

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
        (pay_date[0] == todays_date.getFullYear() && pay_date[1] >= (todays_date.getMonth() + 1))
      ) {
        let actionFound = false;

        if (todays_date.getMonth() + 1 == pay_date[1] &&
          pay_date[2] <= todays_date.getDate() &&
          action_added[1] != todays_date.getMonth() + 1) {
          dispatch(addActionRequest({ actionAmount: Math.abs(amount) - saved, actionType: 'Pay', recurringPaymentID: id }));
          actionFound = true;
        }
        else if (todays_date.getDate() >= 25 &&
          action_added[1] != todays_date.getMonth() + 1
        ) {
          const month_diff = (parseInt(pay_date[0]) - todays_date.getFullYear()) * 12 +
            parseInt(pay_date[1]) - (todays_date.getMonth() + 1) + 1;

          dispatch(addActionRequest({ actionAmount: Math.floor((Math.abs(amount) - saved) / month_diff), actionType: 'Save', recurringPaymentID: id }));
          actionFound = true;
        }

        // update actionAdded
        if (actionFound) {
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

      }
      else {
        // update pay_date and next_date of the recurringPayment
      }
    }

    console.log("Actions Added")


  }
  catch (err) {
    console.error(err);

  }

}

export default function Actions() {
  const [sort, setSort] = useState('asc');
  const fetchedActions = useSelector(state => state.actions.actions);
  const loading = useSelector(state => state.actions.loading);
  const error = useSelector(state => state.actions.error);

  const fetchedRecurringPayments = useSelector(state => state.recurringPayments.recurringPayments);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
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
            onPress={() => { addActions(fetchedRecurringPayments, dispatch) }}
            disabled={fetchedActions.length === 0}
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
                      <SingleAction name={item.name} act_id={item.act_id} amount={item.amount} type={item.type} rp_id={item.rp_id} />
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

