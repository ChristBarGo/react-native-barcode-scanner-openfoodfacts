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

        this.saveScannedProductToRepository(productModelObj)
        .then(scannedProductIsSaved => {
          if (scannedProductIsSaved) {
            resolve(productModelObj.id);
          }
          else {
            resolve(false);
          }
        });
     
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

  async getProductFromRepositoryById(productId) {
    const productFromDatabase = await this.databaseDto.getProductFromDatabase(productId);

    return productFromDatabase;
  }

  mapProductReceivedToModel(productFromApi, barcodeData) {
    let product = null;

    if (productFromApi && productFromApi != null) {
      const productObject = productFromApi.product;

      if (productObject && productObject != null) {
        const id = productObject.id;
        const name = productObject.generic_name != '' || productObject.generic_name == undefined ? productObject.generic_name : id + " - " + productObject.brands;
        const brand = productObject.brands == undefined || productObject.brands == "" ? "No brand data " : productObject.brands;
        const imageUrl = productObject.image_front_url;
        const ingredients = productObject.ingredients != undefined ? productObject.ingredients.map(ingredient => ingredient.id) : "No ingredients data";
        const ingredientsUrl = productObject.image_ingredients_url;
        const categories = productObject.categories;
        const nutritionalImageUrl = productObject.image_nutrition_url;

        product = new Product(id, barcodeData, name, brand, imageUrl, ingredients, nutritionalImageUrl);
        product.categories = categories;
      }
    }

    return product;
  }
}