import { StyleSheet, BackHandler, View, Dimensions, StatusBar, ScrollView, SafeAreaView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import appColors from '../../../constants/colors'
import TopTitle from '../../../components/listScreenComponents/TopTitle'
import SearchBar from '../../../components/listScreenComponents/SearchBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RecipientAndCategory from '../../../components/listScreenComponents/RecipientAndCategory'
import AddCategoryRecipient from '../../../components/listScreenComponents/AddCategoryRecipient'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipientsRequest } from '../../../Redux/actions/recipients'

export default function RecipientList({navigation}) {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const fetchedRecipients = useSelector(state => state.recipients.recipients);

  return (
    <View>
      
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TopTitle title="Recipients / Payers:" />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar />
      </View>

      <View style={{ flex: 56, borderBottomWidth: 1, borderColor: appColors.lightGrey + '60' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subHeadingExp}>Recipient</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          <AddCategoryRecipient
            navigateAdd={() => navigation.navigate('RecipientForm', {
              id: 0,
              name: '',
              icon: '😊',
              backgroundColor: 'red',
              type: 'Recipient',
              url:'',
              addition: true
            })}
          />
          {fetchedRecipients.map((item) => (
            item.type === 'Recipient' ? (
              <RecipientAndCategory key={item.id.toString()}
                name={item.name} icon={item.icon}
                backgroundColorIcon={appColors[item.background_color] + '50'}
                onPressFunc={() => navigation.navigate('RecipientForm', {
                  id: item.id,
                  name: item.name,
                  icon: item.icon,
                  backgroundColor: item.background_color,
                  type: item.type,
                  url: item.upiUrl,
                  addition: false
                })}
              />
            ) : null
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 30, borderBottomWidth: 1, borderColor: appColors.lightGrey + '60' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subHeadingEarn}>Payer</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          <AddCategoryRecipient
            navigateAdd={() => navigation.navigate('RecipientForm', {
              id: 0,
              name: '',
              icon: '😊',
              backgroundColor: 'red',
              type: 'Payer',
              url: '',
              addition: true
            })}
          />
          {fetchedRecipients.map((item) => (
            item.type === 'Payer' ? (
              <RecipientAndCategory key={item.id.toString()}
                name={item.name} icon={item.icon}
                backgroundColorIcon={appColors[item.background_color] + '50'}
                onPressFunc={() => navigation.navigate('RecipientForm', {
                  id: item.id,
                  name: item.name,
                  icon: item.icon,
                  backgroundColor: item.background_color,
                  type: item.type,
                  url: item.upiUrl,
                  addition: false
                })}
              />
            ) : null
          ))}
        </ScrollView>
      </View>


    </SafeAreaView>
  </View>
)
}

const styles = StyleSheet.create({
container: {
  width: Dimensions.get('window').width,
  backgroundColor: appColors.white,

  // 120 = 60 + 60  (60 top bar and 60 bottom bar)
  height: Dimensions.get('window').height - 120 - StatusBar.currentHeight,
},
titleContainer: {
  flex: 5,
  justifyContent: 'flex-end'
},
searchContainer: {
  flex: 9,
  margin: 10,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
},
subHeadingExp: {
  fontSize: 15,
  margin: 10,
  fontFamily: 'Roboto-Bold',
  padding: 5,
  backgroundColor: appColors.red + '30',
  borderRadius: 10,
  color: appColors.red
},
subHeadingEarn: {
  fontSize: 15,
  margin: 10,
  fontFamily: 'Roboto-Bold',
  padding: 5,
  backgroundColor: appColors.green + '30',
  borderRadius: 10,
  color: appColors.green
}
})