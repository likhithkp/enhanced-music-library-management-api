const { models } = require("../../../db");

async function createAlbum(dataToInsert) {
    try {
        return await models.albums.create(dataToInsert);
    } catch (error) {
        throw new Error("Error creating album", error.message);
    }
}

async function getAllAlbums() {
    try {
        const result = await models.albums.findAll({
            include: [
                {
                    model: models.artists,
                    attributes: ["name"],
                },
            ],
        });

        if (!result?.length) return null;

        const formattedResult = result.map(album => {
            const albumData = album.get();
            const artistName = albumData.artist ? albumData.artist.name : null;

            return {
                album_id: albumData.album_id,
                artist_name: artistName,
                name: albumData.name,
                year: albumData.year,
                hidden: albumData.hidden,
            };
        });

        return formattedResult;
    } catch (error) {
        throw new Error(`Error fetching albums: ${error.message}`);
    }
}


async function deleteAlbumById(data) {
    try {
        return await models.albums.destroy({
            where: data
        });
    } catch (error) {
        throw new Error('Error while deleting album:', error.message);
    }
}

async function getAlbumById(data) {
    try {
        const album = await models.albums.findOne({
            where: data,
            include: [
                {
                    model: models.artists,
                    attributes: ["name"],
                },
            ],
        });

        if (album) {
            return {
                album_id: album?.album_id,
                artist_name: album?.artist.name,
                name: album?.name,
                year: album?.year,
                hidden: album?.hidden
            };
        } else {
            throw new Error("Album not found");
        }
    } catch (error) {
        throw new Error("Error fetching album: " + error.message);
    }
}

async function updateAlbumInfo(album_id, data) {
    try {
        return await models.albums.update(data,
            { where: { album_id } });
    } catch (error) {
        throw new Error("Error updating album info", error.message);
    }
}

module.exports = {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    deleteAlbumById,
    updateAlbumInfo
}