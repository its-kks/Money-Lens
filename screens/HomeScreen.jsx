import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopText from '../components/homeScreenComp/TopText';
import PayButtons from '../components/homeScreenComp/PayButtons';
import Transactions from '../components/homeScreenComp/Transactions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState(require('../assets/images/man.png'));
  useEffect(()=>{
    async function updateData(){
      const name = await AsyncStorage.getItem('name')
      const avatar = await AsyncStorage.getItem('avatar')
      setUserName(name);
      setAvatar(avatar==='man' ? require('../assets/images/man.png') : require('../assets/images/woman.png'));
    }
    updateData();
  },[])
  return (
    
      <SafeAreaView style={styles.homeScreenContainer}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <TopText userName={userName} src={avatar}/>
        <PayButtons />
        <Transactions />
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex:1
  },
});