import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleSetting from './SingleSetting'

export default function DatabaseSettings() {
  const handleCreateBackup = () => {
    console.log('Backup')
  }
  const handleRestoreBackup = () => {
    console.log('Restore')
  }
  const handleResetDB = () => {
    console.log('Reset')
  }
  return (
    <View>
      <SingleSetting heading="Data"  settingObject={
        {
          "Create Backup" : handleCreateBackup,
          "Restore Backup" : handleRestoreBackup,
          "Reset Database" : handleResetDB,
        }
      }/>
    </View>
  )
}

const styles = StyleSheet.create({})