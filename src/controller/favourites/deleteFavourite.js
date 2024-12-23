const { deleteFavouriteById, getFavouriteByUserId } = require("../../services/favourites/favouriteServices");

const deleteFavourites = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req;

        if (id === undefined) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        const favorite = await getFavouriteByUserId(user_id);
        if (!favorite?.favorite_id) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Favourite not found.",
                "error": null
            })
        }

        const deletedTrack = await deleteFavouriteById({ favorite_id: id, user_id })
        if (!deletedTrack.error) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": `Favourite removed successfully.`,
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
        res.status(500).json({ error: "Error while removing Favourite", details: error?.message });
    }
}

module.exports = deleteFavourites;