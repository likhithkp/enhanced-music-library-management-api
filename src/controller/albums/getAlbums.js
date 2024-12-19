const { getAllAlbums } = require("../../services/albums/albumServices");

const getAlbums = async (_, res) => {
    try {
        const albums = await getAllAlbums();
        return res.status(200).json({
            "status": 200,
            "data": albums || [],
            "message": "Albums retrieved successfully.",
            "error": null
        })
    } catch (error) {
        res.status(500).json({ error: "Error fetching all albums", details: error?.message });
    }
}

module.exports = getAlbums;