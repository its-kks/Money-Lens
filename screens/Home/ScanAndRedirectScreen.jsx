import { Dimensions, Linking, Pressable, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import appColors from '../../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { Svg, Defs, Rect, Mask } from 'react-native-svg';
import { fetchRecipientsRequest } from '../../Redux/actions/recipients';
import { useSelector } from 'react-redux';

export default function ScanAndRedirectScreen({ navigation }) {
  const [flashOn, setFlashOn] = React.useState(false);
  const [displayMessage, setDisplayMessage] = useState('Place Merchant QR code withing the box');
  const prevQRCode = useRef('');

  const recipients = useSelector(state => state.recipients.recipients);
  let upiUrlKeyId = {};

  for (const recipient of recipients) {
    if (recipient.upiUrl) {
      upiUrlKeyId[recipient.upiUrl] = recipient.id;
    }
  }
  console.log(recipients);
  console.log(upiUrlKeyId);
  // shaking animation
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShaking = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };


  // camera
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      const upiId = codes[0].value;
      if (upiId.search('mc=') !== -1) {
        const upiIdArray = upiId.split('://pay?')[1].split('&');
        let redirectUrl = 'upi://pay?';
        let merchantName = '';
        for (const item of upiIdArray) {
          if (item.search('am') == -1) {
            redirectUrl += item + '&';
          }
          if (item.search('pn=') !== -1) {
            merchantName = item.split('=')[1];
          }
        }
        console.log('Correct UPI URL');
        handleAddNavigation(redirectUrl,merchantName);
      }
      else if (prevQRCode.current !== upiId) {
        prevQRCode.current = upiId;

        startShaking();
        setDisplayMessage('Only Merchant QR code is supported');
        setTimeout(() => {
          setDisplayMessage('Place Merchant QR code withing the box');
        }, 5000);
      }


    }
  })

  // redirection to transaction form

  const handleAddNavigation = (upiUrl,merchantName) => {
    const date = new Date();
    const formattedDate = [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'), // Months are 0-based
      date.getFullYear(),
    ].join('/');

    const formattedTime = [
      date.getHours().toString().padStart(2, '0'),
      date.getMinutes().toString().padStart(2, '0'),
      date.getSeconds().toString().padStart(2, '0'),
    ].join(':');

    navigation.navigate('QRCodeForm', {
      id: '-1',
      name: '',
      amount: 0,
      category: "1",
      date: formattedDate,
      time: formattedTime,
      recipient: upiUrlKeyId[upiUrl] ? upiUrlKeyId[upiUrl] : '1',
      type: 'Expense',
      addition: true,
      upiUrl,
      merchantName,

    });
  }



  return (
    <View
      style={{ flex: 1, backgroundColor: appColors.white }}
    >
      {/* Header */}
      <View
        style={{
          elevation: 1,
          height: 100,
          backgroundColor: appColors.blue,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2
        }}
      >
        <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name='close' size={30} color={appColors.white} style={{ marginLeft: 10 }} />
          </Pressable>
          <Text style={{ color: appColors.white, fontSize: 25, fontFamily: 'Roboto-Bold' }}>Scan QR Code</Text>
        </View>
        <Pressable style={{ flex: 3, alignItems: 'flex-end', marginRight: 10 }}
          onPress={() => setFlashOn(!flashOn)}
        >
          <MaterialCommunityIcons name={flashOn ? 'flash-off' : 'flash'} size={30} color={appColors.white} style={{ marginRight: 10 }} />
        </Pressable>
      </View>

      {/* Camera */}
      <View style={{ flex: 1 }}>
        {
          device ?
            <>
              {/* Mask */}
              <View style={{ position: 'absolute', zIndex: 1, top: 0, bottom: 0, left: 0, right: 0 }}>
                <Svg height={Dimensions.get('screen').height} width="100%">
                  <Defs>
                    <Mask id="mask" x="0" y="0" width="100%" height="100%">
                      <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                      <Rect x={`${(100 - 250 / Dimensions.get('window').width * 100) / 2}%`} y="30%" width="250" height="250" fill="black" />
                    </Mask>
                  </Defs>
                  <Rect height="100%" width="100%" fill="rgba(0,0,0,0.5)" mask="url(#mask)" />
                  <Rect x={`${(100 - 250 / Dimensions.get('window').width * 100) / 2}%`} y="30%" width="250" height="250" fill="none" stroke={appColors.lightGrey} strokeWidth="2" />
                </Svg>
              </View>

              {/* Display Message */}
              <Animated.View
                style={{
                  position: 'absolute',
                  zIndex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 520,
                  width: Dimensions.get('screen').width,
                  transform: [{ translateX: shakeAnimation }],
                }}
              >
                <Text
                  style={{
                    color: appColors.black,
                    fontSize: 12,
                    fontFamily: 'Roboto-Regular',
                    textAlign: 'center',
                    backgroundColor: appColors.white,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  {displayMessage}
                </Text>
              </Animated.View>

              {/* Camera */}
              <Camera
                style={{ flex: 1 }}
                device={device}
                isActive={true}
                torch={flashOn ? 'on' : 'off'}
                codeScanner={codeScanner}
              />
            </>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Camera not available</Text>
            </View>
        }

      </View>



    </View>
  )
}

const styles = StyleSheet.create({})
