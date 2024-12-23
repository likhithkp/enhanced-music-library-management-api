const { getAlbumById } = require("../../services/albums/albumServices");
const { getArtist } = require("../../services/artists/artistServices");
const { createTrack, getTrack } = require("../../services/tracks/trackServices");

const addTrack = async (req, res) => {
    try {
        const { name, duration, hidden, artist_id, album_id } = req.body;

        if (
            duration === undefined ||
            name === undefined ||
            artist_id === undefined ||
            hidden === undefined ||
            album_id === undefined
        ) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request",
                error: null,
            });
        }

        const track = await getTrack({ name: name });
        if (track?.track_id) {
            return res.status(409).json({
                "status": 409,
                "data": null,
                "message": "Track already exists.",
                "error": null
            });
        }

        const artist = await getArtist({ artist_id: artist_id });
        if (!artist?.artist_id) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Resource Doesn't Exist",
                "error": null
            });
        }

        const album = await getAlbumById({ artist_id: artist_id });
        if (!album?.album_id) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Resource Doesn't Exist",
                "error": null
            });
        }

        const newTrack = await createTrack({ name, duration, hidden, artist_id, album_id });
        if (!newTrack.error) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "Track created successfully.",
                "error": null
            });
        } else {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error creating track", details: error?.message });
    }
};

module.exports = addTrack;