const express = require("express");
const router = express.Router();

const usersRouter = require("./users/userRouter");
const artistsRouter = require("./artists/artistsRouter");
const tracksRouter = require("./tracks/tracksRouter");

router.use("/", usersRouter)
router.use("/", artistsRouter)
router.use("/", tracksRouter)

module.exports = router;