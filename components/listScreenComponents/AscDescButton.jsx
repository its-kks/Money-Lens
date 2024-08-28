import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import appColors from '../../constants/colors';

export default function AscDescButton({sort,setSort}) {
    return (
        <TouchableOpacity onPress={() => {
            setSort(sort === 'asc' ? 'desc' : 'asc');
        }}>
            <View style={{borderColor:appColors.blue, borderRadius:50, padding:5, backgroundColor:appColors.blue+'20'}}>
                <MaterialCommunityIcons name={sort === 'asc' ? 'sort-ascending' : 'sort-descending'} size={20} color={appColors.blue} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})