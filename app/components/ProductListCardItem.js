import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-elements";

export default function ProductListCardItem(props) {
    return (
        <TouchableOpacity style={styles.container}>
            <Card>
                <Card.Title>{props.name}</Card.Title>
                <Card.Divider/>
                <Card.Image
                style={{ padding: 0 }}
                source={{
                    uri: props.imageUrl
                }}
                />
                <Text>{props.brand}</Text>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        width: '100%'
    }
});