import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableHighlight, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProductListCardItem from './ProductListCardItem';
import globalStyles from '../styles/styles';

const FLATLIST_NUM_COLUMNS = 2;
const windowDimensions = Dimensions.get("window");
const WINDOW_WIDTH = windowDimensions.width;
const WINDOW_HEIGHT = windowDimensions.height;

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
      style={styles.productCardItem}
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
      <SafeAreaView style={styles.noProductScanned}>
        <Text style={{ fontSize: 25 }}>No Product Scanned</Text>
        <Text style={{ fontSize: 15, fontStyle: 'italic'}}>Scan a product first from product barcode scanner tab</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={globalStyles.rootStyle}>
      {isLoading 
        ? <ActivityIndicator style={styles.loadingViewIndicator} size="large" color="gray" /> 
        :
      <FlatList
        style={{flex: 1}}
        key={'#'}
        data = {productList}
        renderItem={renderItem}
        keyExtractor={item => "#" +item.code}
        extraData={productList}
        numColumns={FLATLIST_NUM_COLUMNS}>
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
    },

    loadingViewIndicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    productCardItem: {
      flex: 1,
      height: WINDOW_HEIGHT / 3,
      width: WINDOW_WIDTH / FLATLIST_NUM_COLUMNS,
      padding: WINDOW_WIDTH * 0.02
    },

    noProductScanned: {
      flex: 1,
      backgroundColor: 'skyblue',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0
    }
});