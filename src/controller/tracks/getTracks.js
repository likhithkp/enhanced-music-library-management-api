const { getAllTracks } = require("../../services/tracks/trackServices");

const fetchAllTracks = async (req, res) => {
    try {
        const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;

        const pagination = {
            limit: parseInt(limit, 10) || 5,
            offset: parseInt(offset, 10) || 0,
        };

        const tracks = await getAllTracks(pagination, { artist_id, album_id, hidden });

        return res.status(200).json({
            status: 200,
            data: tracks || [],
            message: "Tracks retrieved successfully.",
            error: null,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error while fetching all tracks",
            details: error?.message,
        });
    }
};

module.exports = fetchAllTracks;
