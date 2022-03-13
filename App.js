import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraBarcodeScanner from './app/components/CameraBarcodeScanner';

const Tab = createBottomTabNavigator();

function BarcodeScannerScreen() {
  return (
    <View style={styles.container}>
      <CameraBarcodeScanner></CameraBarcodeScanner>
      <StatusBar style="auto" />
    </View>
  );  
}

function ProductsHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text>Products History Screen</Text>
    </View>
  );  
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Scanner" component={BarcodeScannerScreen} />
        <Tab.Screen name="History" component={ProductsHistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
});
