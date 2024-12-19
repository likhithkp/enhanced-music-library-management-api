const { models } = require("../../../db");

async function createAlbum(dataToInsert) {
    try {
        return await models.albums.create(dataToInsert);
    } catch (error) {
        return {
            message: "Error while creating album.",
            error: error.message,
        };
    }
}

async function getAllAlbums({ limit, offset }, filters) {
    try {
        const whereClause = {};

        if (filters.artist_id) {
            whereClause.artist_id = filters.artist_id;
        }

        if (filters.hidden !== undefined) {
            whereClause.hidden = filters.hidden === 'true';
        }

        const result = await models.albums.findAll({
            where: whereClause,
            include: [
                {
                    model: models.artists,
                    attributes: ["name"],
                },
            ],
            limit,
            offset,
            attributes: ["album_id", "name", "year", "hidden", "artist_id"],
        });

        if (!result?.length) return [];

        const formattedResult = result.map((album) => {
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
        return {
            message: "Error while fetching albums.",
            error: error.message,
        };
    }
}

async function deleteAlbumById(data) {
    try {
        return await models.albums.destroy({
            where: data
        });
    } catch (error) {
        return {
            message: "Error while deleting album.",
            error: error.message,
        };
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
                artist_name: album?.artist?.name,
                name: album?.name,
                year: album?.year,
                hidden: album?.hidden
            };
        } else {
            throw new Error("Album not found");
        }
    } catch (error) {
        return {
            message: "Error fetching album.",
            error: error.message,
        };
    }
}

async function updateAlbumInfo(album_id, data) {
    try {
        return await models.albums.update(data,
            { where: { album_id } });
    } catch (error) {
        return {
            message: "Error updating album.",
            error: error.message,
        };
    }
}

module.exports = {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    deleteAlbumById,
    updateAlbumInfo
}