import { Image, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../constants/colors'

export default function AvatarChooser({avatar, setAvatar}) {

  const imageSource = avatar === 'man' ? require('../../assets/images/man.png') : require('../../assets/images/woman.png');

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.mainImage} />
      <View style={styles.avatarContainer}>
        <Pressable onPress={() => setAvatar('man')}>
          <Image source={require('../../assets/images/man.png')} style={[styles.avatar, {borderWidth: avatar === 'man' ? 2 : 0}]} />
        </Pressable>
        <Pressable onPress={() => setAvatar('woman')}>
          <Image source={require('../../assets/images/woman.png')} style={[styles.avatar, {borderWidth: avatar === 'woman' ? 2 : 0}]} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", 
    alignItems: 'center'
  },
  mainImage: {
    height: 100, 
    width: 100, 
    borderRadius: 50, 
    borderWidth: 4, 
    borderColor: appColors.white
  },
  avatarContainer: {
    flexDirection: 'row', 
    marginTop: 10, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: 120, 
    height: 60,
  },
  avatar: {
    height: 50, 
    width: 50, 
    borderRadius: 25, 
    borderColor: appColors.lightGrey
  }
})