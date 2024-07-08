import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from './constants/colors';
import InsightsScreen from './screens/InsightsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RecipientList from './screens/RecipientList';
import CategoryList from './screens/CategoryList';
import RecurringList from './screens/RecurringList';
import SavingsList from './screens/SavingsList';
import TransactionList from './screens/TransactionList';
import 'react-native-gesture-handler';
import WelcomeScreen from './screens/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoadScreen from './screens/LoadScreen';
import { Provider } from 'react-redux';
import store from './Redux/store';
import TransactionForm from './components/listScreenComponents/Forms/TransactionForm';


const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator.Navigator
          screenOptions={
            {
              headerShown: false,
            }
          }
        >
          <StackNavigator.Screen name="LoadScreen" component={LoadScreen} />
          <StackNavigator.Screen name="Welcome" component={WelcomeScreen} />
          <StackNavigator.Screen name="BottomTabsHome" component={BottomTabsHome} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const TopTabsLists = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontFamily: 'FiraMono-Bold', fontSize: 12, height: 30 },
        tabBarIndicatorStyle: { backgroundColor: appColors.blue },
        tabBarStyle: { backgroundColor: appColors.white },
        tabBarActiveTintColor: appColors.blue,
        tabBarInactiveTintColor: appColors.grey,
        tabBarScrollEnabled: true,
      }}
    >
      <TopTab.Screen name="Transactions" component={TransactionAndForm} />
      <TopTab.Screen name="Recipients" component={RecipientList} />
      <TopTab.Screen name="Categories" component={CategoryList} />
      <TopTab.Screen name="Recurring Payments" component={RecurringList} />
      <TopTab.Screen name="Savings" component={SavingsList} />
    </TopTab.Navigator>
  )
}

{/* Top Tabs Navigator with Edit forms stack */}

const TransactionAndForm = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
    >
      <StackNavigator.Screen name="TransactionList" component={TransactionList} />
      <StackNavigator.Screen name="TransactionForm" component={TransactionForm} />
    </StackNavigator.Navigator>
  )
}


const BottomTabsHome = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >

      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light', color: appColors.grey }}>Home</Text>
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
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light',  color: appColors.grey }}>Lists</Text>
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
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light',  color: appColors.grey }}>Insights</Text>
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
            <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontFamily: 'Roboto-Light',  color: appColors.grey }}>Settings</Text>
          ),
          tabBarIcon: () => (
            <MaterialIcons name="settings" size={30} color={appColors.blue} />
          ),
        }}
      />

    </BottomTab.Navigator>
  )
}