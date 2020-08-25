const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.json({ id: 4 });
});

module.exports = router;
