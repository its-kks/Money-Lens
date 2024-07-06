import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appColors from '../../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RecipientAndCategory({ name, icon, backgroundColorIcon}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={[styles.icon,{backgroundColor:backgroundColorIcon}]}>
          <Text style={{ fontSize: 30, color: appColors.lightBlack, }}>{icon}</Text>
        </View>
      </View>

      <View style={styles.dataContainer}>
        <TouchableOpacity>
          <View style={{justifyContent:'space-evenly', alignItems:'center'}}>
            <Text style={{ fontSize: 14, fontFamily: 'FiraMono-Regular', color:appColors.black }}>{ name.length >13 ? name.substring(0,10)+'...': name}</Text>
            <Text>
              <MaterialCommunityIcons name="dots-horizontal" size={30} color={appColors.lightGrey} />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    width: 120
  },
  iconContainer: {
    flex: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  dataContainer: {
    flex: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
  }
})