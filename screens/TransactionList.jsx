import { Dimensions, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import appColors from '../constants/colors'
import TopTitle from '../components/listScreenComponents/TopTitle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SearchBar from '../components/listScreenComponents/SearchBar'
import SingleTransaction from '../components/listScreenComponents/SingleTransaction'
import ExpandingList from '../components/listScreenComponents/ExpandingList'
import AscDescButton from '../components/listScreenComponents/AscDescButton'

export default function TransactionList() {
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}}> 
      <SafeAreaView style={styles.container}>
        {/* title */}
        <View style={styles.titleContainer}>
          <TopTitle title="Transaction History" />
        </View>

        {/* search */}
        <View View style={styles.searchContainer}>
          <SearchBar />
        </View>

        {/* filters  */}
        <View style={styles.filterContainer}>
          <ExpandingList listItem={['Any', 'Income', 'Expenditure']}/>
          <ExpandingList listItem={['This Month','Prev Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}/>
          <ExpandingList listItem={['This Year', 'Prev Year', '2021', '2022', '2023', '2024', '2025']}/>
          <AscDescButton />
        </View>

        {/* transactions list and add bar */}
        <View style={styles.transactionsContainer}>
          <ScrollView>
            <SingleTransaction itemName='Groceries' itemIcon='🍎' date='12/12/2021' time='12:00' price={-100} itemBackgroundColor={appColors.red + '50'} itemCategory={'Food'}/>
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
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: appColors.white,
    height:Dimensions.get('window').height -142
  },
  filterContainer: {
    flex: 6,
    alignItems: 'baseline',
    justifyContent:'space-evenly',
    flexDirection: 'row',

  },
  transactionsContainer: {
    flex: 80,
  },
  titleContainer:{
    flex:5,
    justifyContent:'flex-end',
  },
  searchContainer: {
    flex: 9,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})