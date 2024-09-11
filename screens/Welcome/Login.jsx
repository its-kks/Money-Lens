import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import TextField from '../../components/welcomeStackComp/TextField'
import appColors from '../../constants/colors';
import Buttons from '../../components/welcomeStackComp/Buttons';
import { API_URL_LOGIN, API_URL_PROFILE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ verifyEmail,
  verifyPassword, loginForm, setLoginForm, navigation
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPressed, setLoginPressed] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);

  const getProfile = async (accessToken) => {
    const url = API_URL_PROFILE;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if ('errors' in data) {

      } else {
        await AsyncStorage.setItem('name', data.username);
        await AsyncStorage.setItem('avatar', data.avatar);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleLogin = async () => {
    setLoginPressed(true);
    if (!verifyEmail(email) || !verifyPassword(password)) {
      return;
    }
    setLoginLoader(true);
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    try {
      const response = await fetch(API_URL_LOGIN, options);
      const data = await response.json();
      if ('errors' in data) {

      }
      else {
        await AsyncStorage.setItem('access', data.token.access);
        await AsyncStorage.setItem('refresh', data.token.refresh);
        getProfile(data.token.access);
        navigation.replace('BottomTabsHome');
      }
      setLoginLoader(false);
    } catch (error) {
      console.error(error);
      setLoginLoader(false);
    }
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ margin: 10 }}>
          <TextField
            text={email}
            setText={setEmail}
            placeholder={'E-mail'}
            errorMessage={'Invalid Email'}
            showErrorNow={!verifyEmail(email)}
            isRequired={true}
            submitPressed={loginPressed}
          />
          <TextField
            text={password}
            setText={setPassword}
            placeholder={'Password'}
            errorMessage={'Invalid Password'}
            showErrorNow={!verifyPassword(password)}
            isRequired={true}
            submitPressed={false}
            isPassword={true}
          />
        </ScrollView>
      </View>
      <View style={{ flexShrink: 0, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

        <Text style={styles.changeText}>{"Don't have an account "}</Text>
        <Pressable onPress={() => {
          setLoginForm(false)
        }}>
          <Text style={styles.heading2}>SignUp</Text>
        </Pressable>

      </View>

      <View style={{ alignItems: 'center', height: 70, flexShrink: 0 }}>

        <Buttons onPress={() => { handleLogin(); }} value={"Login"} color={appColors.purple} percentWidth={0.95}
          showLoader={loginLoader}
        />

      </View>
    </>
  )
}

const styles = StyleSheet.create({
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
})