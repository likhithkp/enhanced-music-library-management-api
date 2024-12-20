const { getArtist } = require("../../services/artists/artistServices");

const fetchArtist = async (req, res) => {
    try {
        const { artist_id } = req.params
        const artist = await getArtist({ artist_id: artist_id });

        if (!artist) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Artist not found.",
                "error": null
            })
        }

        if (artist?.error) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request.",
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
        res.status(500).json({ error: "Error fetching artist", details: error?.message });
    }
}

module.exports = fetchArtist;