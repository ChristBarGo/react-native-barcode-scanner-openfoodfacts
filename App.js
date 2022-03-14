import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DatabaseDTO from './app/database/DatabaseDTO';
import ProductController from './app/controller/ProductController';
import BarcodeScannerScreen from './app/components/BarcodeScannerScreen';

const Tab = createBottomTabNavigator();

function ProductsHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text>Products History Screen</Text>
    </View>
  );  
}

export default function App() {
  const productController = new ProductController(new DatabaseDTO());

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Scanner"
          options={{unmountOnBlur: true}}
          children={() => 
            <BarcodeScannerScreen controller={productController}></BarcodeScannerScreen>} 
        />
        <Tab.Screen options={{unmountOnBlur: true}} name="History" component={ProductsHistoryScreen} />
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
