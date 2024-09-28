import React from 'react';
import { Button, Linking, ScrollView, View, Text, Appearance } from 'react-native';
import appColors from '../../constants/colors';
import TopTitle from '../../components/Settings/TopTitle';
import SingleSetting from '../../components/Settings/SingleSetting';
import DatabaseSettings from '../../components/Settings/DatabaseSettings';
import UserSettings from '../../components/Settings/UserSettings';
import AppAppearance from '../../components/Settings/AppAppearance';

const handlePress = async (url) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error('An error occurred', error);
    Alert.alert('Error', `Unable to open the URL: ${url}`);
  }
};
const SettingsScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: appColors.white, flex: 1}}>
      <View style={{margin: 10, height:35}}>
        <TopTitle title={"Settings:"} />
      </View>
      <View style={{flex: 1, margin: 20}}>
        <ScrollView>
          <DatabaseSettings navigation={navigation} />
          <UserSettings navigation={navigation}/>
          <AppAppearance navigation={navigation}/>
          
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingsScreen;

