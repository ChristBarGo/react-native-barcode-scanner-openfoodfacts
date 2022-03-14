import DatabaseDAO from "./DatabaseDAO";

export default class DatabaseDTO {
    constructor() {
        this.databaseDAO = new DatabaseDAO();
    }

    createProductTableIfNotExists() {
        const sqlCreateTable = `CREATE TABLE IF NOT EXISTS Products (id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id TEXT, name TEXT, brand TEXT, imageUrl TEXT, ingredients TEXT, nutritionalImageUrl TEXT, categories TEXT);`;
        
        const promiseResponse = this.databaseDAO.executeSimpleQuery(sqlCreateTable);
        console.log(promiseResponse);

        promiseResponse.then(
            result => console.log("CreateProductTableIfNotExists result: ", result),
            error => console.log("CreateProductTableIfNotExists error: ", error)
        );
    }

    insertIntoProductTable(productId, name, brand, imageUrl, ingredients, nutritionalImageUrl, categories) {
        const sqlInsertProduct = `INSERT INTO Products (product_id, name, brand, imageUrl, ingredients, nutritionalImageUrl, categories)
                                    values (?, ?, ?, ?, ?, ?, ?);`;
    
        const promiseResponse = this.databaseDAO.executeParameterizedQuery(sqlInsertProduct, 
            [productId, name, brand, imageUrl, ingredients, nutritionalImageUrl, categories]);

        console.log(promiseResponse);
        promiseResponse.then(
            result => console.log("insertIntoProductTable result: ", result),
            error => console.log("insertIntoProductTable error: ", error)
        );
    }

    getAllProducts() {
        console.log("getAllProducts");
        const sqlSelectAll = 'SELECT * FROM Products;';
    
        const promiseResponse = this.databaseDAO.executeSimpleSelectQuery(sqlSelectAll)
        console.log(promiseResponse);

        promiseResponse.then(
            result => console.log("getAllProducts result: ", result),
            error => console.log("getAllProducts error: ", error)
        );
    }
}
