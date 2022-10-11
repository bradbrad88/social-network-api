const { User } = require("../models");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-__v")
      .populate({ path: "thoughts", select: "-__v" });
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(["-__v", "-id"])
      .populate({ path: "friends", select: "-__v" });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) return res.sendStatus(400);
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { email, username } },
      { new: true, runValidators: true }
    ).select("-__v");
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);
    user.delete();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

const addFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { friends: friendId } },

      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");
    await user.populate("friends");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { friends: friendId } },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  addFriend,
  deleteUser,
  deleteFriend,
};
