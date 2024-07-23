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
    dispatch(fetchTransactionRequest());
    navigation.navigate('CategoryList');
  }

  const handleDeleteCategory = () => {
    setShowModal(false);
    dispatch(deleteCategoryRequest(id));
    dispatch(fetchTransactionRequest());
    navigation.navigate('CategoryList');
    
  }

  const handleUpdateCategory = () => {
    if (categoryName.length === 0 || categoryName.length > 30 || isNotSingleEmoji(categoryIcon)) {
      return;
    }
    dispatch(updateCategoryRequest(
      {
        categoryId:id,
        categoryName,
        categoryType,
        categoryIcon,
        categoryBackgroundColor
      }

    ))
    dispatch(fetchTransactionRequest());
    navigation.navigate('CategoryList');

  }



  return (
    // <ScrollView>
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: appColors.white }}>
      <ConfirmationModal
        text={id === 1 || id===2 ?"This category can't be deleted"
          : `If you delete this category all its transaction category will be set to miscellaneous. Do you want to continue?`
        }
        onCancel={() => { setShowModal(false) }}
        visible={showModal}
        setVisible={setShowModal}
        onConfirm={handleDeleteCategory}
        enableOk={id === 1 || id===2}
      />
      <View>
        <SafeAreaView
          style={{ height: 650, width: Dimensions.get('window').width }}
        >

          {/* Form Section */}
          <View style={{ height: 600 }}>

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

          </View>

          {/* Button Section */}


          <View
            style={{ flexDirection: 'row', alignItems: 'flex-end', height: 50, justifyContent: 'space-evenly' }}
          >

            {
              addition ?
                <>
                  <Button mode='outlined' onPress={() => navigation.navigate('CategoryList')} style={{ width: 200 }}>
                    Cancel
                  </Button>
                  <Button mode='contained'
                    onPress={() => {
                      setSubmitPressed(true);
                      handleAddCategory();
                    }}
                    style={{ width: 200 }}>
                    Add
                  </Button>
                </>
                : (
                  udpdateState ?
                    <>
                      <Button mode='outlined' onPress={() => navigation.navigate('CategoryList')} style={{ width: 120 }}>
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
                          handleUpdateCategory();
                        }

                      } style={{ width: 120 }}>
                        Update
                      </Button>
                    </>
                    :
                    <>
                      <Button mode='outlined' onPress={() => navigation.navigate('CategoryList')} style={{ width: 200 }}>
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