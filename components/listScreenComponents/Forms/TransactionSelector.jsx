import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import appColors from '../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import TextField from './TextField';

export default function TransactionSelector({ initialType,setType , setCategory, heading = 'Transaction Type'}) {
  const fetchedExpenses = [{ "id": '1', "name": "Expense", "icon": "💸" }, { "id": '2', "name": "Income", "icon": "💰" }];
  const convertedObject = fetchedExpenses.reduce((acc, item) => {
    acc[item.id] = { ...item };
    return acc;
  }, {});
  return (
    <>
      <TextField
        placeholder={heading}
        text={convertedObject[initialType].name}
        setText={setType}
        errorMessage={'Type is required'}
        isRequired={true}
        showErrorNow={false}
        submitPressed={false}
        disabled={true}
      />

      <View style={{ height: 40, margin: 5 }}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        >
          {fetchedExpenses.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 2,
                  backgroundColor: appColors.lightGrey,
                  borderRadius: 20,
                  paddingLeft: 5,
                  paddingRight: 10,
                  margin: 5,
                  backgroundColor: (item.id === '1' ? appColors.red+'50' : appColors.green+'50')
                }}
                onPress={() => {
                  setType(item.id);
                  setCategory('1');
                }
                }
              >
                <Text style={{ padding: 2, borderRadius: 50, color: appColors.white, fontSize: 15 }}>
                  {item.icon}
            
                </Text>
                <Text style={{ fontFamily: 'FiraMono-Bold', fontSize: 13, color: (item.id === '1' ? appColors.red : appColors.green) ,
                  
                }}>
                  {item.name}
                </Text>
              </Pressable>
             
          ))}
        </ScrollView>
      </View>
    </>

  )
}

const styles = StyleSheet.create({})