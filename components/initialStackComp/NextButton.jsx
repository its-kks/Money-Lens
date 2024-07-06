import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import appColors from '../../constants/colors';

const NextButton = ({ onPressFunc, enable }) => {
  return (

    <TouchableOpacity style={styles.button} onPress={onPressFunc} disabled={!enable}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Next</Text>
        <MaterialCommunityIcons name="arrow-right" size={20} color={appColors.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.purple,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: appColors.white,
    fontSize: 16,
    marginRight: 5,
  },
});

export default NextButton;