const {  getAlbumById, updateAlbumInfo } = require("../../services/albums/albumServices");

const updateAlbum = async (req, res) => {
    try {
        const { album_id } = req.params
        const { name, year, hidden } = req.body;

        if (name === undefined && year === undefined && hidden === undefined) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            });
        }

        const album = await getAlbumById({ album_id: album_id });
        if (!album?.album_id) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Album Not Found",
                "error": null
            });
        }

        const dataToInsert = {};
        if (name !== undefined) dataToInsert.name = name
        if (year !== undefined) dataToInsert.year = year
        if (hidden !== undefined) dataToInsert.hidden = hidden

        const updatedAlbum = await updateAlbumInfo(album_id, dataToInsert);
        if (updatedAlbum?.error) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            });
        }
        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Error updating album", details: error?.message });
    }
};

module.exports = updateAlbum;