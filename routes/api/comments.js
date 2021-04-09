const express = require("express");
const router = express.Router();

//GET api/recipes
router.get("/", (req, res) => res.send("comments route"));

module.exports = router;
