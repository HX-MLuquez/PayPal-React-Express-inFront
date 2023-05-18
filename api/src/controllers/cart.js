let shopping_cart = [];
let purchase_orders = [];
let orderId = 1;

const {
  insufficient_stock,
  no_products_in_cart,
} = require("../Config/PRODUCT_STATUS");
/*
user N : N product   ->   tabla intermedia shopping_cart | { productId, userId, amount, stock } |
y para la compra tengo la tabla purchase_orders  | { userId, cartCode, total } |
*/
/*
Lo más óptimo sería:
user 1 : 1 cart
cart N : N product   ->  tabla intermedia cart_product
*/
const { updateStockProducts, getStockProduct } = require("./products");

function amountStockCart(req, res) {
  try {
    const { userId, productId, increment } = req.body;
    let stock = getStockProduct(productId);
    if (productId && userId) {
      shopping_cart?.map((e, i) => {
        if (e.productId === productId && e.userId === userId) {
          if (stock && increment && e.amount < stock) {
            // console.log(":::stock:::", stock);
            e.amount += 1; // increment amount
            return res
              .status(200)
              .json({ message: `product id: ${productId} is increment` });
          } else if (!increment && e.amount > 0) {
            e.amount -= 1; // decrement amount
            return res
              .status(201)
              .json({ message: `product id: ${productId} is decrement` });
          }
        }
      });
      return res
        .status(202)
        .json({ message: insufficient_stock });
    }
  } catch (error) {
    console.log("in catch next response increment")
    // res.status(404).json({ message: error }); // error de respuesta asincrónica
  }
}

function postCart(req, res) {
  try {
    const { productId, userId, amount, stock } = req.body;
    if (productId && userId && stock > 0) {
      const shop = {
        userId,
        productId,
        amount,
      };
      shopping_cart.push(shop);
      return res.status(200).json(shop);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

function getAllCart(req, res) {
  try {
    const { userId } = req.params;
    // console.log("::::::", purchase_orders);
    // console.log("###", userId)
    // console.log("|||||||||", shopping_cart.length)
    if (shopping_cart.length > 0) {
      const resultCart = shopping_cart.filter(
        (p) => Number(userId) === p.userId
      );
      // console.log("----->", resultCart);
      return res.status(200).json(resultCart);
    } else {
      return res
        .status(200)
        .json({ message: no_products_in_cart });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
function deleteCart(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const newCart = shopping_cart.filter((e) => e.productId !== Number(id));
      shopping_cart = newCart;
      return res.status(200).json(shopping_cart);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

function buyProducts(req, res) {
  try {
    // console.log("in buy product");
    const { userId, cartCode, total } = req.body;
    // cartCode -> [{productId: 1, userId:1, amount: 3}, {etc...}]
    if (userId && cartCode && total) {
      const order = {
        id: orderId,
        userId,
        cartCode,
        total,
      };
      orderId++;
      // crea la orden
      purchase_orders.push(order);

      // actualiza el stock de los productos
      for (let i = 0; i < cartCode.length; i++) {
        updateStockProducts(cartCode[i].productId, cartCode[i].amount);
      }

      // limpia el carrito
      const newCart = shopping_cart.filter((e) => e.userId !== userId);
      shopping_cart = newCart;

      return res.status(200).json({ message: "created order", order });
    } else {
      res
        .status(404)
        .json({ message: "information is missing for the purchase detail" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

module.exports = {
  postCart,
  getAllCart,
  deleteCart,
  amountStockCart,
  buyProducts,
};

/*
Para el caso de amountStockCart no se puede usar try catch debido a que por una demora
se envía doble respuesta y no estamos trabajando cual promesa

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

Este error ocurre cuando intentas enviar encabezados de respuesta HTTP al cliente después de que 
ya se hayan enviado. En otras palabras, estás intentando modificar los encabezados de una respuesta 
que ya se ha enviado al cliente.

Para evitar este error, debes asegurarte de no enviar encabezados después de que 
se haya enviado la respuesta. 
*/
