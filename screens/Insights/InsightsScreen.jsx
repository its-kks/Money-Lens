import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const InsightsScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100} // Adjust based on your header height or other components
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Enter your phone number</Text>
          <Text style={styles.subHeaderText}>You can log in or make an account if you're new to Gojek.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>🇮🇳 +91</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: phoneNumber.length === 10 ? 'green' : 'gray' }]}
            disabled={phoneNumber.length !== 10}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Enter your phone number</Text>
          <Text style={styles.subHeaderText}>You can log in or make an account if you're new to Gojek.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>🇮🇳 +91</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: phoneNumber.length === 10 ? 'green' : 'gray' }]}
            disabled={phoneNumber.length !== 10}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Enter your phone number</Text>
          <Text style={styles.subHeaderText}>You can log in or make an account if you're new to Gojek.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>🇮🇳 +91</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: phoneNumber.length === 10 ? 'green' : 'gray' }]}
            disabled={phoneNumber.length !== 10}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Enter your phone number</Text>
          <Text style={styles.subHeaderText}>You can log in or make an account if you're new to Gojek.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>🇮🇳 +91</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: phoneNumber.length === 10 ? 'green' : 'gray' }]}
            disabled={phoneNumber.length !== 10}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  continueButton: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default InsightsScreen;
