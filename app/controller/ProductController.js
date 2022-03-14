import getProductInfoByBarcode from "../api/ProductRestApi";
import Product from "../model/Product";

export default class ProductController {
  constructor(databaseDto) {
    this.databaseDto = databaseDto;
  }

  async saveProductToRepository(barcodeData) {
    await getProductInfoByBarcode(barcodeData)
      .then(productFromApi => {
        console.log(productFromApi);
        const productModelObj = this.mapProductReceivedToModel(productFromApi);
        console.log(productModelObj);
        this.saveScannedProductToRepository(productModelObj);
        console.log("DB data from ProductController: ", this.getAllProductsFromRepository());
      })
      .catch(error => {
        console.error(error);
      })
  }

  saveScannedProductToRepository(product) {
    if (product && product != null) {
      this.databaseDto.saveProductToDatabase(product);
    }
  }

  getAllProductsFromRepository() {
    return this.databaseDto.getAllProductsFromDatabase();
  }

  mapProductReceivedToModel(productFromApi) {
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

        product = new Product(id, name, brand, imageUrl, ingredients, nutritionalImageUrl);
        product.categories = categories;
      }
    }

    return product;
  }
}