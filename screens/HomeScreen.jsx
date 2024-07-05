import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import TopText from '../components/homeScreenComp/TopText';
import PayButtons from '../components/homeScreenComp/PayButtons';
import Transactions from '../components/homeScreenComp/Transactions';
import { createTables } from '../sql/dbServices';


export default function HomeScreen() {
  useEffect(() => {
    createTables();
  }, []
  );
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
      <SafeAreaView style={styles.homeScreenContainer}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <TopText />
        <PayButtons />
        <Transactions />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height - 60,
  },
});