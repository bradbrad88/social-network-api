const thoughtRoute = require("./thoughtRoute");
const userRoute = require("./userRoute");
const router = require("express").Router();

router.use("/user", userRoute);
router.use("/thought", thoughtRoute);

module.exports = router;
