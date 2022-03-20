# REACT NATIVE BARCODE SCANNER WITH OPENFOODFACTS PRODUCTS DATA

Barcode scanner app using React Native Expo and openfoodfacts product search.

---

author: Christian Barquilla Gómez<br>
status: On going.<br>
tags: Barcode scanner, react native, openfoodfacts, expo

---

<br>

## Dependencies

- **Database:** Firebase Realtime Database: https://firebase.google.com/docs/database
- **REST API:** Openfoodfacts API: https://world.openfoodfacts.org/api/v2/product/{product_barcode}

## Introduction

This repository implements an React Native Expo application to scan product barcodes and search for them in openfoodfacts using its JSON API: https://openfoodfacts.github.io/api-documentation/. When receiving product data from openfoodfacts, the product is saved in a Firebase Realtime Database and then, the application displays the product information.

## App workflow

When the app starts, the barcode scanner screen loads and is ready to scan a product barcode. When moving the app closer to product a barcode, the app search for it in openfoodfacts and displays the product details screen. <br>
The app has two bottom tabs, the first one shows the barcode scanner screen and the second one displays the history of scanned products. That page shows a list of products that were previously scanned and if one of them is touched, the product details screen for that product is displayed.

## How to install and run

_Make sure you have installed NodeJS before installing and running this project. If not, go to https://nodejs.org/ to download the latest version._

1. Clone the repository to a local folder.
2. Open a terminal in root folder path and run the command _npm install_ to install all project dependencies.
3. Run the applicacion in the same terminal. You can run it in two ways:<br>
   3.1 Choose one of the following commands depending on the target platform you want to run the application on: _npm run android_, _npm run ios_ or _npm run web_.<br>
   3.2 Run the command _npm start_ and when the server starts, choose the platform to run the app on.
