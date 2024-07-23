import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeForm from '../screens/Home/QRCodeForm';
import PayPreviousMerchantsForm from '../screens/Home/PayPreviousMerchantsForm';
import HomeScreen from '../screens/Home/HomeScreen';
import ScanAndRedirectScreen from '../screens/Home/ScanAndRedirectScreen';


const StackNavigator = createStackNavigator();
export default function HomeStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
    >
      <StackNavigator.Screen name="HomeScreen" component={HomeScreen}/>
      <StackNavigator.Screen name='ScanAndRedirectScreen' component={ScanAndRedirectScreen}/>
      <StackNavigator.Screen name="QRCodeForm" component={QRCodeForm}/>
      <StackNavigator.Screen name="PayPreviousMerchantsForm" component={PayPreviousMerchantsForm}/>
    </StackNavigator.Navigator>
  )
}

const styles = StyleSheet.create({})