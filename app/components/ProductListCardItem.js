import { View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";

export default function ProductListCardItem(props) {
    return (
        <View style={styles.container}>
            <Card style={{alignItems: 'center'}}>
                <Card.Title>{props.name}</Card.Title>
                <Card.Divider/>
                <Card.Image
                style={styles.image}
                source={{
                    uri: props.imageUrl
                }}
                />
                <Text style={{alignItems: "center", justifyContent: "center"}}>{props.brand}</Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        width: '100%'
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    }
});