import { StyleSheet, Text, TouchableOpacity, View, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import appColors from '../constants/colors'
import { TextInput } from 'react-native-gesture-handler'

export default function WelcomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:appColors.blue}}>
      <Text>Ready To Manage Your Money</Text>
      <Text>What should I call you ? </Text>
      <TextInput placeholder="Enter Your Name"/>
      <TouchableOpacity
        onPress={()=>{
            navigation.navigate('BottomTabsHome');
        }}
      >
        <Text>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.blue,
        width: '100%',
        height: '100%',
    },
})