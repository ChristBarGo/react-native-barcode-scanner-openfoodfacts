import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraBarcodeScanner from './app/components/CameraBarcodeScanner';
import DatabaseDTO from './app/database/DatabaseDTO';
import ProductController from './app/controller/ProductController';

const Tab = createBottomTabNavigator();

function BarcodeScannerScreen(props) {
  return (
    <View style={styles.container}>
      <CameraBarcodeScanner controller={props.controller}></CameraBarcodeScanner>
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
  const productController = new ProductController(new DatabaseDTO());
  console.log(productController);
  productController.createProductTableInDBIfNotExists();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Scanner"
          children={() => 
            <BarcodeScannerScreen controller={productController}></BarcodeScannerScreen>} 
        />
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
