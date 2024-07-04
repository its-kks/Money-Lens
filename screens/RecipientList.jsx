import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import appColors from '../constants/colors'
import TopTitle from '../components/listScreenComponents/TopTitle'
import SearchBar from '../components/listScreenComponents/SearchBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RecipientAndCategory from '../components/listScreenComponents/RecipientAndCategory'
import AddCategoryRecipient from '../components/listScreenComponents/AddCategoryRecipient'

export default function RecipientList() {
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <TopTitle title="Recipients:" />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar />
        </View>

        <View style={styles.recipentsContainer}>
          <ScrollView >
            <View style={{ flexDirection: 'row', flexWrap:'wrap', justifyContent:'space-evenly' }}>

              <RecipientAndCategory name={'Milk Man'} icon='🐄' backgroundColorIcon={appColors.red+'50'}/>
              <RecipientAndCategory name={'School'} icon='👨‍🏫' backgroundColorIcon={appColors.orange+'50'}/>
              <RecipientAndCategory name={'Milk Man'} icon='🐄' backgroundColorIcon={appColors.red+'50'}/>
              <RecipientAndCategory name={'School'} icon='👨‍🏫' backgroundColorIcon={appColors.orange+'50'}/>
              <RecipientAndCategory name={'Milk Man'} icon='🐄' backgroundColorIcon={appColors.red+'50'}/>
              <RecipientAndCategory name={'School'} icon='👨‍🏫' backgroundColorIcon={appColors.orange+'50'}/>
              <RecipientAndCategory name={'Milk Man'} icon='🐄' backgroundColorIcon={appColors.red+'50'}/>
              <RecipientAndCategory name={'School'} icon='👨‍🏫' backgroundColorIcon={appColors.orange+'50'}/>
              <AddCategoryRecipient name='Add Recipient' backgroundColorIcon={appColors.green+'50'}/>
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
  recipentsContainer: {
    flex: 86,
    flexDirection: 'row',
  }
})