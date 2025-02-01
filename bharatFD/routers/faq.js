const express = require("express");
const { createFAQ, getFAQs } = require("../controller/faq");

const router = express.Router();

router.post("/", createFAQ);
router.get("/", getFAQs);

module.exports = router;