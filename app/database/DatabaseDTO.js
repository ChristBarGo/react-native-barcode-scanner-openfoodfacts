import Product from "../model/Product";
import DatabaseDAO from "./DatabaseDAO";

export default class ProductDatabaseDto {
    constructor() {
        this.databaseDAO = new DatabaseDAO();
        this.productsRef = "products/";
    }
    
    async saveProductToDatabase(product) {
        let productIsSaved = false;

        if (product && product != null && product instanceof Product && product.code && product.code != null) {
            productIsSaved = await this.databaseDAO.saveObject(this.productsRef, product.code, product);
        }

        return productIsSaved;
    }

    async getAllProductsFromDatabase() {
        const productsData = await this.databaseDAO.getData(this.productsRef);
        return productsData;
    }

    async getProductFromDatabase(productId) {
        let productData = null;

        if (productId && productId != "") {
            productData = await this.databaseDAO.getData(this.productsRef + productId);
        }

        return productData;
    }

    retrieveAllDataWhenChangeFromRepository(data) {
        this.databaseDAO.retrieveDataWhenChange(this.productsRef, data);
    }

    getDatabase() {
        return this.databaseDAO.getDatabase();
    }
}
