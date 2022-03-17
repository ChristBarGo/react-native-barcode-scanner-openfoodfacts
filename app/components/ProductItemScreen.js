import { SafeAreaView, StyleSheet, Image, Text, View, ScrollView, Dimensions } from "react-native";
import globalStyles from "../styles/styles";

const windowDimensions = Dimensions.get("window");
const WINDOW_WIDTH = windowDimensions.width;
const WINDOW_HEIGHT = windowDimensions.height;
const PRODUCT_IMAGE_HEIGHT_PERCENTAGE = 0.4;
const REST_IMAGE_HEIGHT_PERCENTAGE = 0.3;
//const product

export default function ProductItemScreen(props) {
    const itemParam = props.route.params.item;
    console.log("itemParam: ", itemParam);
    return (
        <SafeAreaView style={[globalStyles.rootStyle, styles.container]}>
            <ScrollView>
                <Image style={styles.productImage}
                    source={{uri: itemParam.imageUrl}}>
                </Image>
                <View style={styles.productMainInfo}>
                    <Text style={styles.textView}>
                        <Text style={styles.textFieldTitle}>Name: </Text>
                        <Text style={styles.textContent}>{itemParam.name}</Text>
                    </Text>
                    <Text style={styles.textView}>
                        <Text style={styles.textFieldTitle}>Brand: </Text>
                        <Text style={styles.textContent}>{itemParam.brand}</Text>
                    </Text>
                    <Text style={styles.textView}>
                        <Text style={styles.textFieldTitle}>Bar Code: </Text>
                        <Text style={styles.textContent}>{itemParam.code}</Text>
                    </Text>
                    <Text style={styles.textView}>
                        <Text style={styles.textFieldTitle}>Categories: </Text>
                        <Text style={styles.textContent}>{itemParam.categories ? itemParam.categories : "No categories available"}</Text>
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textSectionTitle}>Ingredients</Text>
                    <Text style={styles.textContent}>{itemParam.ingredients}</Text>

                    {itemParam.ingredientsImageUrl ? 
                        <Image style={styles.restImage}
                            source={{uri: itemParam.ingredientsImageUrl}}>
                        </Image> : null
                    }
                </View>
                <View style={styles.section}>
                    <Text style={styles.textSectionTitle}>Nutritional information</Text>
                    {itemParam.nutritionalImageUrl ?
                        <Image style={styles.restImage}
                            source={{uri: itemParam.nutritionalImageUrl}}>
                        </Image> : null
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: WINDOW_WIDTH * 0.02
    },

    productMainInfo: {
        flex: 1
    },

    productImage: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT * PRODUCT_IMAGE_HEIGHT_PERCENTAGE,
        resizeMode: "contain",
    },

    restImage: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT * REST_IMAGE_HEIGHT_PERCENTAGE,
        resizeMode: "contain",
    },

    textView: {
        flex: 1,
        flexDirection: "row"
    },

    textFieldTitle: {
        flex: 1,
        fontWeight: 'bold'
    },

    textSectionTitle: {
        fontWeight: 'bold',
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        paddingVertical: WINDOW_HEIGHT * 0.01
    },

    textContent: {
        flex: 1,
    },

    section: {
        paddingVertical: WINDOW_HEIGHT * 0.01
    },
});