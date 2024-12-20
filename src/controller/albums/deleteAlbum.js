const { getAlbumById, deleteAlbumById } = require("../../services/albums/albumServices");

const deleteAlbum = async (req, res) => {
    try {
        const { album_id } = req.params;

        if (!album_id) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        const album = await getAlbumById({ album_id: album_id });
        if (!album) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Album not found.",
                "error": null
            })
        }

        const deleteAlbum = await deleteAlbumById({ album_id: album_id })
        if (!deleteAlbum.error) {
            return res.status(200).json({
                "status": 200,
                "data": null,
                "message": `Album:${album?.name} deleted successfully.`,
                "error": null
            });
        } else {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting album", details: error?.message });
    }
}

module.exports = deleteAlbum;