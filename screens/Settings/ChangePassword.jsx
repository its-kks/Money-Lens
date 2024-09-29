import { Button, StyleSheet, Text, TextInput, TextInputBase, View } from 'react-native'
import React from 'react'
import { API_URL_CHANGE_PASSWORD } from '@env';
import appColors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePassword() {
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const handleChangePass = async () => {
    const token = AsyncStorage.getItem('token');
    const url = API_URL_CHANGE_PASSWORD;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({password,password2})
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if ( 'errors' in data ) {

      }
      else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={{flex:1, backgroundColor: appColors.white}}>
      <View style={{margin: 10, height:35}}>
        <Text style={{fontSize: 20, fontFamily: 'FiraMono-Bold'}}>Change Password:</Text>
      </View>
      <View style={{flex: 1, margin: 20}}>
        <Text style={{fontSize: 16, fontFamily: 'FiraMono-Bold'}}>New Password:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Text style={{fontSize: 16, fontFamily: 'FiraMono-Bold'}}>Confirm New Password:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => setPassword2(text)}
          value={password2}
        />
        <Button
          title="Change Password"
          onPress={handleChangePass}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})