import { StyleSheet, Text, View, Dimensions, Linking } from 'react-native'
import React from 'react'
import ButtonPay from './ButtonPay'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import appColors from '../../constants/colors'
import {Camera} from 'react-native-vision-camera';

export default function PayButtons({ navigation }) {
  const handleScanAndRedirect = async () => {
      let status = Camera.getCameraPermissionStatus();
      if ( status !== 'granted' ) {
        status = await Camera.requestCameraPermission();
      }
      if(status === 'granted'){
        navigation.navigate('ScanAndRedirectScreen');
      }
      else{
        alert('Please allow camera permission from settings to scan QR code');
      }
  }

  const handlePreviousMerchant = () => {
    navigation.navigate('PayPreviousMerchantsForm');
  }


  const handleAddNavigation = (type) => {
    const date = new Date();
    const formattedDate = [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getFullYear(),
    ].join('-');

    const formattedTime = [
      date.getHours().toString().padStart(2, '0'), 
      date.getMinutes().toString().padStart(2, '0'),
      date.getSeconds().toString().padStart(2, '0'),
    ].join(':');

    navigation.navigate('BottomTabsHome', {
      screen: 'Lists',
      params: {
        screen: 'Transactions',
        params: {
          screen: 'TransactionForm',
          params: {
            id: '-1',
            name: '',
            amount: 0,
            category: "1",
            date: formattedDate,
            time: formattedTime,
            recipient: "1",
            type: type,
            addition: true
          }
        }
      }
    });
  }

  return (
    <View style={styles.container}>
      <ButtonPay
        icon={<MaterialIcons name="qr-code-2" size={35} color={appColors.orange} />}
        text={'Scan and Redirect'}
        iconColor={appColors.orange}
        onPress={
          () => handleScanAndRedirect()
        }
      />
      <ButtonPay
        icon={<MaterialCommunityIcons name="shopping" size={35} color={appColors.pink} />}
        text="Pay Previous Recipients"
        iconColor={appColors.pink}
        onPress={() => handlePreviousMerchant()}
      />
      <ButtonPay
        icon={<MaterialCommunityIcons name="cash-plus" size={35} color={appColors.green} />}
        text="Add  Earnings" // Assuming you want to add a text prop as well
        iconColor={appColors.green}
        onPress={() => handleAddNavigation('Income')}
      />
      <ButtonPay
        icon={<MaterialIcons name='account-balance-wallet' size={35} color={appColors.red} />}
        text="Add Expenditure"
        iconColor={appColors.red}
        onPress={() => handleAddNavigation('Expense')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 175,
    flexShrink: 0

    // backgroundColor:'red'
  }
})