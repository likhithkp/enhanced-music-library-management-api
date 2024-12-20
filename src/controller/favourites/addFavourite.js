const { createFavourite, getFavourite, validateItemIdInCategory } = require("../../services/favourites/favouriteServices");

const addFavourite = async (req, res) => {
    try {
        const { category, item_id } = req.body;
        const { user_id } = req;

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

        const checkItemInCategory = await validateItemIdInCategory(category, item_id)
        if(checkItemInCategory?.error || checkItemInCategory === false){
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Resource Doesn't Exist",
                "error": null
            });
        }

        const favouriteExists = await getFavourite(category, user_id, { limit: 100, offset: 0 });
        const existingFavourite = favouriteExists && favouriteExists?.find(favourite => favourite?.item_id === item_id);
        if (existingFavourite !== undefined) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Favourite already exists",
                error: null,
            });
        }

        const newFavourite = await createFavourite({ category, item_id, user_id });
        if (!newFavourite.error) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "Favourite created successfully.",
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
    } catch (error) {
        res.status(500).json({ error: "Error creating Favourite", details: error?.message });
    }
};

module.exports = addFavourite;