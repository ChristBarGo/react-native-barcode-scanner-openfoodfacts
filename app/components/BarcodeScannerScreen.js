import CameraBarcodeScanner from './CameraBarcodeScanner';
import { View, StyleSheet } from 'react-native';

export default function BarcodeScannerScreen(props) {
    return (
      <View style={styles.container}>
        <CameraBarcodeScanner controller={props.route.params.controller} navigation={props.navigation}></CameraBarcodeScanner>
      </View>
    );  
  }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});