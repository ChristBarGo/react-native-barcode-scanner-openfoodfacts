import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import ProductListCardItem from './ProductListCardItem';

export default function ProductsHistoryScreen(props) {
  const [selectedId, setSelectedId] = useState(null); // To force re-render flatlist
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const productsFromRepository = props.controller.getAllProductsFromRepository();
    setProductList(mapProductsFromRepositoryToArrayOfObjects(productsFromRepository));
  })

  const renderItem = ({ item }) => (
    <ProductListCardItem 
      name={item.name} 
      brand={item.brand} 
      imageUrl={item.imageUrl}>
      onPress={() => setSelectedId(item.id)}  
    </ProductListCardItem>
  );

  console.log("Product List Data: ", productList);

  if (productList || productList == undefined || productList.length == 0) {
    return  (
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>No Product Scanned</Text>
        <Text style={{ fontSize: 15, fontStyle: 'italic'}}>Scan a product first from product barcode scanner tab</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data = {productList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}>
      </FlatList>
    </SafeAreaView>
  );  
}

function mapProductsFromRepositoryToArrayOfObjects(productsFromRepository) {
  if (productsFromRepository && Object.keys(productsFromRepository).length > 0) {
    const productsFromRepositoryAsArray = Object.keys(productsFromRepository).map(product => {return productsFromRepository[product]})
    return productsFromRepositoryAsArray;
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0
    },

    productFlatList: {
      flex: 1,
      flexDirection: 'row'
    }
});