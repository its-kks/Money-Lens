import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import appColors from '../constants/colors'
import TopTitle from '../components/listScreenComponents/TopTitle'
import SearchBar from '../components/listScreenComponents/SearchBar'
import RecipientAndCategory from '../components/listScreenComponents/RecipientAndCategory'
import AddCategoryRecipient from '../components/listScreenComponents/AddCategoryRecipient'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoriesRequest } from '../Redux/actions/categories'


export default function CategoryList() {
  const dispatch = useDispatch();
  const fetchedCategories = useSelector(state => state.categories.categories);
  const loading = useSelector(state => state.categories.loading);
  const error = useSelector(state => state.categories.error);

  const [columns, setColumns] = useState(3);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  return (
    <View>
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
          <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            <AddCategoryRecipient name='Add Recipient' backgroundColorIcon={appColors.green + '50'} />
            {fetchedCategories.map((item) => (
              item.type === 'Expense' ? (
                <RecipientAndCategory key={item.id.toString()} name={item.name} icon={item.icon} backgroundColorIcon={appColors[item.background_color] + '50'} />
              ) : null
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 30, borderBottomWidth: 1, borderColor: appColors.lightGrey + '60' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subHeadingEarn}>Income</Text>
          </View>
          <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            <AddCategoryRecipient name='Add Recipient' backgroundColorIcon={appColors.green + '50'} />
            {fetchedCategories.map((item) => (
              item.type === 'Income' ? (
                <RecipientAndCategory key={item.id.toString()} name={item.name} icon={item.icon} backgroundColorIcon={appColors[item.background_color] + '50'} />
              ) : null
            ))}
          </ScrollView>
        </View>


      </SafeAreaView>
    </View>
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