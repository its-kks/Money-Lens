import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import appColors from '../../../constants/colors'
import TopTitle from '../../../components/listScreenComponents/TopTitle'
import SearchBar from '../../../components/listScreenComponents/SearchBar'
import RecipientAndCategory from '../../../components/listScreenComponents/RecipientAndCategory'
import AddCategoryRecipient from '../../../components/listScreenComponents/AddCategoryRecipient'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoriesRequest } from '../../../Redux/actions/categories'

export default function CategoryList({ navigation }) {
  const dispatch = useDispatch();
  const fetchedCategories = useSelector(state => state.categories.categories);
  const loading = useSelector(state => state.categories.loading);
  const error = useSelector(state => state.categories.error);

  return (
    <View style={{ flex: 1 }}>

      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <TopTitle title="Categories:" />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar />
        </View>

        <View style={{ flex: 1, borderBottomWidth: 1, borderColor: appColors.lightGrey + '60' }}>
          <View style={{ flexDirection: 'row', height: 50, flexShrink: 0 }}>
            <Text style={styles.subHeadingExp}>Expenditure</Text>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              <AddCategoryRecipient
                navigateAdd={() => navigation.navigate('CategoryForm', {
                  id: 0,
                  name: '',
                  icon: '😊',
                  backgroundColor: 'red',
                  type: 'Expense',
                  addition: true
                })}
              />
              {fetchedCategories.map((item) => (
                item.type === 'Expense' ? (
                  <RecipientAndCategory key={item.id.toString()}
                    name={item.name} icon={item.icon}
                    backgroundColorIcon={appColors[item.background_color] + '50'}
                    onPressFunc={() => navigation.navigate('CategoryForm', {
                      id: item.id,
                      name: item.name,
                      icon: item.icon,
                      backgroundColor: item.background_color,
                      type: item.type,
                      addition: false
                    })}
                  />
                ) : null
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={{ flex: 1, borderBottomWidth: 1, borderColor: appColors.lightGrey + '60' }}>
          <View style={{ flexDirection: 'row', height: 50, flexShrink: 0 }}>
            <Text style={styles.subHeadingEarn}>Income</Text>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              <AddCategoryRecipient
                navigateAdd={() => navigation.navigate('CategoryForm', {
                  id: 0,
                  name: '',
                  icon: '😊',
                  backgroundColor: 'red',
                  type: 'Income',
                  addition: true
                })}
              />
              {fetchedCategories.map((item) => (
                item.type === 'Income' ? (
                  <RecipientAndCategory key={item.id.toString()}
                    name={item.name} icon={item.icon}
                    backgroundColorIcon={appColors[item.background_color] + '50'}
                    onPressFunc={() => navigation.navigate('CategoryForm', {
                      id: item.id,
                      name: item.name,
                      icon: item.icon,
                      backgroundColor: item.background_color,
                      type: item.type,
                      addition: false
                    })}
                  />
                ) : null
              ))}
            </ScrollView>
          </View>
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