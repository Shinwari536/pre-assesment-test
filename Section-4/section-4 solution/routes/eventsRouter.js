require("dotenv").config();
const express = require("express");
const { getData } = require("../service/dbService");
const asyncMiddleware = require("../middleware/asyncMiddleware");

const router = express.Router();

const response = { data: null, message: null, error: null };

router.get(
  "/get_data",
  asyncMiddleware(async (req, res, _next) => {
    const result = await getData();
    response.data = result;
    response.message = "Addresses and Balances retrived successfull."
    res.send(response);
  })
);

module.exports = router;
