const express = require("express");
const router = express.Router();
const {
  postAllProducts,
  getProductById,
  getAllProducts,
} = require("../controllers/products");

router.post("/all", postAllProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
