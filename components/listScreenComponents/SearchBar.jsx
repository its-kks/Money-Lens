import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function SearchBar() {
  return (
    <>
      <View style={styles.icon}>
        <MaterialIcons name="search" size={40} color={appColors.lightBlack} />
      </View>
      <TextInput style={styles.textBox} placeholder='Type name of category, recipient or product'>
      </TextInput>
    </>

  )
}

const styles = StyleSheet.create({
  icon:
  {
    backgroundColor:
      appColors.lightGrey,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textBox:
  {
    flex: 9,
    backgroundColor: appColors.lightGrey,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    height:'80%',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: appColors.lightBlack
  }


})