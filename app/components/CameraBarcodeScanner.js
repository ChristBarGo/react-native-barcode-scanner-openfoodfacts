import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

export default function CameraBarcodeScanner(props) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const controller = props.controller;
  const navigation = props.navigation;
  const isFocused = useIsFocused();

  const requestCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status == 'granted');
    })()
  }

  // requestCameraPermission is called after rendering the UI thanks to useEffect()
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const showAlertWhenScannedProductIsInvalid = (barcodeType, barcode) => {
    const alertTitle = "Invalid product barcode";
    const alertMessage = "The barcode type ${barcodeType} and data ${barcode} is not valid.";
    Alert.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: 'Accept',
          onPress: () => {
            setIsLoadingProduct(false);
            setScanned(false);
          }
        }
      ]
    )
  } 

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("HabdleBarScanned: type: ", type, " data: ", data);

    setScanned(true);
    setIsLoadingProduct(true);

    console.log("Scanned: ", scanned);

    const savedProductId = await controller.saveProductToRepository(data);
    console.log("saveProductId: ", savedProductId);
    if (savedProductId) {
      const productFromRepository = await controller.getProductFromRepositoryById(savedProductId);

      if (productFromRepository) {
        setIsLoadingProduct(false);
        setScanned(false);
        navigation.navigate('Product Item', {
          'item': productFromRepository
        })
      }
    }
    else {
      console.log("type: ", barcodeType);
      showAlertWhenScannedProductIsInvalid(type, data);
    }
  };

  const LoadingView = (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
    </View>
  )

  // This block will be executed while we are asking for camera permission
  if (hasCameraPermission === null) {
    return  (
      LoadingView
    )
  }

  // This block will be executed when there is no camera permission
  if (hasCameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Could not access to camera</Text>
        <Button title="Access to Camera" onPress={() => requestCameraPermission()}></Button>
      </View>
    )
  }

  const CameraView = (
      <View style={styles.barcodeScannerBox}>
        {isFocused &&
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            autoFocus={Camera.Constants.AutoFocus.on}
            style={StyleSheet.absoluteFill}
          />
        }
      </View>
    )
  // Load BarcodeScanner View when there is camera permission enabled
  return (
    <SafeAreaView style={styles.container}>
      {isLoadingProduct
      ? LoadingView
      :
        CameraView
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center'
  },

  barcodeScannerBox: {
    flex: 5,
    borderRadius: 25,
    width: '100%',
  },

  scanAgainButton: {
    flex: 1,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});