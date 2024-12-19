const express = require("express");
const favouriteRouter = express.Router();

const authenticateUser = require("../../middlewares/authenticateUser");

const addFavourite = require("../../controller/favourites/addFavourite");
const getFavourites = require("../../controller/favourites/getFavourite");
const deleteFavourites = require("../../controller/favourites/deleteFavourite");

favouriteRouter.get('/favorites/:category', authenticateUser, getFavourites);
favouriteRouter.post('/favorites/add-favorite', authenticateUser, addFavourite);
favouriteRouter.delete('/favorites/remove-favorite/:id', authenticateUser, deleteFavourites);

module.exports = favouriteRouter;
