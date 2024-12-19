const { models } = require("../../../db");

async function createFavourite(dataToInsert) {
    try {
        return await models.favourites.create(dataToInsert);
    } catch (error) {
        return {
            message: "Error while creating favourites.",
            error: error.message,
        };
    }
}

async function getFavourite(category) {
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
            where: { category },
        });

        if (!favourites.length) {
            return []
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

        return formattedResult

    } catch (error) {
        return {
            message: "Error fetching favourites.",
            error: error.message,
        };
    }
}

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
}