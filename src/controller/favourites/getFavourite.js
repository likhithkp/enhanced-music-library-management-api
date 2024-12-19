const { getFavourite } = require("../../services/favourites/favouriteServices");

const getFavourites = async (req, res) => {
    const {user_id} = req;
    try {
        const { category } = req.params
        const favourites = await getFavourite(category, user_id);
        return res.status(200).json({
            "status": 200,
            "data": favourites || [],
            "message": "Favorites retrieved successfully.",
            "error": null
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while retrieving favourites.",
            error: error.message,
        });
    }
}

module.exports = getFavourites;