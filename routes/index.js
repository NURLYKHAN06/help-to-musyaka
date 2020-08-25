const { Router } = require("express");
const router = Router();

const auth = require("./auth");
const votes = require("./votes");

router.use("/auth", auth);
router.use("/votes", votes);

module.exports = router;
