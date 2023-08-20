class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct({ code, ...productData }) {
      if (this.products.some(product => product.code === code)) {
        console.log(`Error: Product with code ${code} already exists.`);
        return;
      }
  
      const newProduct = {
        id: this.nextId++,
        ...productData,
        code,
      };
  
      this.products.push(newProduct);
      console.log(`Product with id ${newProduct.id} added.`);
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
  }
  
  const productManager = new ProductManager();
  
  productManager.addProduct({
    title: "Product 1",
    description: "Description 1",
    price: 10.99,
    thumbnail: "thumbnail1.jpg",
    code: "P1",
    stock: 50,
  });
  
  productManager.addProduct({
    title: "Product 2",
    description: "Description 2",
    price: 20.99,
    thumbnail: "thumbnail2.jpg",
    code: "P2",
    stock: 30,
  });
  
  const allProducts = productManager.getProducts();
  console.log(allProducts);
  
  const productById = productManager.getProductById(2);
  console.log(productById);
  
  const nonExistentProduct = productManager.getProductById(5);
  
  console.log("Hola, esto es un mensaje de prueba.");

