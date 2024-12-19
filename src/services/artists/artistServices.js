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

async function getAllArtists() {
    try {
        return await models.artists.findAll();
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