import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import appColors from '../constants/colors'
import TopTitle from '../components/listScreenComponents/TopTitle'
import SearchBar from '../components/listScreenComponents/SearchBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RecipientAndCategory from '../components/listScreenComponents/RecipientAndCategory'
import AddCategoryRecipient from '../components/listScreenComponents/AddCategoryRecipient'

export default function CategoryList() {
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <TopTitle title="Categories:" />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar />
        </View>

        <View style={{ flex: 56, borderBottomWidth: 1, borderColor: appColors.lightGrey + '60' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subHeadingExp}>Expenditure</Text>
          </View>
          <ScrollView >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

              <AddCategoryRecipient name='Add Recipient' backgroundColorIcon={appColors.green + '50'} />
              <RecipientAndCategory name={'Groceries'} icon='🏪' backgroundColorIcon={appColors.red + '50'} />
              <RecipientAndCategory name={'Dairy Products'} icon='🥛' backgroundColorIcon={appColors.green + '50'} />
              <RecipientAndCategory name={'Bakery Items'} icon='🍞' backgroundColorIcon={appColors.grey + '50'} />
              <RecipientAndCategory name={'Fruits & Vegetables'} icon='🍏' backgroundColorIcon={appColors.orange + '50'} />
              <RecipientAndCategory name={'Meat & Fish'} icon='🍖' backgroundColorIcon={appColors.blue + '50'} />
              <RecipientAndCategory name={'Groceries'} icon='🏪' backgroundColorIcon={appColors.red + '50'} />
              <RecipientAndCategory name={'Dairy Products'} icon='🥛' backgroundColorIcon={appColors.green + '50'} />
              <RecipientAndCategory name={'Bakery Items'} icon='🍞' backgroundColorIcon={appColors.grey + '50'} />
              <RecipientAndCategory name={'Fruits & Vegetables'} icon='🍏' backgroundColorIcon={appColors.orange + '50'} />
              <RecipientAndCategory name={'Meat & Fish'} icon='🍖' backgroundColorIcon={appColors.blue + '50'} />
              <RecipientAndCategory name={'Meat & Fish'} icon='🍖' backgroundColorIcon={appColors.blue + '50'} />

            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subHeadingEarn}>Earning</Text>
          </View>
          <ScrollView >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

              <AddCategoryRecipient name='Add Recipient' backgroundColorIcon={appColors.green + '50'} />
              <RecipientAndCategory name={'Salary'} icon='💰' backgroundColorIcon={appColors.purple + '50'} />
              <RecipientAndCategory name={'Salary'} icon='💰' backgroundColorIcon={appColors.purple + '50'} />

            </View>
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
  titleContainer: {
    flex: 5,
    justifyContent: 'flex-end'
  },
  searchContainer: {
    flex: 9,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subHeadingExp: {
    fontSize: 15,
    margin: 10,
    fontFamily: 'Roboto-Bold',
    padding: 5,
    backgroundColor: appColors.red + '30',
    borderRadius: 10,
    color: appColors.red
  },
  subHeadingEarn: {
    fontSize: 15,
    margin: 10,
    fontFamily: 'Roboto-Bold',
    padding: 5,
    backgroundColor: appColors.green + '30',
    borderRadius: 10,
    color: appColors.green
  }
})