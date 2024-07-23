import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, SafeAreaView, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../constants/colors';
import AvatarChooser from '../../components/initialStackComp/AvatarChooser';
import NextButton from '../../components/initialStackComp/NextButton';
import { createTables } from '../../sql/dbServices';
import { addDefaultCategories } from '../../sql/dbCategories';
import { addDefaultRecipients } from '../../sql/dbRecipients';

export default function WelcomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('man');
  const [enableNext, setEnableNext] = useState(false);

  useEffect(() => {
    async function manageTables(){
      const name = await AsyncStorage.getItem('name');
      if(name){
        return;
      }
      try{
        await createTables();
        await addDefaultCategories();
        await addDefaultRecipients();

      }
      catch(error){
        console.error(error);
      }

    }
    manageTables();
    createTables();

  }, []);

  useEffect(() => {
    setEnableNext(name.length > 0);
  }, [name]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.contentView}>
          <Text style={styles.titleText}>Manage Money Better</Text>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="Enter your name to continue"
            style={styles.textInput}
            placeholderTextColor={appColors.lightBlack}
          />
          <AvatarChooser avatar={avatar} setAvatar={setAvatar} />
          <NextButton onPressFunc={async () => {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('avatar', avatar);
            navigation.navigate('BottomTabsHome');
          }} enable={enableNext} />
        </View>
        <View style={styles.bottomView} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: appColors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    alignItems: 'center',
    flex: 60,
    justifyContent: 'center',
  },
  titleText: {
    color: appColors.white,
    fontFamily: 'PTSansNarrow-Regular',
    fontSize: 40,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: appColors.white + '50',
    width: 250,
    borderRadius: 10,
    color: appColors.black,
    fontSize: 16,
    margin: 20,
    fontFamily: 'Roboto-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bottomView: {
    flex: 40,
  },
});