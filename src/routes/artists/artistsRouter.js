const express = require("express");
const artistRouter = express.Router();

artistRouter.get('/artists');

module.exports = artistRouter;