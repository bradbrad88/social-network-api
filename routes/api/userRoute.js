const router = require("express").Router();

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  addFriend,
  deleteUser,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
