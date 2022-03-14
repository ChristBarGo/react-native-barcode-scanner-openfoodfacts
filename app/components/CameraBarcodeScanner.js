import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function CameraBarcodeScanner(props) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert("Bar code with type ${type} and data ${data} has been scanned!");
    props.controller.saveProductToRepository(data);
  };

  // This block will be executed while we are asking for camera permission
  if (hasCameraPermission === null) {
    return  (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
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
    <View style={styles.container}>
      <View style={styles.barcodeScannerBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={styles.scanAgainButton}>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
      </View>
    </View>
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