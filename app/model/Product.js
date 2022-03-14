export default class Product {
    id;
    name;
    brand;
    imageUrl;
    ingredients;
    nutritionalImageUrl;
    categories;

    constructor(id, name, brand, imageUrl, ingredients = "", nutritionalImageUrl = "") {
        this.id = id;
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