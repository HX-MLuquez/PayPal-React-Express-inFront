const express = require("express");
const router = express.Router();
const cart = require("./cart");
const users = require("./users");
const products = require("./products");

const paypal = require("./paypal");

router.use("/cart", cart);
router.use("/user", users);
router.use("/product", products);

router.use("/api", paypal); // PayPal integration in Back
module.exports = router;
