const { getFavourite, deleteFavouriteById } = require("../../services/favourites/favouriteServices");

const deleteFavourites = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        const track = await getFavourite({ id: id });
        if (!track) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Favourite not found.",
                "error": null
            })
        }

        const deletedTrack = await deleteFavouriteById({ favorite_id: id })
        if (deletedTrack) {
            return res.status(200).json({
                "status": 200,
                "data": null,
                "message": `Favourite removed successfully.`,
                "error": null
            })
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error while removing Favourite", details: error?.message });
    }
}

module.exports = deleteFavourites;