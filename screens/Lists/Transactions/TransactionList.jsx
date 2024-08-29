import { View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import appColors from '../../../constants/colors'
import TopTitle from '../../../components/listScreenComponents/TopTitle'
import SearchBar from '../../../components/listScreenComponents/SearchBar'
import SingleTransaction from '../../../components/listScreenComponents/SingleTransaction'
import ExpandingList from '../../../components/listScreenComponents/ExpandingList'
import AscDescButton from '../../../components/listScreenComponents/AscDescButton'
import AddBar from '../../../components/listScreenComponents/AddBar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactionRequest } from '../../../Redux/actions/transactions'
import { FlatList } from 'react-native-gesture-handler'
import { formattedDate, formattedTime } from '../../../utilities/dateTime'



export default function TransactionList({ navigation }) {
  const dispatch = useDispatch();
  const [showType, setShowType] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const [sort, setSort] = useState('desc');
  const [month, setMonth] = useState('This Month');
  const [type, setType] = useState('Any');
  const [year, setYear] = useState('This Year');


  const fetchedTransactions = useSelector(state => state.transactions.transactions);
  const loading = useSelector(state => state.transactions.loading);
  const error = useSelector(state => state.transactions.error);

  useEffect(() => {
    dispatch(fetchTransactionRequest({ type, month, year, sort }));
  }, [type, month, year, sort]);


  const handleAddNavigation = () => {
    navigation.navigate('TransactionForm', {
      id: '-1',
      name: '',
      amount: 0,
      category: "1",
      date: formattedDate(),
      time: formattedTime(),
      recipient: "1",
      type: 'Expense',
      addition: true
    });
    setType('Any');
    setMonth('This Month');
    setYear('This Year');
  }


  return (
    <View style={{ justifyContent: 'flex-start', backgroundColor: appColors.white, flex: 1 }}
      onPress={() => {
        setShowType(false);
        setShowMonth(false);
        setShowYear(false);
      }}
    >
      <View style={{ height: 35, flexShrink: 0 }}>
        <TopTitle title="Transaction History:" />
      </View>
      <View style={{
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexShrink: 0
      }}>
        <SearchBar />
      </View>
      <View style={{
        height: 30,
        margin: 10,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexShrink: 0
      }}>
        <ExpandingList listItem={['Any', 'Income', 'Expenditure']} showList={showType} setShowList={setShowType}
          currentItem={type} setCurrentItem={setType}
        />
        <ExpandingList listItem={['This Month', 'Prev Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
          showList={showMonth}
          setShowList={setShowMonth}
          currentItem={month} setCurrentItem={setMonth}
        />
        <ExpandingList listItem={['This Year', 'Prev Year']}
          showList={showYear}
          setShowList={setShowYear}
          currentItem={year} setCurrentItem={setYear}
        />
        <AscDescButton sort={sort} setSort={setSort} />
      </View>

      <View style={{ flex: 1 }}>

        <FlatList
          data={fetchedTransactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SingleTransaction
              itemId={item.id}
              itemName={item.name}
              itemIcon={item.icon}
              date={item.tran_date_time.split(' ')[0].split('-').reverse().join('/')}
              time={item.tran_date_time.split(' ')[1]}
              price={item.amount}
              itemBackgroundColor={appColors[item.backgroundColor] + '50'}
              itemRecipient={item.recipient}
              categoryID={item.category_id}
              recipientId={item.recipient_id}
              navigation={navigation} 
              setType={setType}
              setYear={setYear}
              setMonth={setMonth}
              />
          )}
          ListHeaderComponent={<AddBar onPressFunction={handleAddNavigation} />}
          ListFooterComponent={<View style={{ height: 50 }} />}
        />
      </View>

    </View>

  )
}
