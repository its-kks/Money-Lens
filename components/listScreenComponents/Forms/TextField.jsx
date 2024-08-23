import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import React, {useState} from 'react';
import appColors from '../../../constants/colors';

export default function TextField({ text, setText, placeholder, errorMessage, showErrorNow, isRequired, submitPressed, disabled=false, keyboardType = 'default' }) {
  const [jumpAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (text.length > 0) {
      Animated.spring(jumpAnim, {
        toValue: -20,
        friction: 4,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(jumpAnim, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [text]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={text}
        onChangeText={(curr) => {
          if(!disabled){
            setText(curr);
          }
        }}
        editable={!disabled}
        keyboardType={keyboardType}
        placeholderTextColor={appColors.grey}
      />
      <Animated.Text style={[styles.placeholder, { transform: [{ translateY: jumpAnim }] }]}>
        {text.length > 0 ? placeholder : ''}
      </Animated.Text>
      {isRequired && submitPressed && text.length === 0 ? <Text style={styles.errorText}>Required</Text> : null}
      {showErrorNow && submitPressed ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginTop: 8,
    padding: 10,
    minWidth: 130,
  },
  placeholder: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 14,
    color: appColors.purple,
    fontFamily: 'Roboto-Regular',
    backgroundColor: appColors.white,
    paddingLeft: 5,
    paddingRight: 5
  },
  textInput: {
    width: '100%',
    padding: 18,
    borderWidth: 2,
    borderColor: appColors.purple,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: appColors.black,
    borderRadius: 10
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontStyle:'italic',
    width:'100%',
  },
});
