const router = require("express").Router();
const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const invalidUser = await Users.findBy({ username }).first();

    if (invalidUser) {
      res.json(409).json({ message: "username is already taken" });
    }
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const saved = await Users.add(user);
    res.status(200).json(saved);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials",
  };

  try {
    const user = await Users.findBy({ username: req.body.username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(401).json("password incorrect");
      console.log(res.cookie);
    }

    const tokenPayload = {
      userId: user.id,
      userRole: "admin",
    };

    res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET));

    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
