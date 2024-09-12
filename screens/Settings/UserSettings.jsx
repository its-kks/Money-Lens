import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleSetting from './SingleSetting'

export default function UserSettings() {
  const handleChangePassword = () => {
    console.log('Change Password')
  }
  const handleDependentsCount = () => {
    console.log('Change Dependents Count')
  }
  const handleLogout = () => {
    console.log('Log Out')
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