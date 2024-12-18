const { createArtist, getArtist } = require("../../services/artists/artistServices");

const addArtist = async (req, res) => {
    try {

        const { name, grammy, hidden } = req.body;

        // Validate the required params
        if (!(name || grammy || hidden)) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            });
        }

        // Check if the user already exists with the provided email
        const artist = await getArtist({name: name});
        if (artist) {
            return res.status(409).json({
                "status": 409,
                "data": null,
                "message": "Artist already exists.",
                "error": null
            });
        }

        const newArtist = await createArtist({ name, grammy, hidden });
        if (newArtist) {
            return res.status(201).json({
                "status": 201,
                "data": null,
                "message": "Artist created successfully.",
                "error": null
            });
        }
    } catch (error) {
        throw new Error("Error creating user");
    }
};

module.exports = addArtist;