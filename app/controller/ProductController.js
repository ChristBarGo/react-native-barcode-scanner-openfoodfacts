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
        console.log(this.getAllProductsFromRepository());
      })
      .catch(error => {
        console.error(error);
      })
  }

  saveScannedProductToRepository(product) {
    this.databaseDto.saveProductToDatabase(product);
  }

  getAllProductsFromRepository() {
    return this.databaseDto.getAllProductsFromRepository();
  }

  mapProductReceivedToModel(productFromApi) {
    const productObject = productFromApi.product;

    const id = productObject.id;
    const name = productObject.generic_name != '' ? productObject.generic_name : id + " - " + productObject.brands;
    const brand = productObject.brands == "" ? "No brand data " : productObject.brands;
    const imageUrl = productObject.image_front_url;
    const ingredients = productObject.ingredients != undefined ? productObject.ingredients : "No ingredients data";
    const ingredientsUrl = productObject.image_ingredients_url;
    const categories = productObject.categories;
    const nutritionalImageUrl = productObject.image_nutrition_url;

    const product = new Product(id, name, brand, imageUrl, ingredients, nutritionalImageUrl);
    product.categories = categories;

    return product;
  }
}