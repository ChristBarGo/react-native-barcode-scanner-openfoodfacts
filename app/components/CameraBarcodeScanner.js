import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CameraBarcodeScanner(props) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const controller = props.controller;
  const navigation = props.navigation;

  const requestCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status == 'granted');
    })()
  }

  // requestCameraPermission is called after rendering the UI thanks to useEffect()
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("HabdleBarScanned");
    setScanned(true);
    setIsLoadingProduct(true);

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
      setIsLoadingProduct(false);
      setScanned(false);
      alert("Bar code with type and data ${data} is not a valid product");
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

  // Load BarcodeScanner View when there is camera permission enabled
  return (
    <SafeAreaView style={styles.container}>
      {isLoadingProduct
      ? LoadingView
      :
        <View style={styles.barcodeScannerBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        </View>
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