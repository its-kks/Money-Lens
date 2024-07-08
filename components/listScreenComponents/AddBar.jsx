import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function AddBar({onPressFunction}) {
  return (
    <TouchableOpacity style={styles.container}
      onPress={onPressFunction}
    >

      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>
            <MaterialCommunityIcons name="plus" size={30} color={appColors.grey} />
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.itemName}>Add</Text>
        </View>
        <View style={styles.dateContainer}>
        </View>
      </View>
        
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>$????</Text>
        <View style={styles.editIcon}>
          <MaterialCommunityIcons name="dots-vertical" size={30} color={appColors.lightGrey} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: appColors.red+'30'
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
    borderWidth:2,
    borderColor:appColors.grey,
    borderStyle:'dashed',
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
    color: appColors.grey,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 10,
    backgroundColor: appColors.lightGrey,
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
    marginLeft:10,
    flex:70,
    color: appColors.lightGrey,
  },
  editIcon: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});