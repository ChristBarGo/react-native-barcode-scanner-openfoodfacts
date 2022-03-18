import { useState } from "react";
import { Button, View, Alert, StyleSheet, TextInput, Dimensions, ActivityIndicator } from "react-native";

const WINDOW = Dimensions.get('window');
const WINDOW_WIDTH = WINDOW.width;
const WINDOW_HEIGHT = WINDOW.height;
const MODAL_PERCENTAGE_WIDTH = 0.5;
const MODAL_PERCENTAGE_HEIGHT = 0.2;

export default function ManualBarcodeEntry(props) { 
    const ADD_BARCODE_BUTTON_TITLE = "Add a barcode";
    const TEXTINPUT_PLACEHOLDER = "Enter a product barcode";

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState("");
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);

    const controller = props.controller;
    const navigation = props.navigation;

    const saveBarcodeToRepositoryAndNavigate = async () => {
        const barcode = textInputValue;
        console.log("Fetch Handle: ", barcode);
        const saveProductCode = await controller.saveProductToRepository(barcode);
        console.log("saveProductCode: ", saveProductCode);
        setIsLoadingProduct(true);
        if (saveProductCode) {
        const productFromRepository = await controller.getProductFromRepositoryByCode(saveProductCode);

            if (productFromRepository) {
                navigation.navigate('Product Item', {
                'item': productFromRepository
                })
                setIsLoadingProduct(false);
                setIsModalVisible(false);
            }
        }
        else {
            showAlertWhenBarcodeIsInvalidOrUnregistered(barcode);
        }
    }

    const showAlertWhenBarcodeIsInvalidOrUnregistered = (barcode) => {
        const alertTitle = "Invalid product barcode or unregistered";
        const alertMessage = "The barcode " + barcode + " is not valid or product is not registered.";
        Alert.alert(
            alertTitle,
            alertMessage,
            [
                {
                    text: 'Accept',
                    onPress: () => {
                        setIsLoadingProduct(false);
                    }
                }
            ]
        )
    }

    const LoadingView = (
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="gray" />
        </View>
      )

    return (
        <View style={styles.container}>
            {isLoadingProduct
            ? LoadingView
            :
            !isModalVisible ?
                <Button
                    style={{flex: 1}}
                    title={ADD_BARCODE_BUTTON_TITLE}
                    onPress={() => setIsModalVisible(true)}>
                </Button>
            :
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setTextInputValue}
                        value={textInputValue}
                        placeholder={TEXTINPUT_PLACEHOLDER}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonsView}>
                        <Button
                            style={styles.modalButton}
                            title="Cancel"
                            onPress={() => {
                                setIsModalVisible(false),
                                setTextInputValue("");
                            }}>
                        </Button>
                        <Button
                            style={styles.modalButton}
                            title="Fetch"
                            onPress={() => saveBarcodeToRepositoryAndNavigate()}>
                        </Button>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: WINDOW_WIDTH * MODAL_PERCENTAGE_WIDTH,
        height: WINDOW_HEIGHT * MODAL_PERCENTAGE_HEIGHT,
    },
    textInput: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
    },
    buttonsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    modalButton: {
        flex: 1
    },
    loadingView: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
      }
});