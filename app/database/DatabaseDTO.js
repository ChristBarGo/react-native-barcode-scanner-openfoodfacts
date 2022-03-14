import Product from "../model/Product";
import DatabaseDAO from "./DatabaseDAO";

export default class ProductDatabaseDto {
    constructor() {
        this.databaseDAO = new DatabaseDAO();
        this.productRef = "products/";
    }
    
    saveProductToDatabase(product) {
        if (product && product != null && product instanceof Product && product.id && product.id != null) {
            this.databaseDAO.saveData(this.productRef, product.id, product);
        }
    }

    getAllProductsFromDatabase() {
        return this.databaseDAO.getAllData(this.productRef);
    }
}
