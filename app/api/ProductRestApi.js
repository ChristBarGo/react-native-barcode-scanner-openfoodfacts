

const OPENFOODFACTS_API_BASE_URL = "https://world.openfoodfacts.org/api/v0/product/";
const PRODUCT_API_FILE_EXTENSION = ".json";

export default async function getProductInfoByBarcode(barcode) {
    const ENTIRE_URL = OPENFOODFACTS_API_BASE_URL + barcode + PRODUCT_API_FILE_EXTENSION;
    const INVALID_PRODUCT_STATUS = 0;

    const httpHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        UserAgent: "OpenFoodFacts Barcode Scanner App - Cross-Platform - Version 1.0"
    }
    try {
        const response = await fetch(ENTIRE_URL, {
            method: 'GET',
            headers: httpHeaders
        })
        
        const product = await response.json()

        if (product.status === INVALID_PRODUCT_STATUS) {
            return null
        }

        return product;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}