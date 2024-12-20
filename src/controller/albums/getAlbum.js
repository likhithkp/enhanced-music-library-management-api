const { getAlbumById } = require("../../services/albums/albumServices");

const getAlbum = async (req, res) => {
    try {
        const { album_id } = req.params
        const album = await getAlbumById({ album_id: album_id });

        if (!album?.album_id) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Album not found.",
                "error": null
            })
        }

        if (album?.error) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            })
        }

        return res.status(200).json({
            "status": 200,
            "data": album,
            "message": "Album retrieved successfully.",
            "error": null
        })
    } catch (error) {
        res.status(500).json({ error: "Error while fetching album", details: error?.message });
    }
}

module.exports = getAlbum;