const { Router } = require("express");
const router = Router();
const { Voter, Vote } = require("../models/vote");
const User = require("../models/user");

const checkToken = require("../middlewares/auth");

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

router.post("/add", checkToken, async (req, res) => {
  try {
    const { title, authorId } = req.body;

    const Author = await User.findById(authorId);
    if (!Author) throw new Error("User is not find!");

    const isExist = await Vote.findOne({ title });
    if (isExist) throw new Error("This vote has already created.");

    const vote = new Vote({ title, author: { id: authorId, username: Author.username } });
    await vote.save();
    res.json({ message: "Successfully added." });
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
});

router.post("/vote", checkToken, async (req, res) => {
  try {
    const { id, voterId } = req.body;
    const vote = await Vote.findById(id);
    if (!vote) throw new Error("Vote is not exist.");

    const ExistVoter = await User.findById(voterId);
    if (!ExistVoter) throw new Error("User is not find!");

    const voter = new Voter({ id: voterId, username: ExistVoter.username });
    await voter.validate();

    const voterIndex = vote.voters.findIndex((_voter) => voter.id);
    voterIndex == -1 ? vote.voters.push(voter) : vote.voters.splice(voterIndex, 1);

    if (ExistVoter.votes.length == 0) {
      ExistVoter.votes.push(id);
    } else {
      ExistVoter.votes.forEach((voteId, index, self) => {
        if (voteId == id) {
          self.splice(index, 1);
        } else self.push(id);
      });
    }
    await vote.save();
    await ExistVoter.save();
    res.json({ message: "Success." });
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
});

module.exports = router;
