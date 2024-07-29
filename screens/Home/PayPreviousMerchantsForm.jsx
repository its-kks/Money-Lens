import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import TopTitle from '../../components/listScreenComponents/TopTitle';
import appColors from '../../constants/colors';
import RecipientAndCategory from '../../components/listScreenComponents/RecipientAndCategory';
import SearchBar from '../../components/listScreenComponents/SearchBar';
import { formattedDate, formattedTime } from '../../utilities/dateTime';

export default function PayPreviousMerchantsForm({navigation}) {

  const fetchedRecipients = useSelector(state => state.recipients.recipients);

  const handlePayRecipient = (recipientID,merchantName,upiUrl) => {

    navigation.navigate('QRCodeForm', {
      id: '-1',
      name: '',
      amount: 0,
      category: "1",
      date: formattedDate(),
      time: formattedTime(),
      recipient: recipientID,
      type: 'Expense',
      addition: true,
      upiUrl,
      merchantName,

    });
  }

  console.log(fetchedRecipients);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TopTitle title="Previous Merchants:" />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar />
      </View>

      <View style={styles.recipientContainer}>

        {
          fetchedRecipients.map((item) => (
            item.type === 'Recipient' && item.upiUrl ? (
              <RecipientAndCategory key={item.id.toString()}
                name={item.name} icon={item.icon}
                backgroundColorIcon={appColors[item.background_color] + '50'}
                onPressFunc={()=>{handlePayRecipient(item.id,item.name,item.upiUrl)}}
              />
            ) : null
          ))

        }
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: appColors.white,
    // 60 bottom bar
    height: Dimensions.get('window').height - 60 - StatusBar.currentHeight,
  },
  titleContainer: {
    flex: 4,
    justifyContent: 'flex-end',
  },
  searchContainer: {
    flex: 8,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recipientContainer: {
    flex: 86,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  }
}) 