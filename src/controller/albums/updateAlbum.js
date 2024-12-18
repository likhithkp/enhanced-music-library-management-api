const {  getAlbumById, updateAlbumInfo } = require("../../services/albums/albumServices");

const updateAlbum = async (req, res) => {
    try {
        const { album_id } = req.params
        const { name, year, hidden } = req.body;

        if (!album_id) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            });
        }

        const artist = await getAlbumById({ album_id: album_id });
        if (!artist) {
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

        await updateAlbumInfo(album_id, dataToInsert);
        return res.status(204).json();
    } catch (error) {
        throw new Error(`Error updating album ${error.message}`);
    }
};

module.exports = updateAlbum;