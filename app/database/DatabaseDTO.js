import Product from "../model/Product";
import DatabaseDAO from "./DatabaseDAO";

export default class ProductDatabaseDto {
    constructor() {
        this.databaseDAO = new DatabaseDAO();
        this.productsRef = "products/";
    }
    
    saveProductToDatabase(product) {
        if (product && product != null && product instanceof Product && product.id && product.id != null) {
            this.databaseDAO.saveObject(this.productsRef, product.id, product);
        }
    }

    async getAllProductsFromDatabase() {
        const productsData = await this.databaseDAO.getAllData(this.productsRef);
        return productsData;
    }
}
