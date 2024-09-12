import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { useState } from 'react'
import AvatarChooser from '../../components/welcomeStackComp/AvatarChooser'
import TextField from '../../components/welcomeStackComp/TextField'
import appColors from '../../constants/colors'
import Buttons from '../../components/welcomeStackComp/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {API_URL_OTP, API_URL_REGISTER} from '@env';

export default function Signup({ verifyEmail, verifyUsername, verifyPassword, loginForm, setLoginForm, navigation }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('man');
  const [enableOTP, setEnableOTP] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);
  const [otpPressed, setOtpPressed] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [OTP, setOTP] = useState('');

  const [signupLoader, setSignupLoader] = useState(false);
  const [otpLoader, setOTPLoader] = useState(false);

  const verifyOTP = (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  const handleSignUp = async () => {
    setSignupPressed(true);
    if (!(verifyEmail(email) && verifyUsername(name) && verifyPassword(password) && confirmPass === password)) {
      return;
    }
    setSignupLoader(true);
    const url = API_URL_REGISTER;
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: email,
        username: name,
        password: password,
        password2: confirmPass,
        avatar: avatar
      })
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSignupLoader(false);
      if ('errors' in data) {

      }
      else {
        setEnableOTP(true);
      }
    } catch (error) {
      setSignupLoader(false);
      console.error(error);
    }
  }

  const handleOTP = async () => {
    const url = API_URL_OTP;
    setOTPLoader(true);
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ "email": email, "otp": OTP })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setOTPLoader(false);
      if ('errors' in data) {
        console.log(data)
      }
      else {
        const saveToken = async () => {
          await AsyncStorage.setItem('access', data.token.access);
          await AsyncStorage.setItem('refresh', data.token.refresh);
          await AsyncStorage.setItem('name',name);
          await AsyncStorage.setItem('avatar', avatar)
          navigation.replace('BottomTabsHome');
        }
        saveToken();
      }
    } catch (error) {
      setOTPLoader(false);
      console.error(error);
    }
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ margin: 10 }}>
          {
            !enableOTP &&
            <>
              <AvatarChooser avatar={avatar} setAvatar={setAvatar} />
              <TextField
                text={email}
                setText={setEmail}
                placeholder={'E-mail'}
                errorMessage={'Email should be valid \nAllowed domains: @gmail, @outlook, @yahoo, @protonmail'}
                showErrorNow={!verifyEmail(email)}
                isRequired={true}
                submitPressed={signupPressed}
              />
              <TextField
                text={name}
                setText={setName}
                placeholder={'Username'}
                errorMessage={'5-10 characters\nOnly small alphabets and numbers are allowed'}
                showErrorNow={!verifyUsername(name)}
                isRequired={true}
                submitPressed={signupPressed}
              />
              <TextField
                text={password}
                setText={setPassword}
                placeholder={'Password'}
                errorMessage={'8-15 characters \nMust have at least one: \nSmall alphabet, Capital alphabet and Digit'}
                showErrorNow={!verifyPassword(password)}
                isRequired={true}
                submitPressed={signupPressed}
                isPassword={true}
              />
              <TextField
                text={confirmPass}
                setText={setConfirmPass}
                placeholder={'Confirm Password'}
                errorMessage={'Passwords not matching'}
                showErrorNow={confirmPass !== password}
                isRequired={true}
                submitPressed={signupPressed}
                isPassword={true}
              />
            </>
          }
          {
            enableOTP ?
              <>
                <TextField
                  text={OTP}
                  setText={setOTP}
                  placeholder={'OTP'}
                  errorMessage={'Invalid OTP'}
                  showErrorNow={!verifyOTP(OTP)}
                  isRequired={true}
                  submitPressed={otpPressed}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <Text style={{ fontSize: 15, color: appColors.grey, fontFamily: 'Roboto-Bold' }}>{`Check `}</Text>
                  <Text style={{ fontSize: 15, color: appColors.purple, fontFamily: 'Roboto-Bold' }}>{`${email}`}</Text>
                  <Text style={{ fontSize: 15, color: appColors.grey, fontFamily: 'Roboto-Bold' }}>{` for OTP`}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <Pressable onPress={() => { setEnableOTP(false); setOTP('') }}>
                    <Text style={{ fontSize: 16, color: appColors.grey, fontFamily: 'Roboto-Bold', textDecorationLine: 'underline' }}>{`Back`}</Text>
                  </Pressable>
                </View>
              </>
              : null
          }
        </ScrollView>
      </View>
      <View style={{ flexShrink: 0, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {
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

          enableOTP ?
            <Buttons onPress={() => {
              setOtpPressed(true);
              if (verifyOTP(OTP)) {
                handleOTP();
              }
            }} value={"Verify OTP"} color={appColors.purple} percentWidth={0.95} showLoader={otpLoader} />
            :
            <Buttons onPress={() => {
              handleSignUp();
            }} value={"Sign up"} color={appColors.purple} percentWidth={0.95} showLoader={signupLoader} />

        }
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