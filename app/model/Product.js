export default class Product {
    code;
    name;
    brand;
    imageUrl;
    ingredients;
    ingredientsImageUrl;
    nutritionalImageUrl;
    categories;

    constructor(code, name, brand = "No brand available", imageUrl = "", ingredients = "No ingredients text available", ingredientsImageUrl = "", nutritionalImageUrl = "", categories) {
        this.code = code;
        this.name = name;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.ingredientsImageUrl = ingredientsImageUrl;
        this.nutritionalImageUrl = nutritionalImageUrl;
        this.categories = categories;
    }
}