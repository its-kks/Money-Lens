import { Dimensions, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, FlatList, Pressable } from 'react-native'
import React from 'react'
import appColors from '../../../constants/colors'
import TopTitle from '../../../components/listScreenComponents/TopTitle'
import SearchBar from '../../../components/listScreenComponents/SearchBar'
import ExpandingList from '../../../components/listScreenComponents/ExpandingList'
import AscDescButton from '../../../components/listScreenComponents/AscDescButton'
import SingleRecurringExpense from '../../../components/listScreenComponents/SingleRecurringExpense'
import { useSelector } from 'react-redux';
import AddBar from '../../../components/listScreenComponents/AddBar'
import { formattedDate } from '../../../utilities/dateTime'

export default function RecurringList({ navigation }) {

  const fetchedRecurssivePayments = useSelector(state => state.recurringPayments.recurringPayments);
  const loading = useSelector(state => state.recurringPayments.loading);
  const error = useSelector(state => state.recurringPayments.error);

  const [showType, setShowType] = React.useState(false);
  const [showFrequency, setShowFrequency] = React.useState(false);

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
  }

  return (
    <Pressable
      onPress={() => {
        setShowType(false);
        setShowFrequency(false);
      }
      }
    >
      <SafeAreaView style={styles.container}>
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
          <ExpandingList listItem={['All', 'Monthly', 'Yearly', 'Quaterly']} showList={showFrequency} setShowList={setShowFrequency} />
          <ExpandingList listItem={['Any', 'Income', 'Expenditure']} showList={showType} setShowList={setShowType} />
          <AscDescButton />
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
                      type: item.amount<0 ? 'Expense' : 'Income',
                      action_added: item.action_added
                    }
                  );
                }}
              />
            )}
            ListHeaderComponent={<AddBar onPressFunction={handleAddFunction} />}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: appColors.white,

    // 120 = 60 + 60  (60 top bar and 60 bottom bar)
    height: Dimensions.get('window').height - 120 - StatusBar.currentHeight,
  },
  filterContainer: {
    flex: 6,
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

  },
  transactionsContainer: {
    flex: 80,
  },
  titleContainer: {
    flex: 5,
    justifyContent: 'flex-end',
  },
  searchContainer: {
    flex: 9,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})