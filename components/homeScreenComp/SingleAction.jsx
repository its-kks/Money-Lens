import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appColors from '../../constants/colors';

const returnIcon = (type) => {
  switch (type) {
    case 'Save':
      return 'piggy-bank';
    case 'Pay':
      return 'cash-check';
    default:
      return 'cash';
  }
}

const returnColor = (type) => {
  switch (type) {
    case 'Save':
      return appColors.pink;
    case 'Pay':
      return appColors.green;
    default:
      return appColors.purple;
  }
}
export default function SingleAction({ name, act_id, amount, type, rp_id }) {


  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
      borderBottomWidth: 1, borderBottomColor: appColors.red + '30', paddingBottom: 5, paddingTop: 5
    }}>

      <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: appColors.grey + '50', padding: 10, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>

          <MaterialCommunityIcons name={returnIcon(type)} size={40} color={returnColor(type)} />

        </View>
      </View>
      <View style={{ flex: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: appColors.black }}>{name}</Text>
        <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: type === 'Save' || 'Pay' ? appColors.red : appColors.green }}>{'$' + amount}</Text>
      </View>
      <View style={{ flex: 40, alignItems: 'flex-start', flexDirection: "row", justifyContent: 'space-around' }}>
        <Pressable>
          <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: appColors.orange + '50', borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold', color: appColors.orange, fontSize: 16 }}>{type}</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: appColors.lightGrey, borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold', color: appColors.grey, fontSize: 16 }}>Dismiss</Text>
          </View>
        </Pressable>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({})

// [{"act_id": 1, "amount": 174, "name": "Mobile Recharge", "rp_id": 1, "type": "Save"}, 
// {"act_id": 2, "amount": 1772, "name": "Income Tax", "rp_id": 2, "type": "Save"}] 