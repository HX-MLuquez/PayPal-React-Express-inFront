const express = require("express");
const router = express.Router();
const {
    payPalPost
 
} = require("../controllers/paypal");

router.post("/paypal/webhook", payPalPost);

/*
ALL // x*xx**xxx***
*/

module.exports = router;