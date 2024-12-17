const express = require("express");
const trackRouter = express.Router();

trackRouter.get('/tracks');

module.exports = trackRouter;