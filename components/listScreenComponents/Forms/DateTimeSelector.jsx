import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appColors from '../../../constants/colors';
import TextField from './TextField';

export default function DateTimeSelector({ initialDate, initialTime, setDate, setTime, disabled = false }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(selectedDate);
      setDate(formattedDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime.toLocaleTimeString());
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextField
          placeholder="Date"
          text={initialDate}
          setText={setDate}
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
          />
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextField
          placeholder="Time"
          text={initialTime}
          setText={setTime}
          errorMessage="Time is required"
          isRequired={true}
          showErrorNow={false}
          submitPressed={false}
          disabled={false}
        />
        <Pressable onPress={() => setShowTimePicker(true)}
          disabled={disabled}
        >
          <MaterialCommunityIcons name="clock-outline" size={30} color={appColors.lightBlack} />
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
