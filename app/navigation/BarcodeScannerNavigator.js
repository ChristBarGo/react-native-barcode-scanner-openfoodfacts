import { createStackNavigator } from '@react-navigation/stack';
import BarcodeScannerScreen from '../components/BarcodeScannerScreen';
import ProductItemScreen from '../components/ProductItemScreen';

const Stack = createStackNavigator();

export default function BarcodeScannerNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = "Camera Barcode Scanner"
                component={BarcodeScannerScreen}
                initialParams={{'controller': props.controller}}> 
            </Stack.Screen>
            <Stack.Screen 
                name = "Product Item"
                component={ProductItemScreen}> 
            </Stack.Screen>
        </Stack.Navigator>
    );
}