import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleSetting from './SingleSetting'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UserSettings({navigation}) {
  const handleChangePassword = () => {
    console.log('Change Password')
  }
  const handleDependentsCount = () => {
    console.log('Change Dependents Count')
  }
  const handleLogout = async () => {
    await AsyncStorage.removeItem('access');
    await AsyncStorage.removeItem('refresh');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('avatar');
    navigation.replace('Welcome');
  }
  return (
    <View>
      <SingleSetting heading="User" settingObject={
        {
          "Change Password": handleChangePassword,
          "Change Dependents Count" : handleDependentsCount,
          "Log Out": handleLogout,
        }
      } />
    </View>
  )
}

const styles = StyleSheet.create({})