import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function PayPreviousMerchantsForm() {
  const previousMerchants = useSelector(state => state.recipients.recipients)
  console.log(previousMerchants)
  return (
    <View>
      <Text>PayPreviousMerchantsForm</Text>

    </View>
  )
}

const styles = StyleSheet.create({})