const { getArtist, deleteArtistById } = require("../../services/artists/artistServices");

const deleteArtist = async (req, res) => {
    try {
        const { artist_id } = req.params;

        if (!artist_id) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        const artist = await getArtist({ artist_id: artist_id });
        if (!artist) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Artist not found.",
                "error": null
            })
        }

        const deletedArtist = await deleteArtistById({ artist_id: artist_id })
        if (deletedArtist) {
            return res.status(200).json({
                "status": 200,
                "data": null,
                "message": `Artist:${artist?.name} deleted successfully.`,
                "error": null
            })
        }
    }
    catch (error) {
        throw new Error(error.message)
    }
}

module.exports = deleteArtist;