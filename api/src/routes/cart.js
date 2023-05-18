const express = require("express");
const router = express.Router();
const {
  postCart,
  getAllCart,
  buyProducts,
  deleteCart,
  amountStockCart
} = require("../controllers/cart");

router.get("/all/:userId", getAllCart);
router.post("/", postCart);
router.put("/stock", amountStockCart); 
router.delete("/:id", deleteCart);
router.post("/buy", buyProducts); // recibe { userId, cartCode, total } --> crea orden y limpia carrito

module.exports = router;
