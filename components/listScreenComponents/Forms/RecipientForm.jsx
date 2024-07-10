import { Dimensions, StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from './TextField';
import appColors from '../../../constants/colors';
import ConfirmationModal from './ConfirmationModal';
import ColorSelector from './ColorSelector';
import emojiRegex from 'emoji-regex';
import { addRecipientRequest, deleteRecipientRequest, updateRecipientRequest } from '../../../Redux/actions/recipients'
import { fetchTransactionRequest } from '../../../Redux/actions/transactions';

export default function RecipientForm({ route, navigation }) {
  const { id, name, icon, backgroundColor, type, url, addition } = route.params;
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);


  function isNotSingleEmoji(input) {
    const regex = emojiRegex();

    const trimmedInput = input.trim();

    const matches = trimmedInput.match(regex);

    return !(matches !== null &&
      matches.length === 1 &&
      matches[0] === trimmedInput);
  }


  const [recipientName, setRecipientName] = React.useState(name);
  const [recipientIcon, setRecipientIcon] = React.useState(icon);
  const [recipientBackgroundColor, setRecipientBackgroundColor] = React.useState(backgroundColor);
  const [recipientType, setRecipientType] = React.useState(type);
  const [recipientUrl, setRecipientUrl] = React.useState(url);

  const [udpdateState, setupdateState] = useState(false);

  const dispatch = useDispatch();

  const handleAddRecipient = () => {
    if (recipientName.length === 0 || recipientName.length > 30 || isNotSingleEmoji(recipientIcon)) {
      return;
    }
    dispatch(addRecipientRequest({
      recipientName,
      recipientType,
      recipientUrl,
      recipientIcon,
      recipientBackgroundColor
    }))
    dispatch(fetchTransactionRequest);
    navigation.navigate('RecipientList');
  }

  const handleDeleteRecipient = () => {
    setShowModal(false);
    dispatch(deleteRecipientRequest(id));
    dispatch(fetchTransactionRequest);
    navigation.navigate('RecipientList');

  }

  const handleUpdateRecipient = () => {
    if (recipientName.length === 0 || recipientName.length > 30 || isNotSingleEmoji(recipientIcon)) {
      return;
    }
    dispatch(updateRecipientRequest(
      { recipientId: id,
        recipientName,
        recipientType,
        recipientUrl,
        recipientIcon,
        recipientBackgroundColor
      }

    ));
    dispatch(fetchTransactionRequest);
    navigation.navigate('RecipientList');

  }



  return (
    // <ScrollView>
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: appColors.white }}>
      <ConfirmationModal
        text={id === 1 || id === 2 ? `This ${type.toLowerCase()} can't be deleted`
          : `If you delete this ${type.toLowerCase()} all its transaction's ${type.toLowerCase()} will be set to unknown. Do you want to continue?`
        }
        onCancel={() => { setShowModal(false) }}
        visible={showModal}
        setVisible={setShowModal}
        onConfirm={handleDeleteRecipient}
        enableOk={id === 1 || id === 2}
      />
      <View>
        <SafeAreaView
          style={{ height: 650, width: Dimensions.get('window').width }}
        >

          {/* Form Section */}
          <View style={{ height: 600 }}>

            <TextField
              placeholder={'Recipient Name'}
              text={recipientName}
              setText={setRecipientName}
              errorMessage={'Max 30 characters'}
              isRequired={true}
              showErrorNow={recipientName.length === 0 || recipientName.length > 30 ? true : false}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
            />
            <TextField
              placeholder={'Icon'}
              text={recipientIcon}
              setText={setRecipientIcon}
              errorMessage={'The icon should consist of a single emoji'}
              isRequired={true}
              showErrorNow={isNotSingleEmoji(recipientIcon)}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
            />

            <ColorSelector
              initialColor={recipientBackgroundColor}
              setColor={setRecipientBackgroundColor}
              disabled={!addition && !udpdateState}
            />

          </View>

          {/* Button Section */}


          <View
            style={{ flexDirection: 'row', alignItems: 'flex-end', height: 50, justifyContent: 'space-evenly' }}
          >

            {
              addition ?
                <>
                  <Button mode='outlined' onPress={() => navigation.navigate('RecipientList')} style={{ width: 200 }}>
                    Cancel
                  </Button>
                  <Button mode='contained'
                    onPress={() => {
                      setSubmitPressed(true);
                      handleAddRecipient();
                    }}
                    style={{ width: 200 }}>
                    Add
                  </Button>
                </>
                : (
                  udpdateState ?
                    <>
                      <Button mode='outlined' onPress={() => navigation.navigate('RecipientList')} style={{ width: 120 }}>
                        Cancel
                      </Button>
                      <Button mode='contained' onPress={
                        () => {
                          setShowModal(true);
                        }}
                        style={{ width: 120 }}
                      >
                        Delete
                      </Button>
                      <Button mode='contained' onPress={
                        () => {
                          setSubmitPressed(true);
                          handleUpdateRecipient();
                        }

                      } style={{ width: 120 }}>
                        Update
                      </Button>
                    </>
                    :
                    <>
                      <Button mode='outlined' onPress={() => navigation.navigate('RecipientList')} style={{ width: 200 }}>
                        Cancel
                      </Button>
                      <Button mode='contained' onPress={() => setupdateState(true)} style={{ width: 200 }}>
                        Edit
                      </Button>
                    </>
                )
            }



          </View>


        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  emojiModalBackground: {
    backgroundColor: appColors.orange + '30',
  },
  emojiModalContainer: {
    borderRadius: 16,
    backgroundColor: appColors.white,
  },
  emojiModalSearchBar: {
    backgroundColor: appColors.lightestGray,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 12,
    height: 40,
  },
});