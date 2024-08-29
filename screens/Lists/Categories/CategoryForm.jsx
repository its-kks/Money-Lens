import { Dimensions, StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../../../components/listScreenComponents/Forms/TextField';
import appColors from '../../../constants/colors';
import ConfirmationModal from '../../../components/listScreenComponents/Forms/ConfirmationModal';
import ColorSelector from '../../../components/listScreenComponents/Forms/ColorSelector';
import emojiRegex from 'emoji-regex';
import { addCategoryRequest, deleteCategoryRequest, updateCategoryRequest } from '../../../Redux/actions/categories'
import { fetchTransactionRequest } from '../../../Redux/actions/transactions';
import Buttons from '../../../components/listScreenComponents/Forms/Buttons';

export default function CategoryForm({ route, navigation }) {
  const { id, name, icon, backgroundColor, type, addition } = route.params;
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


  const [categoryName, setCategoryName] = React.useState(name);
  const [categoryIcon, setCategoryIcon] = React.useState(icon);
  const [categoryBackgroundColor, setCategoryBackgroundColor] = React.useState(backgroundColor);
  const [categoryType, setCategoryType] = React.useState(type);

  const [udpdateState, setupdateState] = useState(false);

  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (categoryName.length === 0 || categoryName.length > 30 || isNotSingleEmoji(categoryIcon)) {
      return;
    }
    dispatch(addCategoryRequest({
      categoryName,
      categoryType,
      categoryIcon,
      categoryBackgroundColor
    }));
    dispatch(fetchTransactionRequest({type:'Any', month: 'This Month', year: 'This Year', sort: 'desc'}));
    navigation.navigate('CategoryList');
  }

  const handleDeleteCategory = () => {
    setShowModal(false);
    dispatch(deleteCategoryRequest(id));
    dispatch(fetchTransactionRequest({type:'Any', month: 'This Month', year: 'This Year', sort: 'desc'}));
    navigation.navigate('CategoryList');

  }

  const handleUpdateCategory = () => {
    if (categoryName.length === 0 || categoryName.length > 30 || isNotSingleEmoji(categoryIcon)) {
      return;
    }
    dispatch(updateCategoryRequest(
      {
        categoryId: id,
        categoryName,
        categoryType,
        categoryIcon,
        categoryBackgroundColor
      }

    ))
    dispatch(fetchTransactionRequest({type:'Any', month: 'This Month', year: 'This Year', sort: 'desc'}));
    navigation.navigate('CategoryList');

  }



  return (
    // <ScrollView>
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: appColors.white }}>
      <ConfirmationModal
        text={id === 1 || id === 2 ? "This category can't be deleted"
          : `If you delete this category all its transaction category will be set to miscellaneous. Do you want to continue?`
        }
        onCancel={() => { setShowModal(false) }}
        visible={showModal}
        setVisible={setShowModal}
        onConfirm={handleDeleteCategory}
        enableOk={id === 1 || id === 2}
      />
      <View>
        <View
          style={{ flex: 1, width: Dimensions.get('window').width }}
        >

          {/* Form Section */}
          <ScrollView style={{ flex: 1 }}>

            <TextField
              placeholder={'Category Name'}
              text={categoryName}
              setText={setCategoryName}
              errorMessage={'Max 30 characters'}
              isRequired={true}
              showErrorNow={categoryName.length === 0 || categoryName.length > 30 ? true : false}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
            />
            <TextField
              placeholder={'Icon'}
              text={categoryIcon}
              setText={setCategoryIcon}
              errorMessage={'The icon should consist of a single emoji'}
              isRequired={true}
              showErrorNow={isNotSingleEmoji(categoryIcon)}
              submitPressed={submitPressed}
              disabled={!addition && !udpdateState}
            />

            <ColorSelector
              initialColor={categoryBackgroundColor}
              setColor={setCategoryBackgroundColor}
              disabled={!addition && !udpdateState}
            />

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
                  <Buttons onPress={() => navigation.navigate('CategoryList')} color={appColors.red} value={'Cancel'}>
                  </Buttons>
                  <Buttons
                    onPress={() => {
                      setSubmitPressed(true);
                      handleAddCategory();
                    }}
                    color={appColors.blue}
                    value={'Add'}
                  >
                  </Buttons>
                </>
                : (
                  udpdateState ?
                    <>
                      <Buttons onPress={() => navigation.navigate('CategoryList')} color={appColors.grey} value={'Cancel'} percentWidth={0.3}>
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
                          handleUpdateCategory();
                        }

                      }
                        color={appColors.blue}
                        value={'Update'} percentWidth={0.3}
                      >
                      </Buttons>
                    </>
                    :
                    <>
                      <Buttons onPress={() => navigation.navigate('CategoryList')} color={appColors.red} value={'Cancel'}>
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