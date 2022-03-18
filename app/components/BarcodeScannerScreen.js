import CameraBarcodeScanner from './CameraBarcodeScanner';
import globalStyles from '../styles/styles';
import { SafeAreaView, Platform } from 'react-native';
import ManualBarcodeEntry from './ManualBarcodeEntry';

export default function BarcodeScannerScreen(props) {
  const AppComponent = (
    <CameraBarcodeScanner controller={props.route.params.controller} navigation={props.navigation}></CameraBarcodeScanner>
  );
  const WebComponent = (
    <ManualBarcodeEntry controller={props.route.params.controller} navigation={props.navigation}></ManualBarcodeEntry>
  )

    return (
      <SafeAreaView style={globalStyles.rootStyle}>
        { Platform.OS == "web" 
          ? WebComponent
          : AppComponent
        }
      </SafeAreaView>
    );  
  }