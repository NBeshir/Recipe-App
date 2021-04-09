const express = require("express");
const router = express.Router();

//GET api/recipes
router.get("/", (req, res) => res.send("recipe route"));

module.exports = router;
