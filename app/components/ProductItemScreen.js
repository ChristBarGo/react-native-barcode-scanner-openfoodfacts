import { SafeAreaView, StyleSheet, Image, Text, View } from "react-native";

export default function ProductItemScreen(props) {
    const itemParam = props.route.params.item;
    console.log("itemParam: ", itemParam);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.productImage}
                source={{uri: itemParam.imageUrl}}>
            </Image>
            <Text style={styles.simpleText}>Name: {itemParam.name}</Text>
            <Text style={styles.simpleText}>Brand: {itemParam.brand}</Text>
            <View style={styles.ingredientsSection}>
                <Text>Ingredients</Text>
                <Text>{itemParam.ingredients}</Text>
            </View>
            <View style={styles.nutritionalInfoSection}>
                <Text style={{flex: 1}}>Nutritional information</Text>
                <Image style={styles.productImage}
                    source={{uri: itemParam.nutritionalImageUrl}}>
                </Image>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "skyblue"
    },
    productImage: {
        flex: 3,
        width: null,
        height: null,
        resizeMode: "contain"
    },
    simpleText: {
        flex: 1
    },
    ingredientsSection: {
        flex: 2
    },
    nutritionalInfoSection: {
        flex: 2
    }
});