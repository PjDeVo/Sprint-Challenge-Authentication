const express = require("express");
const Users = require("./users-model.js");
const restrict = require("../auth/authenticate-middleware.js");

const router = express.Router();

router.get("/", restrict(), async (req, res) => {
  try {
    res.json(await Users.find());
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
