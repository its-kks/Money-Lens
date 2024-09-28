import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, SafeAreaView, TextInput, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../constants/colors';
import { createTables } from '../../sql/dbServices';
import { addDefaultCategories } from '../../sql/dbCategories';
import { addDefaultRecipients } from '../../sql/dbRecipients';
import Buttons from '../../components/welcomeStackComp/Buttons';
import Signup from './Signup';
import Login from './Login';

const verifyEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|protonmail\.com)$/;

  return emailRegex.test(email);
};

const verifyUsername = (username) => {
  const usernameRegex = /^[a-z0-9]{5,10}$/;

  return usernameRegex.test(username);
};


const verifyPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;

  return passwordRegex.test(password);
};

export default function WelcomeScreen({ navigation }) {

  const [loginForm, setLoginForm] = useState(true);

  useEffect(() => {
    async function manageTables() {
      const dbAdded = await AsyncStorage.getItem('dbAdded');
      if (dbAdded) {
        return;
      }
      try {
        await createTables();
        await addDefaultCategories();
        await addDefaultRecipients();
        await AsyncStorage.setItem('dbAdded', 'true');

      }
      catch (error) {
        console.error(error);
      }

    }
    manageTables();

  }, []);


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ height: 85, margin: 10, justifyContent: 'space-between', flexShrink: 0 }}>
        <Text style={styles.titleText}>Manage Money Better</Text>
        <Text style={styles.heading2}>{loginForm ? "Login to continue:" : "Sign up to continue:"}</Text>
      </View>
      {
        loginForm ?
          <Login
            verifyEmail={verifyEmail}
            verifyPassword={verifyPassword}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            navigation={navigation}
          />
          :
          <Signup
            verifyEmail={verifyEmail}
            verifyPassword={verifyPassword}
            verifyUsername={verifyUsername}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            navigation={navigation}
          />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: appColors.white
  },
  titleText: {
    color: appColors.purple,
    fontFamily: 'PTSansNarrow-Regular',
    fontSize: 40,
    fontWeight: '600',
  },
  heading2: {
    color: appColors.purple,
    fontFamily: 'Roboto-Bold',
    fontSize: 20
  },
  changeText: {
    color: appColors.grey,
    fontFamily: 'Roboto-Regular',
    fontSize: 18
  }

});