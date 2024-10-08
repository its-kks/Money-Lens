import React, { useState } from 'react';
import { Pressable, StyleSheet, Touchable, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appColors from '../../../constants/colors';
import TextField from './TextField';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DateFrequency({ recPaymentNextPayment, setRecPaymentNextPayment, recPaymentFrequency, setRecPaymentFrequency, disabled = false }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(selectedDate);
      setRecPaymentNextPayment(formattedDate);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextField
          placeholder="Date"
          text={recPaymentNextPayment}
          setText={setRecPaymentNextPayment}
          errorMessage="Date is required"
          isRequired={true}
          showErrorNow={false}
          submitPressed={false}
          disabled={false}
        />
        <Pressable onPress={() => setShowDatePicker(true)}
          disabled={disabled}
        >
          <MaterialCommunityIcons name="calendar-outline" size={30} color={appColors.lightBlack} />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}
      </View>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TextField
          placeholder="Frequency"
          text={recPaymentFrequency.toString()}
          setText={setRecPaymentFrequency}
          errorMessage="Frequency is required"
          isRequired={true}
          showErrorNow={false}
          submitPressed={false}
          disabled={true}
          keyboardType='number-pad'
        />
        <View>
          <TouchableOpacity onPress={() => setRecPaymentFrequency(recPaymentFrequency + 1) }
            disabled={disabled}
          >
            <MaterialCommunityIcons name="arrow-up" size={30} color={appColors.lightBlack} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRecPaymentFrequency(recPaymentFrequency - 1)}
            disabled={disabled || recPaymentFrequency === 1}
          >
            <MaterialCommunityIcons name="arrow-down" size={30} color={recPaymentFrequency>1 ? appColors.lightBlack : appColors.grey} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({})