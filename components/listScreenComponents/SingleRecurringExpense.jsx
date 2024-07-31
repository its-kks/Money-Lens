import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SingleRecurringExpense({ itemName, itemIcon, repeat, price, itemBackgroundColor, handleUpdate }) {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <View style={[styles.icon, { backgroundColor: itemBackgroundColor }]}>
          <Text style={styles.iconText}>{itemIcon}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.itemName}>{itemName}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{'Every ' +repeat + (repeat > 1 ? ' months' : ' month')}</Text>

          <MaterialCommunityIcons name="repeat-variant" size={18} color={appColors.lightBlack} />

        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={[styles.price, { color: (price < 0 ? appColors.red : appColors.green) }]}>{'$' + Math.abs(price)}</Text>
        <TouchableOpacity style={styles.editIcon}
          onPress={handleUpdate}
        >
          <MaterialCommunityIcons name="dots-vertical" size={30} color={appColors.lightGrey} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: appColors.red + '30'
  },
  iconContainer: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  iconText: {
    fontSize: 30,
    color: 'white',
  },
  detailsContainer: {
    flex: 40,
    justifyContent: 'space-around',
  },
  itemName: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: appColors.black,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'Roboto-Light',
    color: appColors.lightBlack,
    fontWeight: 'bold',
  },
  priceContainer: {
    flex: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    padding: 5,
    marginLeft: 10,
    flex: 70,
  },
  editIcon: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});