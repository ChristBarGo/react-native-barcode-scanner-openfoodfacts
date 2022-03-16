export default class Product {
    id;
    barcode;
    name;
    brand;
    imageUrl;
    ingredients;
    nutritionalImageUrl;
    categories;

    constructor(id, barcode, name, brand, imageUrl, ingredients = "", nutritionalImageUrl = "") {
        this.id = id;
        this.barcode = barcode;
        this.name = name;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.nutritionalImageUrl = nutritionalImageUrl;
    }

    setCategories(categories) {
        this.categories = categories;
    }

}