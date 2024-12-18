const { getArtist } = require("../../services/artists/artistServices");

const fetchArtist = async (req, res) => {
    try {
        const { artist_id } = req.params
        const artist = await getArtist({ artist_id: artist_id });

        if (!artist) {
            return res.status(404).json({
                "status": 404,
                "data": artist,
                "message": "Artist not found.",
                "error": null
            })
        }

        return res.status(200).json({
            "status": 200,
            "data": artist,
            "message": "Artist retrieved successfully.",
            "error": null
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = fetchArtist;