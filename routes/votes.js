const { Router } = require("express");
const router = Router();
const Vote = require("../models/vote");

router.get("/", async (req, res) => {
  try {
    const votes = await Vote.find({});

    res.json({
      data: {
        votes,
      },
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, author } = req.body;

    const isExist = await Vote.findOne({ title });
    if (isExist) throw new Error("This vote has already created.");

    const vote = new Vote({ title, author });
    await vote.save();
    res.json({ message: "Successfully added." });
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
});

router.post("/vote", async (req, res) => {
  try {
    // const { title, author } = req.body;

    // const isExist = await Vote.findOne({ title });
    // if (isExist) throw new Error("This vote has already created.");

    // const vote = new Vote({ title, author });
    // await vote.save();
    res.json({ message: "Successfully added." });
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
});

module.exports = router;
