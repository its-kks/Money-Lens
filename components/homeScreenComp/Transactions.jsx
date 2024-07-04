import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import SingleTransaction from './SingleTransaction'

export default function Transactions() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Last Transactions:</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 90 }}>
        <ScrollView>
          <SingleTransaction itemName='Groceries' itemIcon='🍎' date='12/12/2021' time='12:00' price={-100} itemBackgroundColor={appColors.red + '50'} />
          <SingleTransaction itemName='Salary' itemIcon='💼' date='01/01/2022' time='09:00' price={2000} itemBackgroundColor={appColors.green + '50'} />
          <SingleTransaction itemName='Utilities' itemIcon='💡' date='15/12/2021' time='10:00' price={-150} itemBackgroundColor={appColors.blue + '50'} />
          <SingleTransaction itemName='Dining Out' itemIcon='🍽️' date='18/12/2021' time='19:30' price={-50} itemBackgroundColor={appColors.grey + '50'} />
          <SingleTransaction itemName='Gym Membership' itemIcon='🏋️' date='20/12/2021' time='11:00' price={-30} itemBackgroundColor={appColors.purple + '50'} />
          <SingleTransaction itemName='Freelance Project' itemIcon='💻' date='25/12/2021' time='15:00' price={500} itemBackgroundColor={appColors.green + '50'} />
          <SingleTransaction itemName='Groceries' itemIcon='🍎' date='12/12/2021' time='12:00' price={-100} itemBackgroundColor={appColors.red + '50'} />
          <SingleTransaction itemName='Salary' itemIcon='💼' date='01/01/2022' time='09:00' price={2000} itemBackgroundColor={appColors.green + '50'} />
          <SingleTransaction itemName='Utilities' itemIcon='💡' date='15/12/2021' time='10:00' price={-150} itemBackgroundColor={appColors.blue + '50'} />
          <SingleTransaction itemName='Dining Out' itemIcon='🍽️' date='18/12/2021' time='19:30' price={-50} itemBackgroundColor={appColors.grey + '50'} />
          <SingleTransaction itemName='Gym Membership' itemIcon='🏋️' date='20/12/2021' time='11:00' price={-30} itemBackgroundColor={appColors.purple + '50'} />
          <SingleTransaction itemName='Freelance Project' itemIcon='💻' date='25/12/2021' time='15:00' price={500} itemBackgroundColor={appColors.green + '50'} />
        </ScrollView>
      </View>
      {/* <View style={{ flex: 5 }}>

      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 60,
    width: Dimensions.get('window').width
  },
  header: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 30,
    marginLeft: 10,
    fontFamily: 'Roboto-Light',
    fontWeight: '600',
    color: appColors.black
  },
  headerButton: {
    color: appColors.blue,
    marginRight: 10,
    padding: 10,
    fontFamily: 'Roboto-Bold',
    backgroundColor: appColors.blue + '30',
    borderRadius: 10
  }
})

