import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DatabaseDTO from './app/database/DatabaseDTO';
import ProductController from './app/controller/ProductController';
import ProductHistoryNavigator from './app/navigation/ProductHistoryNavigator';
import BarcodeScannerNavigator from './app/navigation/BarcodeScannerNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const productController = new ProductController(new DatabaseDTO());

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Product Barcode Scanner"
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({color, size}) => (
                <Ionicons name="barcode-outline" color={color} size={size} />
              )
            }}
            children={() => 
              <BarcodeScannerNavigator controller={productController}></BarcodeScannerNavigator>} 
          />
          <Tab.Screen 
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="food-apple" color={color} size={size} />
              )
            }} 
            name="Scanned Products" 
            children={() =>
              <ProductHistoryNavigator controller={productController}></ProductHistoryNavigator>}
            />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

