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
        throw new Error(error)
    }
}

module.exports = fetchAllArtists;