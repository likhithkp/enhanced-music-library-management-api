const { createAlbum } = require("../../services/albums/albumServices");
const { getArtist } = require("../../services/artists/artistServices");

const addAlbum = async (req, res) => {
    try {
        const { artist_id, name, year, hidden } = req.body;

        if (
            artist_id === undefined ||
            name === undefined ||
            year === undefined ||
            hidden === undefined
        ) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request",
                error: null,
            });
        }

        const artist = await getArtist({ artist_id: artist_id });
        if (!artist) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Resource Doesn't Exist",
                "error": null
            });
        }

        const newAlbum = await createAlbum({ artist_id, name, year, hidden });
        if (newAlbum) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "Album created successfully.",
                "error": null
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error creating album", details: error?.message });
    }
};

module.exports = addAlbum;