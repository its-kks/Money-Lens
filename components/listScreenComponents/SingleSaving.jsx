import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SingleSaving({ itemName, itemIcon, itemBackgroundColor, price, saved }) {

  const completed = Math.floor((100 * saved) / Math.abs(price));
  const left = 100 - completed;
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
         <Text style={styles.dateText}>{'Saved  ' + saved + '  of  ' + Math.abs(price)}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={{ height: 10, width: completed + '%', backgroundColor: appColors.green, borderRadius: 10 }}></View>
          <View style={{ height: 10, width: left + '%', backgroundColor: appColors.lightGrey, borderRadius: 10 }}></View>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={[styles.price, { color: (price < 0 ? appColors.red : appColors.green) }]}>{'$' + (Math.abs(price)-saved)}</Text>
        <TouchableOpacity style={styles.editIcon}>
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
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: appColors.lightGrey,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 10
  },

});