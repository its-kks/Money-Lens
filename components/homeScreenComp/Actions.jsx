import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import appColors from '../../constants/colors'
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
import SingleAction from './SingleAction';
import { updateRecurringPaymentRequest } from '../../Redux/actions/recurringPayments';
import { addActionRequest } from '../../Redux/actions/actions';
import { addActionsLogic } from '../../utilities/actions';


export default function Actions() {
  const [sort, setSort] = useState('');
  const fetchedActions = useSelector(state => state.actions.actions);
  const loading = useSelector(state => state.actions.loading);
  const error = useSelector(state => state.actions.error);

  const fetchedRecurringPayments = useSelector(state => state.recurringPayments.recurringPayments);

  if( sort === 'asc' ){
    fetchedActions.sort((a, b) => {
      return a.amount - b.amount;
    })
  }
  else if (sort === 'desc') {
    fetchedActions.sort((a, b) => {
      return b.amount - a.amount;
    })
  }

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
            onPress={() => { addActionsLogic(fetchedRecurringPayments, dispatch, addActionRequest, updateRecurringPaymentRequest) }}
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

