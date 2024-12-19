const express = require("express");
const trackRouter = express.Router();

const adminEditorAuth = require("../../middlewares/adminEditorAuth");
const authenticateUser = require("../../middlewares/authenticateUser");

const addTrack = require("../../controller/tracks/addTrack");
const fetchAllTrack = require("../../controller/tracks/getTracks");
const fetchTrack = require("../../controller/tracks/getTrack");
const updateTrack = require("../../controller/tracks/updateTrack");
const deleteTrack = require("../../controller/tracks/deleteTrack");

trackRouter.get('/tracks', authenticateUser, fetchAllTrack);
trackRouter.get('/tracks/:track_id', authenticateUser, fetchTrack);
trackRouter.post('/tracks/add-track', adminEditorAuth, addTrack);
trackRouter.put('/tracks/:track_id', adminEditorAuth, updateTrack);
trackRouter.delete('/tracks/:track_id', adminEditorAuth, deleteTrack);

module.exports = trackRouter;
