const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const rawData = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(rawData);
    } catch (error) {
      // Si ocurre un error al leer el archivo (puede que no exista todavía), se deja el arreglo vacío.
      this.products = [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (this.products.some(product => product.code === code)) {
      console.log(`Error: Product with code ${code} already exists.`);
      return;
    }

    const newProduct = {
      id: this.getNextId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts();
    console.log(`Product with id ${newProduct.id} added.`);
  }

  getNextId() {
    return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Product not found.");
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
        id,
      };
      this.saveProducts();
      console.log(`Product with id ${id} updated.`);
    } else {
      console.log("Error: Product not found.");
    }
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    if (this.products.length < initialLength) {
      this.saveProducts();
      console.log(`Product with id ${id} deleted.`);
    } else {
      console.log("Error: Product not found.");
    }
  }
}

const productManager = new ProductManager("products.json");

productManager.addProduct({
  title: "Product 1",
  description: "Description 1",
  price: 1099,
  thumbnail: "thumbnail1.jpg",
  code: "P1",
  stock: 50,
});

productManager.addProduct({
  title: "Product 2",
  description: "Description 2",
  price: 2099,
  thumbnail: "thumbnail2.jpg",
  code: "P2",
  stock: 30,
});

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(2);
console.log(productById);

productManager.updateProduct(2, { price: 25.99, stock: 40 });

productManager.deleteProduct(1);

const nonExistentProduct = productManager.getProductById(5);

console.log("Hola, esto es un mensaje de prueba.");