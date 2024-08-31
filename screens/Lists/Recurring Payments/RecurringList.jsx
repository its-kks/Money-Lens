import { Dimensions, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import appColors from '../../../constants/colors'
import TopTitle from '../../../components/listScreenComponents/TopTitle'
import SearchBar from '../../../components/listScreenComponents/SearchBar'
import ExpandingList from '../../../components/listScreenComponents/ExpandingList'
import AscDescButton from '../../../components/listScreenComponents/AscDescButton'
import SingleRecurringExpense from '../../../components/listScreenComponents/SingleRecurringExpense'
import { useDispatch, useSelector } from 'react-redux';
import AddBar from '../../../components/listScreenComponents/AddBar'
import { formattedDate } from '../../../utilities/dateTime'
import { fetchRecurringPaymentsRequest } from '../../../Redux/actions/recurringPayments'

export default function RecurringList({ navigation }) {

  const dispatch = useDispatch();

  const fetchedRecurssivePayments = useSelector(state => state.recurringPayments.recurringPayments);
  const loading = useSelector(state => state.recurringPayments.loading);
  const error = useSelector(state => state.recurringPayments.error);

  const [showType, setShowType] = React.useState(false);
  const [showFrequency, setShowFrequency] = React.useState(false);

  const [type, setType] = useState('Any')
  const [frequency, setFrequency] = useState('All')
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    dispatch(fetchRecurringPaymentsRequest({type,frequency, sort}));
  }, [type, frequency, sort]);

  const handleAddFunction = () => {
    navigation.navigate('RecurringForm',
      {
        id: '-1',
        name: '',
        amount: 0,
        category: '1',
        nextPayment: formattedDate(),
        frequency: 1,
        recipient: '1',
        addition: true,
        type: 'Expense'
      }
      
    );
    setType('Any');
    setFrequency('All');
  }


  return (
    <View
      onPress={() => {
        setShowType(false);
        setShowFrequency(false);
      }
      }
      style={{ flex: 1, backgroundColor: appColors.white }}
    >
      {/* title */}
      <View style={styles.titleContainer}>
        <TopTitle title="Recurring Payments:" />
      </View>

      {/* search */}
      <View View style={styles.searchContainer}>
        <SearchBar />
      </View>

      {/* filters  */}
      <View style={styles.filterContainer}>
        <ExpandingList listItem={['Any', 'Income', 'Expenditure']} showList={showType} setShowList={setShowType}
          currentItem={type} setCurrentItem={setType}
        />
        <ExpandingList listItem={['All', 'Monthly', 'Yearly', 'Quaterly']} showList={showFrequency} setShowList={setShowFrequency}
          currentItem={frequency} setCurrentItem={setFrequency}
        />
        <AscDescButton sort={sort} setSort={setSort} />
      </View>

      {/* transactions list and add bar */}
      <View style={styles.transactionsContainer}>
        <FlatList
          data={fetchedRecurssivePayments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SingleRecurringExpense
              itemName={item.name}
              itemIcon={item.categoryIcon}
              repeat={item.frequency}
              time={undefined}
              price={item.amount}
              itemBackgroundColor={appColors[item.categoryColor] + '50'}
              handleUpdate={() => {
                navigation.navigate('RecurringForm',
                  {
                    id: item.id,
                    name: item.name,
                    amount: item.amount,
                    category: item.categoryID,
                    nextPayment: item.pay_date,
                    frequency: item.frequency,
                    recipient: item.recipientID,
                    addition: false,
                    type: item.amount < 0 ? 'Expense' : 'Income',
                    action_added: item.action_added,
                    money_saved: item.saved
                  }
                );
                setType('Any');
                setFrequency('All');
              }}
            />
          )}
          ListHeaderComponent={<AddBar onPressFunction={handleAddFunction} />}
          ListFooterComponent={<View style={{ height: 50 }} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: appColors.white,
    flex: 1
  },
  filterContainer: {
    height: 30,
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexShrink: 0,
    margin: 10

  },
  transactionsContainer: {
    flex: 1
  },
  titleContainer: {
    justifyContent: 'flex-end',
    height: 35,
    flexShrink: 0
  },
  searchContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    flexShrink: 0
  },
})