import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import appColors from '../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import TextField from './TextField';

export default function CategorySelector({ initialCategory, setCategory, type, disabled = false}) {
  const fetchedCategories = useSelector(state => state.categories.categories);
  const convertedObject = fetchedCategories.reduce((acc, item) => {
    acc[item.id] = { ...item };
    return acc;
  }, {});

  return (
    <>
      <TextField
        placeholder={'Category'}
        text={convertedObject[initialCategory].name}
        setText={setCategory}
        errorMessage={'Category is required'}
        isRequired={true}
        showErrorNow={false}
        submitPressed={false}
        disabled={true}
      />

      <View style={{
        height: 75,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: appColors.blue + '20',
      }}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        >
          {fetchedCategories.map((item, index) => (
            item.type === type ?
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
                  margin: 5
                }}
                onPress={() => {
                  setCategory(item.id)
                }
                }
                disabled={disabled}
                
              >
                <Text style={{ padding: 2, borderRadius: 50, color: appColors.white, fontSize: 15 }}>
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