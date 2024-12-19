const { createFavourite, getFavourite } = require("../../services/favourites/favouriteServices");

const addFavourite = async (req, res) => {
    try {
        const { category, item_id } = req.body;

        if (
            category === undefined ||
            item_id === undefined
        ) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request",
                error: null,
            });
        }

        const favouriteExists = await getFavourite(category);
        const existingFavourite = favouriteExists && favouriteExists?.find(favourite => favourite?.item_id === item_id);

        if (existingFavourite !== undefined) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Favourite already exists",
                error: null,
            });
        }

        const newFavourite = await createFavourite({ category, item_id });
        if (newFavourite) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "Favourite created successfully.",
                "error": null
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error creating Favourite", details: error?.message });
    }
};

module.exports = addFavourite;