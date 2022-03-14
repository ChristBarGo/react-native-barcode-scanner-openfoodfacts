import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DatabaseDTO from './app/database/DatabaseDTO';
import ProductController from './app/controller/ProductController';
import BarcodeScannerScreen from './app/components/BarcodeScannerScreen';
import ProductsHistoryScreen from './app/components/ProductsHistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const productController = new ProductController(new DatabaseDTO());

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Product Barcode Scanner"
          options={{unmountOnBlur: true}}
          children={() => 
            <BarcodeScannerScreen controller={productController}></BarcodeScannerScreen>} 
        />
        <Tab.Screen options={{unmountOnBlur: true}} name="Scanned Products" component={ProductsHistoryScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
});
