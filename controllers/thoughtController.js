const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().select("-__v");
    res.json(thoughts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.sendStatus(404);
    res.json(thought);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createThought = async (req, res) => {
  try {
    const { userId, thoughtText } = req.body;
    const user = await User.findById(userId);
    const thought = { username: user.username, thoughtText };
    const newThought = await Thought.create(thought);
    await user.updateOne(
      { $addToSet: { thoughts: newThought._id } },
      { new: true, runValidators: true }
    );
    res.json(newThought);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateThought = async (req, res) => {
  try {
    const { id } = req.params;
    const { thoughtText } = req.body;
    const thought = await Thought.findByIdAndUpdate(
      id,
      { $set: { thoughtText } },
      { new: true, runValidators: true }
    ).select("-__v");
    res.json(thought);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteThought = async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findById(id).select("-__v");
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );
    await thought.deleteOne();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, reactionBody } = req.body;
    const user = await User.findById(userId);
    const reaction = { username: user.username, reactionBody };
    const thought = await Thought.findByIdAndUpdate(
      id,
      { $addToSet: { reactions: reaction } },
      { new: true, runValidators: true }
    ).select("-__v");
    res.json(thought);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const { id, reactionId } = req.params;
    const thought = await Thought.findByIdAndUpdate(
      id,
      {
        $pull: { reactions: { reactionId } },
      },
      { new: true, runValidators: true }
    ).select("-__v");
    res.json(thought);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
