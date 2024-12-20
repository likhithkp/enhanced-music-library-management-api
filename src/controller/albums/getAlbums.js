const { getAllAlbums } = require("../../services/albums/albumServices");

const getAlbums = async (req, res) => {
    try {
        const { limit = 5, offset = 0, artist_id, hidden } = req.query;

        const pagination = {
            limit: parseInt(limit, 10) || 5,
            offset: parseInt(offset, 10) || 0,
        };

        const albums = await getAllAlbums(pagination, { artist_id, hidden });
        if (!albums?.error) {
            return res.status(200).json({
                "status": 200,
                "data": albums,
                "message": "Albums retrieved successfully.",
                "error": null
            })
        } else {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "Error fetching all albums",
            details: error?.message,
        });
    }
};

module.exports = getAlbums;
