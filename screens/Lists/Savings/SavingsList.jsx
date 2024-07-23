import { Dimensions, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import appColors from '../../../constants/colors'
import TopTitle from '../../../components/listScreenComponents/TopTitle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SearchBar from '../../../components/listScreenComponents/SearchBar'
import ExpandingList from '../../../components/listScreenComponents/ExpandingList'
import AscDescButton from '../../../components/listScreenComponents/AscDescButton'
import SingleRecurringExpense from '../../../components/listScreenComponents/SingleRecurringExpense'
import SingleSaving from '../../../components/listScreenComponents/SingleSaving'


export default function SavingsList() {
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        {/* title */}
        <View style={styles.titleContainer}>
          <TopTitle title="Savings:" />
        </View>

        {/* search */}
        <View View style={styles.searchContainer}>
          <SearchBar />
        </View>

        {/* filters  */}
        <View style={styles.filterContainer}>
          <ExpandingList listItem={['All', 'Monthly', 'Yearly', 'Quaterly']} />
          <AscDescButton />
        </View>

        {/* transactions list and add bar */}
        <View style={styles.transactionsContainer}>
          <ScrollView>
            <SingleSaving saved={300} itemName='Smartphone' itemIcon='📱' price={-700} itemBackgroundColor={appColors.blue + '50'} />
            <SingleSaving saved={150} itemName='Headphones' itemIcon='🎧' price={-200} itemBackgroundColor={appColors.red + '50'} />
            <SingleSaving saved={20} itemName='E-reader' itemIcon='📖' price={-300} itemBackgroundColor={appColors.purple + '50'} />
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