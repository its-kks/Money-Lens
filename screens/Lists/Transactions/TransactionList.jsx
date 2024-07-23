import { ScrollView,View, Pressable } from 'react-native'
import React ,{useState, useEffect} from 'react'
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


export default function TransactionList({navigation}) {
  const dispatch = useDispatch();
  const fetchedTransactions = useSelector(state => state.transactions.transactions);
  const loading = useSelector(state => state.transactions.loading);
  const error = useSelector(state => state.transactions.error);

  const [showType,setShowType] = useState(false);
  const [showMonth,setShowMonth] = useState(false);
  const [showYear,setShowYear] = useState(false);

  const handleAddNavigation = () => {
    const date = new Date();
    const formattedDate = [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'), // Months are 0-based
      date.getFullYear(),
    ].join('/');
  
    const formattedTime = [
      date.getHours().toString().padStart(2, '0'),
      date.getMinutes().toString().padStart(2, '0'),
      date.getSeconds().toString().padStart(2, '0'),
    ].join(':');
  
    navigation.navigate('TransactionForm', {
      id:'-1',
      name: '',
      amount: 0,
      category: "1",
      date: formattedDate,
      time: formattedTime, 
      recipient: "1",
      type: 'Expense',
      addition: true
    }); 
  }


  return (
    <Pressable style={{ justifyContent: 'flex-start' , backgroundColor:appColors.white, flex:1}}
      onPress={()=>{
        setShowType(false);
        setShowMonth(false);
        setShowYear(false);
      }}
    >
      <View style={{ height: 30 }}>
        <TopTitle title="Transaction History:" />
      </View>
      <View style={{
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
        <SearchBar />
      </View>
      <View style={{
        height: 30,
        margin: 10,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      }}>
        <ExpandingList listItem={['Any', 'Income', 'Expenditure']} showList={showType} setShowList={setShowType}/>
        <ExpandingList listItem={['This Month', 'Prev Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} 
          showList={showMonth}
          setShowList={setShowMonth}
        />
        <ExpandingList listItem={['This Year', 'Prev Year', '2021', '2022', '2023', '2024', '2025']} 
          showList={showYear}
          setShowList={setShowYear}
        />
        <AscDescButton />
      </View>

      <View style={{ height: 500}}>

        <FlatList
          data={fetchedTransactions}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SingleTransaction 
              itemId={item.id}
              itemName={item.name} 
              itemIcon={item.icon} 
              date={item.tran_date_time.split(' ')[0].split('-').reverse().join('/')} 
              time={item.tran_date_time.split(' ')[1]} 
              price={item.amount} 
              itemBackgroundColor={appColors[item.backgroundColor]+'50'} 
              itemRecipient={item.recipient}
              categoryID={item.category_id}
              recipientId={item.recipient_id}
              navigation={navigation}
            />
          )}
          ListHeaderComponent={<AddBar onPressFunction={handleAddNavigation} />}
        />
      </View>

    </Pressable>
  
  )
}
