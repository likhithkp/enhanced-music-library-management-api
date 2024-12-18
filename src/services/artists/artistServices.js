const { models } = require("../../../db");

async function createArtist(dataToInsert) {
    try {
        return await models.artists.create(dataToInsert);
    } catch (error) {
        throw new Error("Error creating artist", error.message);
    }
}

async function getAllArtists() {
    try {
        return await models.artists.findAll();
    } catch (error) {
        throw new Error("Error fetching artists", error.message);
    }
}

async function deleteArtistById(data) {
    console.log(data)
    try {
        return await models.artists.destroy({
            where: data
        });
    } catch (error) {
        throw new Error('Error while deleting artist:', error.message);
    }
}

async function getArtist(data) {
    try {
        return await models.artists.findOne({
            where: data
        });
    } catch (error) {
        throw new Error("Error fetching artist", error.message);
    }
}

async function updateArtistInfo(artist_id, data) {
    try {
        return await models.artists.update(data,
            { where: { artist_id } });
    } catch (error) {
        throw new Error("Error updating password", error.message);
    }
}

module.exports = {
    createArtist,
    getAllArtists,
    getArtist,
    deleteArtistById,
    updateArtistInfo
}