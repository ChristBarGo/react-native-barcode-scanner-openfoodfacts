import getProductInfoByBarcode from "../api/ProductRestApi";
import Product from "../model/Product";

export default class ProductController {
  constructor(databaseDto) {
    this.databaseDto = databaseDto;
  }

  saveProductToRepository(barcodeData) {
    return new Promise(resolve => {
      getProductInfoByBarcode(barcodeData)
      .then(productFromApi => {
        console.log("Product From Api: ", productFromApi);
        const productModelObj = this.mapProductReceivedToModel(productFromApi, barcodeData);
        console.log("ProductModelObj: ", productModelObj);
        this.saveScannedProductToRepository(productModelObj)
        .then(scannedProductIsSaved => {
          if (scannedProductIsSaved) {
            console.log("Product saved!: ", scannedProductIsSaved);
            resolve(productModelObj.code);
          }
          else {
            console.log("Product not saved!: ");
            resolve(false);
          }
        })
        .catch(error => console.error(error));
      })
      .catch(error => {
        resolve(false);
        console.error(error);
      })
    });
  }

  async saveScannedProductToRepository(product) {
    let productIsSaved = false;

    if (product && product != null) {
      productIsSaved = await this.databaseDto.saveProductToDatabase(product);
    }

    return productIsSaved;
  }

  async getAllProductsFromRepository() {
    const productsFromDatabase = await this.databaseDto.getAllProductsFromDatabase();

    return productsFromDatabase;
  }

  getFirebaseDatabase() {
    return this.databaseDto.getDatabase();
  }

  retrieveAllDataFromRepositoryWhenChange(data) {
    this.databaseDto.retrieveAllDataWhenChangeFromRepository(data);
  }

  async getProductFromRepositoryByCode(productCode) {
    const productFromDatabase = await this.databaseDto.getProductFromDatabase(productCode);

    return productFromDatabase;
  }

  mapProductReceivedToModel(productFromApi, barcodeData) {
    let product = null;

    if (productFromApi && productFromApi != null) {
      const productObject = productFromApi.product;

      if (productObject && productObject != null) {
        const code = productObject.code
          ? productObject.code : barcodeData;
        const name = (productObject.product_name || productObject.product_name != '') 
          ? productObject.product_name : code + " - " + productObject.brands;
        const brand = (productObject.brands || productObject.brands != "") 
          ? productObject.brands : "No brand available";
        const imageUrl = productObject.image_url
          ? productObject.image_url : "";
        const ingredients = productObject.ingredients 
          ? productObject.ingredients.map(ingredient => ingredient.id).toString().replace(/en:/g, "") : "No ingredients text available";
        const ingredientsImageUrl = productObject.image_ingredients_url
          ? productObject.image_ingredients_url : "";
        const categories = productObject.categories 
          ? productObject.categories : "No categories available";
        const nutritionalImageUrl = productObject.image_nutrition_url
          ? productObject.image_nutrition_url : ingredientsImageUrl;

        product = new Product(code, name, brand, imageUrl, ingredients, ingredientsImageUrl, nutritionalImageUrl, categories);
      }
    }

    return product;
  }
}