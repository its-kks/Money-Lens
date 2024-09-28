import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function SingleSetting({ heading, settingObject }) {
  const [showItems, setShowItems] = React.useState(false);
  return (
    <View style={{ backgroundColor: appColors.white, borderRadius: 5, padding: 10, marginBottom: 5 }}
    >
      <View style={{ height: 50, justifyContent: 'center', borderBottomWidth: 1, borderColor: appColors.lightGrey }}>
        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20,color: appColors.purple }}>
          {heading}
        </Text>
        <MaterialCommunityIcons name={showItems ? "chevron-up" : "chevron-down"} size={25} color={appColors.blue} style={{ position: 'absolute', right: 10 }}
          onPress={() => setShowItems(!showItems)}
        />
      </View>
      {
        showItems &&
        Object.keys(settingObject).map((key, index) => {
          return (
            <TouchableOpacity key={index} style={{padding: 10, backgroundColor: appColors.lightGrey + '50', marginTop: 5, borderRadius: 5}}
              onPress={settingObject[key]}
            >
              <Text style={{ fontFamily: 'FiraMono-Regular', fontSize: 16, color: appColors.lightBlack }}>
                {key}
              </Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({})