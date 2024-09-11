import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { useState } from 'react'
import TextField from '../../components/welcomeStackComp/TextField'
import appColors from '../../constants/colors';
import Buttons from '../../components/welcomeStackComp/Buttons';

export default function Login({ verifyEmail,
  verifyPassword, loginForm, setLoginForm
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPressed, setLoginPressed] = useState(false);
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
            isPassword={loginPressed}
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

        <Buttons onPress={() => { console.log('Login') }} value={"Login"} color={appColors.purple} percentWidth={0.95} />

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