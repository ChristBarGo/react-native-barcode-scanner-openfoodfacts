import CameraBarcodeScanner from './CameraBarcodeScanner';
import { View, StyleSheet } from 'react-native';

export default function BarcodeScannerScreen(props) {
    return (
      <View style={styles.container}>
        <CameraBarcodeScanner controller={props.controller}></CameraBarcodeScanner>
      </View>
    );  
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue'
    },
});