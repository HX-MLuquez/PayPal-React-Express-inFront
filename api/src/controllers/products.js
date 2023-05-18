const jsonData = require("../../utils/products.json");

let products = [];

function postAllProducts(req, res) {
  try {
    products = [...jsonData];
    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
function getAllProducts(req, res) {
  try {
    if (products.length > 0) {
      // console.log(":::all:::products:::in:::Cart:::", products);
      return res.status(200).json(products);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
function getProductById(req, res) {}

function updateStockProducts(productId, amount) {
  // console.log("in updateStockProducts", productId, amount);
  products = products.map((e) => {
    if (e.id === productId) {
      e.stock = e.stock - amount;
    }
    return e;
  });
}

function getStockProduct(productId) {
  let stock;
  // console.log("in getStockProduct :::", products);
  products?.map((e) => {
    if (e.id === productId) {
      stock = e.stock;
      // console.log("in map :::", e);
    }
  });
  return stock !== undefined ? stock : 0;
  // esto es para que no devuelva un undefined y del lado de la ruta no genere un problema, 
  // no arroje una excepción que haga caer en la respuesta del catch
}

module.exports = {
  postAllProducts,
  getProductById,
  getAllProducts,
  updateStockProducts,
  getStockProduct,
};
