const { getFavourite } = require("../../services/favourites/favouriteServices");

const getFavourites = async (req, res) => {
    const { user_id } = req;
    try {
        const { category } = req.params;
        const { limit = 5, offset = 0 } = req.query;

        const pagination = {
            limit: parseInt(limit, 10) || 5,
            offset: parseInt(offset, 10) || 0,
        };

        const favourites = await getFavourite(category, user_id, pagination);
        if (!favourites?.error) {
            return res.status(200).json({
                status: 200,
                data: favourites || [],
                message: "Favorites retrieved successfully.",
                error: null,
            });
        } else {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while retrieving favourites.",
            error: error.message,
        });
    }
};

module.exports = getFavourites;
