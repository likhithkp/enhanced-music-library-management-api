const { getAllArtists } = require("../../services/artists/artistServices");

const fetchAllArtists = async (_, res) => {
    try {
        const artists = await getAllArtists();
        return res.status(200).json({
            "status": 200,
            "data": artists || [],
            "message": "Artists retrieved successfully.",
            "error": null
        })
    } catch (error) {
        res.status(500).json({ error: "Error fetching all artists", details: error?.message });
    }
}

module.exports = fetchAllArtists;