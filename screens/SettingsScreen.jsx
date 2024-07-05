import React from 'react';
import { Button, Linking, View } from 'react-native';

const handlePress = async (url) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error('An error occurred', error);
    Alert.alert('Error', `Unable to open the URL: ${url}`);
  }
};
const SettingsScreen = () => {
  return (
    <View style={{backgroundColor:'yellow', flex:1, justifyContent:'center', alignItems:'center'}}>
      <Button
        title="Open Link"
        onPress={() => handlePress('upi://pay?pa=paytmqr2810050501011uzby2a107or@paytm&pn=Paytm%20Merchant&mc=5499&mode=02&orgid=000000&paytmqr=2810050501011UZBY2A107OR&sign=MEYCIQCSoy9fIGUOPGguWmY7fx6v21KjMCYUyTmzcmV9gCmmlAIhAKOZxsWL9+CKsMhhvNP/NIq3Y5ETf8HCupK5ljapxpYL&am=1')}
      />
    </View>
  );
};

export default SettingsScreen;

