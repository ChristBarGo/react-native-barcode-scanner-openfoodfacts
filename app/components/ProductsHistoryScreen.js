import { View, Text, StyleSheet } from 'react-native';

export default function ProductsHistoryScreen() {
    return (
      <View style={styles.container}>
        <Text>Products History Screen</Text>
      </View>
    );  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue'
    },
});