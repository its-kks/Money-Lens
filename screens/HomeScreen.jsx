import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TopText from '../components/homeScreenComp/TopText';
import PayButtons from '../components/homeScreenComp/PayButtons';
import Transactions from '../components/homeScreenComp/Transactions';

export default function HomeScreen() {
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