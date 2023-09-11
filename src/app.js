const express = require('express');
const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }
}

const app = express();
const port = process.env.PORT || 3000;

const productManager = new ProductManager("products.json");

app.use(express.json());

app.get('/products', (req, res) => {
  const { limit } = req.query;
  const allProducts = productManager.getProducts();

  if (limit) {
    const limitedProducts = allProducts.slice(0, parseInt(limit));
    res.json({ products: limitedProducts });
  } else {
    res.json({ products: allProducts });
  }
});

app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(parseInt(pid));

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
