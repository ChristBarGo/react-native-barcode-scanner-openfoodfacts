import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProductListCardItem from './ProductListCardItem';

export default function ProductsHistoryScreen(props) {
  const [selectedId, setSelectedId] = useState(null); // To force re-render flatlist
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const controller = props.route.params.controller;

  useEffect(() => {
    const productsFromRepository = controller.getAllProductsFromRepository();
    productsFromRepository
    .then(result => {
      setProductList(mapProductsFromRepositoryToArrayOfObjects(result));
      setIsLoading(false);
    })
    .catch(error => {
      console.log("An Error when receiving products from database: ", error);
    });
  }, [])
 
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        props.navigation.navigate('Product Item', {
          'item': item
        })
      }}>
      <ProductListCardItem
        name={item.name} 
        brand={item.brand} 
        imageUrl={item.imageUrl}>
        onPress={() => setSelectedId(item.id)}  
      </ProductListCardItem>
    </TouchableOpacity>
  );

  if (!isLoading && (!productList || productList == undefined || productList.length == 0)) {
    return  (
      <View style={styles.noProductScanned}>
        <Text style={{ fontSize: 25 }}>No Product Scanned</Text>
        <Text style={{ fontSize: 15, fontStyle: 'italic'}}>Scan a product first from product barcode scanner tab</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading 
        ? <ActivityIndicator style={styles.loadingViewIndicator} size="large" color="gray" /> 
        :
      <FlatList
        data = {productList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={productList}>
      </FlatList>
      }
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
        backgroundColor: '#99CCFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0
    },

    loadingViewIndicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    productFlatList: {
      flex: 1,
      flexDirection: 'row'
    },

    noProductScanned: {
      flex: 1,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0
    }
});