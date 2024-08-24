import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import appColors from '../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import TextField from './TextField';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ColorSelector({ initialColor, setColor, disabled = false }) {
  const fetechedColors = ["red", "blue", "green", "orange", "purple", "pink", "grey"];

  return (
    <>
      <TextField
        placeholder={'Background Color'}
        text={initialColor}
        setText={setColor}
        errorMessage={'Background Color is required'}
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
        backgroundColor: appColors.grey + '50',
      }}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        >
          {fetechedColors.map((item, index) => (
            <Pressable
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: appColors.white,
                borderRadius: 20,
                margin: 5
              }}
              onPress={() => {
                setColor(item)
              }
              }
              disabled={disabled}

            >
              <View

                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: appColors[item] + '50',
                  borderRadius: 20,
                  paddingLeft: 10,
                  paddingRight: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  margin:1

                }}
              >
                <Text style={{ padding: 2, borderRadius: 50, color: appColors.white, fontSize: 15 }}>
                  <MaterialCommunityIcons name="circle" size={15} color={appColors[item]} />
                </Text>
                <Text style={{ fontFamily: 'FiraMono-Regular', fontSize: 16, color: appColors.black }}>
                  {item}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>

  )
}

const styles = StyleSheet.create({})