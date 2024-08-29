import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SingleTransaction({ navigation, itemId, itemName, itemIcon, date, time, 
  price, itemBackgroundColor, itemRecipient, categoryID, recipientId , setType, setMonth, setYear }) {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <View style={[styles.icon, { backgroundColor: itemBackgroundColor }]}>
          <Text style={styles.iconText}>{itemIcon}</Text>
        </View>
        <View style={price < 0 ? styles.triangleUp : styles.triangleDown} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{itemRecipient}</Text>
        </View>
        <View>
          <Text style={styles.itemName}>{itemName}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={[styles.price, { color: (price < 0 ? appColors.red : appColors.green) }]}>{'$' + Math.abs(price)}</Text>
        <TouchableOpacity style={styles.editIcon} onPress={() => {
          navigation.navigate('TransactionForm', {
            id: itemId,
            name: itemName,
            amount: price,
            category: categoryID,
            date: date,
            time: time,
            recipient: recipientId,
            type: price < 0 ? 'Expense' : 'Income',
            addition: false
          });
          setType('Any');
          setMonth('This Month');
          setYear('This Year');
        }}>
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
  timeText: {
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
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5, // Half the base width of the triangle
    borderRightWidth: 5, // Half the base width of the triangle
    borderBottomWidth: 0, // No bottom border
    borderTopWidth: 10, // Height of the triangle
    borderLeftColor: 'transparent', // Left border is transparent
    borderRightColor: 'transparent', // Right border is transparent
    borderTopColor: appColors.green, // Color of the triangle
    position: 'absolute',
    left: 60,
    bottom: 10
  },
  triangleUp: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 0,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: appColors.red,
    position: 'absolute',
    left: 60,
    bottom: 10
  },
  editIcon: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});