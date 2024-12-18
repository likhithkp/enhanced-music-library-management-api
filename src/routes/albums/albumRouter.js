const express = require("express");
const albumRouter = express.Router();

const authenticateUser = require("../../middlewares/authenticateUser");
const adminEditorAuth = require("../../middlewares/adminEditorAuth");

const addAlbum = require("../../controller/albums/addAlbum");
const getAlbums = require("../../controller/albums/getAlbums");
const getAlbum = require("../../controller/albums/getAlbum");
const updateAlbum = require("../../controller/albums/updateAlbum");
const deleteAlbum = require("../../controller/albums/deleteAlbum");

albumRouter.get('/albums', authenticateUser, getAlbums);
albumRouter.get('/albums/:album_id', authenticateUser, getAlbum);
albumRouter.post('/albums/add-album', adminEditorAuth, addAlbum);
albumRouter.put('/albums/:album_id', adminEditorAuth, updateAlbum);
albumRouter.delete('/albums/:album_id', adminEditorAuth, deleteAlbum);

module.exports = albumRouter;