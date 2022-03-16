import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DatabaseDTO from './app/database/DatabaseDTO';
import ProductController from './app/controller/ProductController';
import ProductHistoryNavigator from './app/navigation/ProductHistoryNavigator';
import BarcodeScannerNavigator from './app/navigation/BarcodeScannerNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  const productController = new ProductController(new DatabaseDTO());

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Product Barcode Scanner"
            options={{unmountOnBlur: true}}
            children={() => 
              <BarcodeScannerNavigator controller={productController}></BarcodeScannerNavigator>} 
          />
          <Tab.Screen 
            options={{unmountOnBlur: true}} 
            name="Scanned Products" 
            children={() =>
              <ProductHistoryNavigator controller={productController}></ProductHistoryNavigator>}
            />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

