import { createStackNavigator } from '@react-navigation/stack';
import ProductItemScreen from '../components/ProductItemScreen';
import ProductsHistoryScreen from '../components/ProductsHistoryScreen';

const Stack = createStackNavigator();

export default function ProductHistoryNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = "Product History"
                component={ProductsHistoryScreen}
                initialParams={{'controller': props.controller}}> 
            </Stack.Screen>
            <Stack.Screen 
                name = "Product Item"
                component={ProductItemScreen}> 
            </Stack.Screen>
        </Stack.Navigator>
    );
}