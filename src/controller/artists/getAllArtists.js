const { getAllArtists } = require("../../services/artists/artistServices");

const fetchAllArtists = async (req, res) => {
    try {
        const { limit = 5, offset = 0, grammy, hidden } = req.query;

        const pagination = {
            limit: parseInt(limit, 10) || 5,
            offset: parseInt(offset, 10) || 0,
        };

        const artists = await getAllArtists(pagination, { grammy, hidden });

        return res.status(200).json({
            status: 200,
            data: artists || [],
            message: "Artists retrieved successfully.",
            error: null,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error fetching all artists",
            details: error?.message,
        });
    }
};

module.exports = fetchAllArtists;