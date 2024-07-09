import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../constants/colors'
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddCategoryRecipient({ navigateAdd }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        navigateAdd();

      }}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text style={{ fontSize: 30, color: appColors.grey, }}>+</Text>
          </View>
        </View>

        <View style={styles.dataContainer}>
          <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontFamily: 'FiraMono-Regular', color: appColors.lightBlack }}>Add</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    height: 120,
    width: 120
  },
  iconContainer: {
    flex: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  dataContainer: {
    flex: 45,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 120,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: appColors.white + '50',
    borderWidth: 2,
    borderColor: appColors.grey,
    borderStyle: 'dashed'
  }
})