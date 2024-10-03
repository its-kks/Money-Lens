import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appColors from '../../constants/colors';
import ConfirmationModal from '../listScreenComponents/Forms/ConfirmationModal';
import { useDispatch } from 'react-redux';
import { deleteActionRequest } from '../../Redux/actions/actions';
import { limitText } from '../../utilities/text';



export default function SingleAction({ name, act_id, amount, type, rp_id, handleAction }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const returnIcon = (type) => {
    switch (type) {
      case 'Save':
        return 'piggy-bank';
      case 'Pay':
        return 'cash-check';
      default:
        return 'wallet-plus';
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

  const handleDismissAction = () => {
    dispatch(deleteActionRequest(act_id));
  } 

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
      borderBottomWidth: 1, borderBottomColor: appColors.red + '30', paddingBottom: 5, paddingTop: 5
    }}>
      <ConfirmationModal
        text={"Once dismissed action can't be added again. Do you want to continue?"}
        onCancel={() => { setShowModal(false) }}
        visible={showModal}
        setVisible={setShowModal}
        onConfirm={handleDismissAction}
      />


      <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: appColors.grey + '50', padding: 10, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>

          <MaterialCommunityIcons name={returnIcon(type)} size={40} color={returnColor(type)} />

        </View>
      </View>
      <View style={{ flex: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: appColors.black }}>{ limitText(name,18)}</Text>
        <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: type === 'Save' || type === 'Pay' ? appColors.red : appColors.green }}>{'$' + amount}</Text>
      </View>
      <View style={{ flex: 40, alignItems: 'flex-start', flexDirection: "row", justifyContent: 'space-around' }}>
        {/* not dismiss */}
        <Pressable onPress={()=>{handleAction(type,rp_id, amount, act_id)}}>
          <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: appColors.orange + '50', borderRadius: 10 }}>
            <Text style={{ color: appColors.orange, fontSize: 16, fontFamily: 'Roboto-Bold' }}>{type}</Text>
          </View>
        </Pressable>
        {/* dismiss */}
        <Pressable onPress={()=>{setShowModal(true)}}>
          <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: appColors.lightGrey, borderRadius: 10 }}>
            <Text style={{ color: appColors.grey, fontSize: 16, fontFamily: 'Roboto-Bold' }}>Dismiss</Text>
          </View>
        </Pressable>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({})

// [{"act_id": 1, "amount": 174, "name": "Mobile Recharge", "rp_id": 1, "type": "Save"}, 
// {"act_id": 2, "amount": 1772, "name": "Income Tax", "rp_id": 2, "type": "Save"}] 