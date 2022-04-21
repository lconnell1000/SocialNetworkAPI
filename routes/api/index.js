const usersRoutes = require("./usersRoutes");
const thoughtsRoutes = require("./thoughtsRoutes");
const router = require("express").Router();

router.use("/users", usersRoutes);
router.use("/thoughts", thoughtsRoutes);

module.exports = router;