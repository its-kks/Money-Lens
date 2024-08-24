import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import appColors from '../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import TextField from './TextField';

export default function RecipientSelector({ initialRecipient, setRecipient , disabled=false, type}) {
  const fetchedRecipients = useSelector(state => state.recipients.recipients);
  const convertedObject = fetchedRecipients.reduce((acc, item) => {
    acc[item.id] = { ...item };
    return acc;
  }, {});
  return (
    <>
      <TextField
        placeholder={'Recipient'}
        text={convertedObject[initialRecipient].name}
        setText={setRecipient}
        errorMessage={'Recipient is required'}
        isRequired={true}
        showErrorNow={false}
        submitPressed={false}
        disabled={true}
      />

      <View style={{
        height: 100,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10, 
        borderRadius: 5, 
        overflow: 'hidden', 
        backgroundColor: appColors.pink + '20',
      }}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        >
          {fetchedRecipients.map((item, index) => (
            item.type === type ?
            <Pressable
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 4,
                backgroundColor: appColors.lightGrey,
                borderRadius: 20,
                paddingLeft: 5,
                paddingRight: 10,
                margin: 5
              }}
              onPress={() => {
                setRecipient(item.id)
              }
              }
              disabled={disabled}
            >
              <Text style={{ padding: 2, borderRadius: 50, color: appColors.white, fontSize: 16 }}>
                {item.icon}
              </Text>
              <Text style={{ fontFamily: 'FiraMono-Regular', fontSize: 15, color: appColors.black }}>
                {item.name}
              </Text>
            </Pressable>
            : null
          ))}
        </ScrollView>
      </View>
    </>

  )
}

const styles = StyleSheet.create({})