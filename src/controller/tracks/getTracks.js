const { getAllTracks } = require("../../services/tracks/trackServices");

const fetchAllTrack = async (_, res) => {
    try {
        const tracks = await getAllTracks();
        return res.status(200).json({
            "status": 200,
            "data": tracks || [],
            "message": "Tracks retrieved successfully.",
            "error": null
        })
    } catch (error) {
        res.status(500).json({ error: "Error while fetching all tracks", details: error?.message });
    }
}

module.exports = fetchAllTrack;