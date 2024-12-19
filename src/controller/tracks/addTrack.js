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
        if (track) {
            return res.status(409).json({
                "status": 409,
                "data": null,
                "message": "Track already exists.",
                "error": null
            });
        }

        const newTrack = await createTrack({ name, duration, hidden, artist_id, album_id });
        if (newTrack) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "Track created successfully.",
                "error": null
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error creating track", details: error?.message });
    }
};

module.exports = addTrack;