const { models } = require("../../../db");

async function createArtist(dataToInsert) {
    try {
        return await models.artists.create(dataToInsert);
    } catch (error) {
        return {
            message: "Error creating artist.",
            error: error.message,
        };
    }
}

async function getAllArtists({ limit, offset }, filters) {
    try {
        const whereClause = {};

        if (filters.grammy !== undefined) {
            whereClause.grammy = parseInt(filters.grammy, 10);
        }

        if (filters.hidden !== undefined) {
            whereClause.hidden = filters.hidden === 'true';
        }

        const artists = await models.artists.findAll({
            where: whereClause,
            limit,
            offset,
            attributes: ["artist_id", "name", "grammy", "hidden", "created_at", "updated_at"],
        });

        return artists;
    } catch (error) {
        return {
            message: "Error while fetching artists.",
            error: error.message,
        };
    }
}

async function deleteArtistById(data) {
    console.log(data)
    try {
        return await models.artists.destroy({
            where: data
        });
    } catch (error) {
        return {
            message: "Error while deleting artist.",
            error: error.message,
        };
    }
}

async function getArtist(data) {
    try {
        return await models.artists.findOne({
            where: data
        });
    } catch (error) {
        return {
            message: "Error while fetching artist.",
            error: error.message,
        };
    }
}

async function updateArtistInfo(artist_id, data) {
    try {
        return await models.artists.update(data,
            { where: { artist_id } });
    } catch (error) {
        return {
            message: "Error updating artist info.",
            error: error.message,
        };
    }
}

module.exports = {
    createArtist,
    getAllArtists,
    getArtist,
    deleteArtistById,
    updateArtistInfo
}