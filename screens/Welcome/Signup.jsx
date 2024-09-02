import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvatarChooser from '../../components/welcomeStackComp/AvatarChooser'
import TextField from '../../components/welcomeStackComp/TextField'
import appColors from '../../constants/colors'

export default function Signup({ avatar, setAvatar, email, setEmail, name, setName, password, setPassword,
  confirmPass, setConfirmPass, OTP, setOTP, verifyEmail, verifyUsername, verifyPassword, verifyOTP, submitPressed,
  enableOTP, otpPressed
}) {
  return (
    <View>
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
            submitPressed={submitPressed}
          />
          <TextField
            text={name}
            setText={setName}
            placeholder={'Username'}
            errorMessage={'5-10 characters\nOnly small alphabets and numbers are allowed'}
            showErrorNow={!verifyUsername(name)}
            isRequired={true}
            submitPressed={submitPressed}
          />
          <TextField
            text={password}
            setText={setPassword}
            placeholder={'Password'}
            errorMessage={'8-15 characters \nMust have at least one: \nSmall alphabet, Capital alphabet and Digit'}
            showErrorNow={!verifyPassword(password)}
            isRequired={true}
            submitPressed={submitPressed}
            isPassword={true}
          />
          <TextField
            text={confirmPass}
            setText={setConfirmPass}
            placeholder={'Confirm Password'}
            errorMessage={'Passwords not matching'}
            showErrorNow={confirmPass !== password}
            isRequired={true}
            submitPressed={submitPressed}
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
              submitPressed={otpPressed}
            />
            <View style={{flexDirection:'row', justifyContent: 'center', marginTop: 10}}>
              <Text style={{ fontSize: 15, color: appColors.grey, fontFamily: 'Roboto-Bold' }}>{`Check `}</Text>
              <Text style={{ fontSize: 15, color: appColors.purple, fontFamily: 'Roboto-Bold' }}>{`${email}`}</Text>
              <Text style={{ fontSize: 15, color: appColors.grey, fontFamily: 'Roboto-Bold' }}>{` for OTP`}</Text>
            </View>
          </>
          : null
      }
    </View>
  )
}

const styles = StyleSheet.create({})