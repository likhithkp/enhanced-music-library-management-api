const { getTrack } = require("../../services/tracks/trackServices");

const fetchTrack = async (req, res) => {
    try {
        const { track_id } = req.params
        const track = await getTrack({ track_id: track_id });

        if (!track) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Track not found.",
                "error": null
            })
        }

        if (track?.error) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request.",
                "error": null
            })
        }

        return res.status(200).json({
            "status": 200,
            "data": track,
            "message": "Track retrieved successfully.",
            "error": null
        })
    } catch (error) {
        res.status(500).json({ error: "Error while fetching track", details: error?.message });
        throw new Error(error)
    }
}

module.exports = fetchTrack;