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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;

  return passwordRegex.test(password);
};

const verifyOTP = (otp) => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};


export default function WelcomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('man');
  const [enableNext, setEnableNext] = useState(false);

  const [loginForm, setLoginForm] = useState(false);
  const [enableOTP, setEnableOTP] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [otpPressed, setOtpPressed] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [OTP, setOTP] = useState('');

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

  useEffect(() => {
    setEnableNext(name.length > 0);
  }, [name]);


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ height: 85, margin: 10, justifyContent: 'space-between', flexShrink: 0 }}>
        <Text style={styles.titleText}>Manage Money Better</Text>
        <Text style={styles.heading2}>{loginForm ? "Login to continue:" : "Sign up to continue:"}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ margin: 10 }}>

          {loginForm ?

            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            :
            <Signup
              avatar={avatar}
              setAvatar={setAvatar}
              email={email}
              setEmail={setEmail}
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              confirmPass={confirmPass}
              setConfirmPass={setConfirmPass}
              OTP={OTP}
              setOTP={setOTP}
              verifyEmail={verifyEmail}
              verifyUsername={verifyUsername}
              verifyPassword={verifyPassword}
              verifyOTP={verifyOTP}
              submitPressed={signupPressed}
              enableOTP={enableOTP}
              otpPressed={otpPressed}
            />

          }

        </ScrollView>

      </View>
      <View style={{ flexShrink: 0, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {
          loginForm ?
            <>
              <Text style={styles.changeText}>{"Don't have an account "}</Text>
              <Pressable onPress={() => {
                setLoginForm(false)
              }}>
                <Text style={styles.heading2}>SignUp</Text>
              </Pressable>
            </>

            :

            <>
              <Text style={styles.changeText}>{"Already have an account "}</Text>
              <Pressable onPress={() => {
                setLoginForm(true)
              }}>
                <Text style={styles.heading2}>Login</Text>
              </Pressable>
            </>
        }
      </View>

      <View style={{ alignItems: 'center', height: 70, flexShrink: 0 }}>
        {
          loginForm ?
            <Buttons onPress={() => { console.log('Login') }} value={"Login"} color={appColors.purple} percentWidth={0.95} />
            :
            <>
              {
                enableOTP ?
                  <Buttons onPress={() => {
                    setOtpPressed(true);
                    // if (verifyOTP(OTP)) {
                    //   navigation.navigate('Home');
                    // }
                  }} value={"Verify OTP"} color={appColors.purple} percentWidth={0.95} />
                  :
                  <Buttons onPress={() => {
                    setSignupPressed(true);
                    if (verifyEmail(email) && verifyUsername(name) && verifyPassword(password) && confirmPass === password) {
                      setEnableOTP(true);
                    }
                  }} value={"Sign up"} color={appColors.purple} percentWidth={0.95} />
              }

            </>
        }


      </View>
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