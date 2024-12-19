const { updateTrackInfo, getTrack } = require("../../services/tracks/trackServices");

const updateTrack = async (req, res) => {
    try {
        const { track_id } = req.params
        const { name, duration, hidden } = req.body;

        if (!track_id) {
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
                "message": "Track Not Found",
                "error": null
            });
        }

        const dataToInsert = {};
        if (name !== undefined) dataToInsert.name = name
        if (duration !== undefined) dataToInsert.duration = duration
        if (hidden !== undefined) dataToInsert.hidden = hidden

        await updateTrackInfo(track_id, dataToInsert);
        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Error updating track", details: error?.message });
    }
};

module.exports = updateTrack;