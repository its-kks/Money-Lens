import { ScrollView,View, Pressable } from 'react-native'
import React ,{useState} from 'react'
import appColors from '../constants/colors'
import TopTitle from '../components/listScreenComponents/TopTitle'
import SearchBar from '../components/listScreenComponents/SearchBar'
import SingleTransaction from '../components/listScreenComponents/SingleTransaction'
import ExpandingList from '../components/listScreenComponents/ExpandingList'
import AscDescButton from '../components/listScreenComponents/AscDescButton'
import AddBar from '../components/listScreenComponents/AddBar'

export default function TransactionList({navigation}) {
  const [showType,setShowType] = useState(false);
  const [showMonth,setShowMonth] = useState(false);
  const [showYear,setShowYear] = useState(false);

  const handleAddNavigation = () => {
    const date = new Date();
    const formattedDate = [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'), // Months are 0-based
      date.getFullYear(),
    ].join('-');
  
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
        <TopTitle title="Transaction History" />
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

        <ScrollView>
          <AddBar onPressFunction={handleAddNavigation} />
          <SingleTransaction itemName='Groceries' itemIcon='🍎' date='12/12/2021' time='12:00' price={-100} itemBackgroundColor={appColors.red + '50'} itemCategory={'Food'} />
          <SingleTransaction itemName='Salary' itemIcon='💼' date='01/01/2022' time='09:00' price={2000} itemBackgroundColor={appColors.green + '50'} />
          <SingleTransaction itemName='Utilities' itemIcon='💡' date='15/12/2021' time='10:00' price={-150} itemBackgroundColor={appColors.blue + '50'} />
          <SingleTransaction itemName='Dining Out' itemIcon='🍽️' date='18/12/2021' time='19:30' price={-50} itemBackgroundColor={appColors.grey + '50'} />
          <SingleTransaction itemName='Gym Membership' itemIcon='🏋️' date='20/12/2021' time='11:00' price={-30} itemBackgroundColor={appColors.purple + '50'} />
          <SingleTransaction itemName='Freelance Project' itemIcon='💻' date='25/12/2021' time='15:00' price={9999999} itemBackgroundColor={appColors.green + '50'} />
          <SingleTransaction itemName='Groceries' itemIcon='🍎' date='12/12/2021' time='12:00' price={-100} itemBackgroundColor={appColors.red + '50'} />
          <SingleTransaction itemName='Salary' itemIcon='💼' date='01/01/2022' time='09:00' price={2000} itemBackgroundColor={appColors.green + '50'} />
          <SingleTransaction itemName='Utilities' itemIcon='💡' date='15/12/2021' time='10:00' price={-150} itemBackgroundColor={appColors.blue + '50'} />
          <SingleTransaction itemName='Dining Out' itemIcon='🍽️' date='18/12/2021' time='19:30' price={-50} itemBackgroundColor={appColors.grey + '50'} />
          <SingleTransaction itemName='Gym Membership' itemIcon='🏋️' date='20/12/2021' time='11:00' price={-30} itemBackgroundColor={appColors.purple + '50'} />
          <SingleTransaction itemName='Freelance Project' itemIcon='💻' date='25/12/2021' time='15:00' price={500} itemBackgroundColor={appColors.green + '50'} />
        </ScrollView>
      </View>

    </Pressable>
  
  )
}
