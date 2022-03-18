import { View, StyleSheet, Text, Image } from "react-native";

export default function ProductListCardItem(props) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={{
                        uri: props.imageUrl
                    }}
                />
                <View style={styles.text}>
                    <Text numberOfLines={1} style={styles.cardTitle}>{props.name}</Text>
                    <Text 
                    numberOfLines={1}
                    style={styles.brand}>{props.brand}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        flex: 1,
    },

    text: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        color: 'black',
    },

    cardTitle: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: "center",
        textAlignVertical: "center",
    },

    image: {
        flex: 5,
        resizeMode: 'cover',
        borderRadius: 20
    },

    brand: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center"
    }
});