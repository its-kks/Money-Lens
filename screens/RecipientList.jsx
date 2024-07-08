import { StyleSheet, BackHandler, View, Dimensions, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import appColors from '../constants/colors'
import TopTitle from '../components/listScreenComponents/TopTitle'
import SearchBar from '../components/listScreenComponents/SearchBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RecipientAndCategory from '../components/listScreenComponents/RecipientAndCategory'
import AddCategoryRecipient from '../components/listScreenComponents/AddCategoryRecipient'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipientsRequest } from '../Redux/actions/recipients'

export default function RecipientList() {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const fetchedRecipients = useSelector(state => state.recipients.recipients);

  useEffect((() => {

    dispatch(fetchRecipientsRequest());
  }), []);


  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <TopTitle title="Recipients:" />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar />
        </View>

        <View style={styles.recipentsContainer}>
          <ScrollView >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              <AddCategoryRecipient name='Add Recipient' backgroundColorIcon={appColors.green + '50'} showModal={showModal} setShowModal={setShowModal}/>
              {fetchedRecipients.map((item) => {
                return(
                <RecipientAndCategory key={item.id.toString()} name={item.name} icon={item.icon} backgroundColorIcon={appColors[item.background_color] + '50'} />)
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
  recipentsContainer: {
    flex: 86,
    flexDirection: 'row',
  }
})