import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appColors from '../../constants/colors';

export default function SingleAction({ name, act_id, amount, type, rp_id }) {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
      borderBottomWidth: 1, borderBottomColor: appColors.red + '30', paddingBottom: 5, paddingTop: 5
    }}>
      {
        type === 'Save' ?
          <>
            <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: appColors.grey + '50', padding: 10, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="piggy-bank" size={40} color={appColors.green} />
              </View>
            </View>
            <View style={{ flex: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', fontWeight: '600', color: appColors.black }}>{name}</Text>
              <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', fontWeight: '600', color: appColors.black }}>{amount}</Text>
            </View>
            <View style={{ flex: 40, alignItems: 'flex-start', flexDirection: "row", justifyContent: 'space-between' }}>
              <Pressable>
                <View style={{padding: 10, justifyContent:'center', alignItems:'center', backgroundColor:appColors.orange+'50', borderRadius: 10}}>
                  <Text style={{fontWeight: 'bold', color: appColors.orange, fontSize: 16}}>Save</Text>
                </View>
              </Pressable>
              <View>
                <Text>Dismiss</Text>
              </View>
              <Pressable>

              </Pressable>
            </View>

          </>
          :
          <>
            <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: appColors.grey + '50', padding: 10, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="cash-check" size={40} color='red' />
              </View>
            </View>
            <View style={{ flex: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', fontWeight: '600', color: appColors.black }}>{name}</Text>
              <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', fontWeight: '600', color: appColors.black }}>{amount}</Text>
            </View>
            <View style={{ flex: 40, alignItems: 'flex-start', flexDirection: "row", justifyContent: 'space-between' }}>
              <Pressable>
                <View>
                  <Text>Save</Text>
                </View>
              </Pressable>
              <View>
                <Text>Dismiss</Text>
              </View>
              <Pressable>

              </Pressable>
            </View>
          </>
      }
    </View>
  )
}

const styles = StyleSheet.create({})

// [{"act_id": 1, "amount": 174, "name": "Mobile Recharge", "rp_id": 1, "type": "Save"}, 
// {"act_id": 2, "amount": 1772, "name": "Income Tax", "rp_id": 2, "type": "Save"}] 