const { updateTrackInfo, getTrack } = require("../../services/tracks/trackServices");

const updateTrack = async (req, res) => {
    try {
        const { track_id } = req.params
        const { name, duration, hidden } = req.body;

        if (name === undefined && duration === undefined && hidden === undefined) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            });
        }

        const track = await getTrack({ track_id: track_id });
        if (!track) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Track doesn't exist",
                "error": null
            });
        }

        const dataToInsert = {};
        if (name !== undefined) dataToInsert.name = name
        if (duration !== undefined) dataToInsert.duration = duration
        if (hidden !== undefined) dataToInsert.hidden = hidden

        const updatedTrack = await updateTrackInfo(track_id, dataToInsert);
        if (updatedTrack?.error) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            });
        }
        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Error updating track", details: error?.message });
    }
};

module.exports = updateTrack;