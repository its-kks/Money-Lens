import { StyleSheet, Text, View, Dimensions } from 'react-native' // Step 1: Import Dimensions
import React from 'react'
import ButtonPay from './ButtonPay'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import appColors from '../../constants/colors'

export default function PayButtons() {
  return (
    <View style={styles.container}>
      <ButtonPay
        icon={<MaterialIcons name="qr-code-2" size={35} color={appColors.orange} />}
        text={'Scan and Redirect'}
        iconColor={appColors.orange}
      />
      <ButtonPay
        icon={<MaterialCommunityIcons name="shopping" size={35} color={appColors.pink} />}
        text="Pay Previous Recipients"
        iconColor={appColors.pink}
      />
      <ButtonPay
        icon={<MaterialCommunityIcons name="cash-plus" size={35} color={appColors.green} />}
        text="Add  Earnings" // Assuming you want to add a text prop as well
        iconColor={appColors.green}
      />
      <ButtonPay
        icon={<MaterialIcons name='account-balance-wallet' size={35} color={appColors.red} />}
        text="Add Expenditure"
        iconColor={appColors.red}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 25,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center'

    // backgroundColor:'red'
  }
})