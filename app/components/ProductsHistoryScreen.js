import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProductListCardItem from './ProductListCardItem';
import globalStyles from '../styles/styles';
import { onValue, ref} from 'firebase/database';

const FLATLIST_NUM_COLUMNS = (Platform.OS == 'web') ? 4 : 2;
const windowDimensions = Dimensions.get("window");
const WINDOW_WIDTH = windowDimensions.width;
const WINDOW_HEIGHT = windowDimensions.height;

export default function ProductsHistoryScreen(props) {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  const controller = props.route.params.controller;

  const setFirebaseOnValueListener = () => {
    const PRODUCTS_FIREBASE_REF = "products/"
    const firebaseDB = controller.getFirebaseDatabase();

    const onData = snapshot => {
      const snapshotValues = Object.values(snapshot.val());
      console.log("snapshotValues: ", snapshotValues);
      setProductList(snapshotValues);
      setIsLoading(false);
  }

    const onError = error => console.error(error);

    console.log("FirebaseDB: ", firebaseDB, " REF: ", PRODUCTS_FIREBASE_REF);
    const databaseRef = ref(firebaseDB, PRODUCTS_FIREBASE_REF);

    onValue(databaseRef, onData, onError);
  }

  useEffect(() => {
    setFirebaseOnValueListener();
    /*let productsFromRepository = [];
    controller.retrieveAllDataFromRepositoryWhenChange(productsFromRepository);
    
    console.log("ProductsFromRepository: ", productsFromRepository);
    if (productsFromRepository) {
      setProductList(productsFromRepository);
      console.log("ProductList: ", productList);
      setIsLoading(false);
    }
    else {
      console.log("An Error occurred when receiving products from database");
    }*/
    /*setIsFetchingProducts(true);
    const productsFromRepository = controller.getAllProductsFromRepository();
    console.log("UseEffect");
    productsFromRepository
      .then(result => {
        console.log("productsFromRepository: ", productsFromRepository);
        setProductList(mapProductsFromRepositoryToArrayOfObjects(result));
        setIsLoading(false);
        setIsFetchingProducts(false)
      })
      .catch(error => {
        console.log("An Error when receiving products from database: ", error);
      });*/
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
      </ProductListCardItem>
    </TouchableOpacity>
  );

  if (!isLoading && (!productList || productList == undefined || productList.length == 0)) {
    return  (
      <SafeAreaView style={[globalStyles.rootStyle, styles.noProductScanned]}>
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
        key={productList.length}
        data = {productList}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        extraData={isFetchingProducts}
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
      height: WINDOW_HEIGHT / 3,
      width: WINDOW_WIDTH / FLATLIST_NUM_COLUMNS,
      padding: WINDOW_WIDTH * 0.01,
    },

    noProductScanned: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0
    }
});