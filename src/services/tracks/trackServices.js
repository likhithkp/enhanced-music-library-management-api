const { models } = require("../../../db");

async function createTrack(dataToInsert) {
    try {
        return await models.tracks.create(dataToInsert);
    } catch (error) {
        return {
            message: "Error creating track.",
            error: error.message,
        };
    }
}

async function getAllTracks({ limit, offset }, filters) {
    try {
        const whereClause = {};

        if (filters.artist_id) {
            whereClause.artist_id = filters.artist_id;
        }

        if (filters.album_id) {
            whereClause.album_id = filters.album_id;
        }

        if (filters.hidden !== undefined) {
            whereClause.hidden = filters.hidden === 'true';
        }

        const tracks = await models.tracks.findAll({
            where: whereClause,
            include: [
                {
                    model: models.artists,
                    attributes: ["name"],
                },
                {
                    model: models.albums,
                    attributes: ["name"],
                },
            ],
            limit,
            offset,
        });

        if (!tracks?.length) return [];

        const formattedResult = tracks.map((track) => {
            const trackData = track.get();
            const artistName = trackData.artist ? trackData.artist.name : null;
            const albumName = trackData.album ? trackData.album.name : null;

            return {
                track_id: trackData.track_id,
                artist_name: artistName,
                album_name: albumName,
                name: trackData.name,
                hidden: trackData.hidden,
                year: trackData.year,
            };
        });

        return formattedResult;
    } catch (error) {
        return {
            message: "Error fetching tracks.",
            error: error.message,
        };
    }
}

async function deleteTrackById(data) {
    try {
        return await models.tracks.destroy({
            where: data
        });
    } catch (error) {
        return {
            message: "Error while deleting track.",
            error: error.message,
        };
    }
}

async function getTrack(data) {
    try {
        const track = await models.tracks.findOne({
            where: data,
            include: [
                {
                    model: models.artists,
                    attributes: ["name"],
                },
                {
                    model: models.albums,
                    attributes: ["name"],
                },
            ]
        });
        if (!track) return null;
        if (track) {
            return {
                track_id: track?.track_id,
                artist_name: track?.artist?.name,
                album_name: track?.album?.name,
                name: track?.name,
                year: track?.year,
                hidden: track?.hidden
            };
        } else {
            throw new Error("Track not found");
        }
    } catch (error) {
        return {
            message: "Error while fetching track.",
            error: error.message,
        };
    }
}

async function updateTrackInfo(track_id, data) {
    try {
        return await models.tracks.update(data,
            { where: { track_id } });
    } catch (error) {
        return {
            message: "Error updating track.",
            error: error.message,
        };
    }
}

module.exports = {
    createTrack,
    getAllTracks,
    getTrack,
    deleteTrackById,
    updateTrackInfo
}