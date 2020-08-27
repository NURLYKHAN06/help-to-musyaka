const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const candidate = await User.findOne({ username });
    if (candidate) throw new Error("Username has already taken.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({
      message: "Success.",
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Wrong email or password!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong email or password!");

    const data = {
      _id: user._id,
      username,
    };
    const signature = process.env.ACCESS_TOKEN_SECRET;
    const expiration = "24d";

    res.json({
      data: {
        token: jwt.sign(data, signature, { expiresIn: expiration }),
        userId: user._id,
      },
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
});

module.exports = router;
