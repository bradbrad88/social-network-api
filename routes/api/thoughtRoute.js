const router = require("express").Router();
const {
  getThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);
router.route("/:id/reactions/").post(createReaction);
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
