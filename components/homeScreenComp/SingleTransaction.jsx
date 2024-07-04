import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'

export default function SingleTransaction({itemName,itemIcon,date,time,price, itemBackgroundColor}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={[styles.icon,{backgroundColor:itemBackgroundColor}]}>
          <Text style={styles.iconText}>{itemIcon}</Text>
        </View>
        <View style={price < 0 ?  styles.triangleUp : styles.triangleDown}/>
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.itemName}>{itemName}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={[styles.price, {color: (price < 0 ? appColors.red : appColors.green)  }]}>{'$'+Math.abs(price)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    padding: 5,
    borderRadius: 30,
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
    left:60,
    bottom:10
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
    left:60,
    bottom:10
  },
});