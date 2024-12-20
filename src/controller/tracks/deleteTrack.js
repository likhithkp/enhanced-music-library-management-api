const { deleteTrackById, getTrack } = require("../../services/tracks/trackServices");

const deleteTrack = async (req, res) => {
    try {
        const { track_id } = req.params;

        if (!track_id) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        const track = await getTrack({ track_id: track_id });
        if (!track) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Track not found.",
                "error": null
            })
        }

        const deletedTrack = await deleteTrackById({ track_id: track_id })
        if (!deletedTrack.error) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": `Track:${track?.name} deleted successfully.`,
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
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting track", details: error?.message });
    }
}

module.exports = deleteTrack;