import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from './constants/colors';
import InsightsScreen from './screens/InsightsScreen';
import SettingsScreen from './screens/SettingsScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import RecipientList from './screens/RecipientList';
import CategoryList from './screens/CategoryList';
import RecurringList from './screens/RecurringList';
import SavingsList from './screens/SavingsList';
import TransactionList from './screens/TransactionList';

const TopTab = createMaterialTopTabNavigator();

const BottomTab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle:{height:60},
        }}
      >

        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light', marginBottom: 10 }}>Home</Text>
            ),
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" size={30} color={appColors.blue} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Lists"
          component={TopTabsLists}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light', marginBottom: 10 }}>Lists</Text>
            ),
            tabBarIcon: () => (
              <MaterialIcons name="view-list" size={30} color={appColors.blue} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Insights"
          component={InsightsScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light', marginBottom: 10 }}>Insights</Text>
            ),
            tabBarIcon: () => (
              <MaterialCommunityIcons name="database-cog" size={30} color={appColors.blue} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light',marginBottom: 10 }}>Settings</Text>
            ),
            tabBarIcon: () => (
              <MaterialIcons name="settings" size={30} color={appColors.blue} />
            ),
          }}
        />

      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const TopTabsLists = ()=>{
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontFamily: 'FiraMono-Bold', fontSize: 12, marginTop: 30, height:30},
        tabBarIndicatorStyle: {backgroundColor: appColors.blue},
        tabBarStyle: {backgroundColor: appColors.white},
        tabBarActiveTintColor: appColors.blue,
        tabBarInactiveTintColor: appColors.grey,
        tabBarScrollEnabled: true,
      }}
    >
      <TopTab.Screen name="Transactions" component={TransactionList}/>
      <TopTab.Screen name="Recipients" component={RecipientList}/>
      <TopTab.Screen name="Categories" component={CategoryList}/>
      <TopTab.Screen name="Recurring Payments" component={RecurringList}/>
      <TopTab.Screen name="Savings" component={SavingsList}/>
    </TopTab.Navigator>
  )
}