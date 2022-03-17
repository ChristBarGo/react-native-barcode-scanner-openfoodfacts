import CameraBarcodeScanner from './CameraBarcodeScanner';
import globalStyles from '../styles/styles';
import { SafeAreaView } from 'react-native';

export default function BarcodeScannerScreen(props) {

    return (
      <SafeAreaView style={globalStyles.rootStyle}>
        <CameraBarcodeScanner controller={props.route.params.controller} navigation={props.navigation}></CameraBarcodeScanner>
      </SafeAreaView>
    );  
  }