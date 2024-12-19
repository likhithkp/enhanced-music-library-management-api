const { getArtist, updateArtistInfo } = require("../../services/artists/artistServices");

const updateArtist = async (req, res) => {
    try {
        const { artist_id } = req.params
        const { name, grammy, hidden } = req.body;

        if (!artist_id) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            });
        }

        const artist = await getArtist({ artist_id: artist_id });
        if (!artist) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Artist Not Found",
                "error": null
            });
        }

        const dataToInsert = {};
        if (name !== undefined) dataToInsert.name = name
        if (grammy !== undefined) dataToInsert.grammy = grammy
        if (hidden !== undefined) dataToInsert.hidden = hidden

        await updateArtistInfo(artist_id, dataToInsert);
        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Error updating artist", details: error?.message });
    }
};

module.exports = updateArtist;