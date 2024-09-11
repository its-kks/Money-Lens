import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { useState } from 'react'
import AvatarChooser from '../../components/welcomeStackComp/AvatarChooser'
import TextField from '../../components/welcomeStackComp/TextField'
import appColors from '../../constants/colors'
import Buttons from '../../components/welcomeStackComp/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

  const verifyOTP = async () => {

  }

  const handleSignUp = async () => {
    setSignupPressed(true);
    if (!(verifyEmail(email) && verifyUsername(name) && verifyPassword(password) && confirmPass === password)) {
      return;
    }
    const url = '***REMOVED***';
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
      if ('errors' in data) {

      }
      else {
        setEnableOTP(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleOTP = async () => {
    const url = '***REMOVED***';
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({"email":email,"otp":OTP})
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if ( 'errors' in data ) {

      }
      else {
        const saveToken = async () => {
          await AsyncStorage.setItem('access', data.token.access);
          await AsyncStorage.setItem('refresh', data.token.refresh);
          navigation
        }
      }
    } catch (error) {
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
                signupPressed={signupPressed}
              />
              <TextField
                text={name}
                setText={setName}
                placeholder={'Username'}
                errorMessage={'5-10 characters\nOnly small alphabets and numbers are allowed'}
                showErrorNow={!verifyUsername(name)}
                isRequired={true}
                signupPressed={signupPressed}
              />
              <TextField
                text={password}
                setText={setPassword}
                placeholder={'Password'}
                errorMessage={'8-15 characters \nMust have at least one: \nSmall alphabet, Capital alphabet and Digit'}
                showErrorNow={!verifyPassword(password)}
                isRequired={true}
                signupPressed={signupPressed}
                isPassword={true}
              />
              <TextField
                text={confirmPass}
                setText={setConfirmPass}
                placeholder={'Confirm Password'}
                errorMessage={'Passwords not matching'}
                showErrorNow={confirmPass !== password}
                isRequired={true}
                signupPressed={signupPressed}
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
                  errorMessage={'Incorrect OTP'}
                  showErrorNow={!verifyOTP(OTP)}
                  isRequired={true}
                  signupPressed={otpPressed}
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
              // if (verifyOTP(OTP)) {
              //   navigation.navigate('Home');
              // }
            }} value={"Verify OTP"} color={appColors.purple} percentWidth={0.95} />
            :
            <Buttons onPress={() => {
              handleSignUp();
            }} value={"Sign up"} color={appColors.purple} percentWidth={0.95} />

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