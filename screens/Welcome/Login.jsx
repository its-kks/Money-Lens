import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextField from '../../components/welcomeStackComp/TextField'

export default function Login({email, setEmail, password, setPassword, submitPressed, verifyEmail,
   verifyPassword
}) {
  return (
    <View>
      <TextField
        text={email}
        setText={setEmail}
        placeholder={'E-mail'}
        errorMessage={'Invalid Email'}
        showErrorNow={!verifyEmail(email)}
        isRequired={true}
        submitPressed={false}
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
    </View>
  )
}

const styles = StyleSheet.create({})