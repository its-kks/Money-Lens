import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ExpandingList({listItem,showList,setShowList}) {
  const [currentItem, setCurrentItem] = useState(listItem[0]);
  return (

    <View>
      <TouchableOpacity onPress={()=>{
        setShowList(!showList);
      }}>
        <View style={styles.current}>
          <Text style={styles.currentItem}>
            {currentItem}
          </Text>
          <Text style={styles.currentItem}>
            <MaterialCommunityIcons name="chevron-down" size={18} color={appColors.blue} />
          </Text>
        </View>
      </TouchableOpacity>
      {
        showList ?
          (<View style={styles.listView}>
            <ScrollView>
              {listItem.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    setCurrentItem(item)
                    setShowList(false)
                    }}>
                    <Text style={[styles.listItem, { borderBottomWidth: index === listItem.length - 1 ? 0 : 1 }]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>) : (null)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  current: {
    borderRadius: 5,
    borderColor: appColors.blue,
    width: 110,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: appColors.blue+'20',
    padding: 5,
  },
  listView:{
    position: 'absolute',
    zIndex: 1,
    top: 25,
    borderRadius: 5,
    borderColor: appColors.blue,
    backgroundColor: appColors.white,
    width: 122,
    elevation: 5,
  },
  listItem: {
    fontSize: 15,
    color: appColors.blue,
    fontFamily: 'FiraMono-Regular',
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: appColors.blue+'30',
    padding: 5,
  },
  currentItem:{
    fontSize: 13,
    color: appColors.blue,
    fontFamily: 'FiraMono-Regular',
  }
})