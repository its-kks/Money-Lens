import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ScanAndRedirectScreen from '../screens/ScanAndRedirectScreen';


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
    </StackNavigator.Navigator>
  )
}

const styles = StyleSheet.create({})