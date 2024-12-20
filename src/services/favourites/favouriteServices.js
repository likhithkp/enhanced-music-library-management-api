const { models } = require("../../../db");

async function createFavourite(dataToInsert) {
    console.log("Data being inserted:", dataToInsert);
    try {
        return await models.favourites.create(dataToInsert);
    } catch (error) {
        return {
            message: "Error while creating favourites.",
            error: error.message,
        };
    }
}

async function getFavourite(category, user_id, { limit, offset }) {
    try {
        const categoryMapping = {
            artist: { model: models.artists, alias: 'artist' },
            album: { model: models.albums, alias: 'album' },
            track: { model: models.tracks, alias: 'track' },
        };

        const categoryConfig = categoryMapping[category];
        if (!categoryConfig) {
            throw new Error(`Invalid category: ${category}`);
        }

        const favourites = await models.favourites.findAll({
            include: [
                {
                    model: categoryConfig.model,
                    as: categoryConfig.alias,
                    attributes: ["name"],
                    required: true,
                },
            ],
            attributes: ["favorite_id", "category", "item_id", "created_at"],
            where: { category, user_id },
            limit,
            offset,
        });

        if (!favourites.length) {
            return [];
        }

        const formattedResult = favourites.map((favourite) => {
            const favData = favourite.get();
            const associatedItem = favData[categoryConfig.alias];

            return {
                favorite_id: favData?.favorite_id,
                category: favData?.category,
                item_id: favData?.item_id,
                name: associatedItem ? associatedItem?.name : null,
                created_at: favData?.created_at,
            };
        });

        return formattedResult;
    } catch (error) {
        return {
            message: "Error fetching favourites.",
            error: error.message,
        };
    }
}

async function validateItemIdInCategory(category, item_id) {
    try {
        const categoryMapping = {
            artist: { model: models.artists, idField: "artist_id" },
            album: { model: models.albums, idField: "album_id" },
            track: { model: models.tracks, idField: "track_id" },
        };

        const categoryConfig = categoryMapping[category];

        if(!categoryConfig){
            return {
                error: "Invalid category",
            };
        }

        const { model, idField } = categoryConfig;

        const itemExists = await model.findOne({
            where: { [idField]: item_id },
        });

        return !!itemExists;

    } catch (error) {
        return {
            message: "Error validating item in category",
            error: error?.message,
        };
    }
};

async function deleteFavouriteById(data) {
    try {
        return await models.favourites.destroy({
            where: data
        });
    } catch (error) {
        return {
            message: "Error while deleting favourite:",
            error: error.message,
        };
    }
}

module.exports = {
    createFavourite,
    getFavourite,
    deleteFavouriteById,
    validateItemIdInCategory
}