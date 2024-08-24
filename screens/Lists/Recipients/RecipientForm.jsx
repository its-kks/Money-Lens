import { Dimensions, StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../../../components/listScreenComponents/Forms/TextField';
import appColors from '../../../constants/colors';
import ConfirmationModal from '../../../components/listScreenComponents/Forms/ConfirmationModal';
import ColorSelector from '../../../components/listScreenComponents/Forms/ColorSelector';
import emojiRegex from 'emoji-regex';
import { addRecipientRequest, deleteRecipientRequest, updateRecipientRequest } from '../../../Redux/actions/recipients'
import { fetchTransactionRequest } from '../../../Redux/actions/transactions';
import Buttons from '../../../components/listScreenComponents/Forms/Buttons';

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
      {
        recipientId: id,
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
        <View
          style={{ flex: 1, width: Dimensions.get('window').width }}
        >

          {/* Form Section */}
          <ScrollView style={{ flex: 1 }}>

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
            <View style={{ height: 30 }}>
            </View>

          </ScrollView>

          {/* Button Section */}


          <View
            style={{
              flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly',
              height: 60, flexShrink: 0
            }}
          >

            {
              addition ?
                <>
                  <Buttons onPress={() => navigation.navigate('RecipientList')} color={appColors.red} value={'Cancel'}>
                  </Buttons>
                  <Buttons
                    onPress={() => {
                      setSubmitPressed(true);
                      handleAddRecipient();
                    }}
                    color={appColors.blue}
                    value={'Add'}
                    >
                  </Buttons>
                </>
                : (
                  udpdateState ?
                    <>
                      <Buttons onPress={() => navigation.navigate('RecipientList')} color={appColors.grey} value={'Cancel'} percentWidth={0.3}>
                      </Buttons>
                      <Buttons onPress={
                        () => {
                          setShowModal(true);
                        }}
                        color={appColors.red}
                        value={'Delete'} percentWidth={0.3}
                      >
                      </Buttons>
                      <Buttons onPress={
                        () => {
                          setSubmitPressed(true);
                          handleUpdateRecipient();
                        }

                      }
                        color={appColors.blue}
                        value={'Update'} percentWidth={0.3}
                      >
                      </Buttons>
                    </>
                    :
                    <>
                      <Buttons onPress={() => navigation.navigate('RecipientList')} color={appColors.red} value={'Cancel'}>
                      </Buttons>
                      <Buttons onPress={() => setupdateState(true)} color={appColors.blue} value={'Edit'}>
                      </Buttons>
                    </>
                )
            }



          </View>


        </View>
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