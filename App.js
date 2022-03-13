import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CameraBarcodeScanner from './app/components/CameraBarcodeScanner';

export default function App() {
  return (
    <View style={styles.container}>
      <CameraBarcodeScanner></CameraBarcodeScanner>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
});
