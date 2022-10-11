const thoughtRoute = require("./thoughtRoute");
const userRoute = require("./userRoute");
const router = require("express").Router();

router.use("/users", userRoute);
router.use("/thoughts", thoughtRoute);

module.exports = router;
