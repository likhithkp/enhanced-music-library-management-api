const express = require("express");
const artistRouter = express.Router();

const authenticateUser = require("../../middlewares/authenticateUser");
const adminEditorAuth = require("../../middlewares/adminEditorAuth");

const fetchAllArtists = require("../../controller/artists/getAllArtists");
const fetchArtist = require("../../controller/artists/getArtist");
const addArtist = require("../../controller/artists/addArtist");
const updateArtist = require("../../controller/artists/updateArtist");
const deleteArtist = require("../../controller/artists/deleteArtist");

artistRouter.get('/artists', authenticateUser, fetchAllArtists);
artistRouter.get('/artists/:artist_id', authenticateUser, fetchArtist);
artistRouter.post('/artists/add-artist', adminEditorAuth, addArtist);
artistRouter.put('/artists/:artist_id', adminEditorAuth, updateArtist);
artistRouter.delete('/artists/:artist_id', adminEditorAuth, deleteArtist);

module.exports = artistRouter;