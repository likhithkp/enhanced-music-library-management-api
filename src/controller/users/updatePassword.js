const { updateUserPassword, getUser } = require("../../services/users/userServices");

const updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const {user_id} = req;

        const user = await getUser({ user_id: user_id })

        if (!user) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "User not found",
                "error": null
            })
        }

        if (!old_password || !new_password) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        if (old_password !== user?.password) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        await updateUserPassword({ user_id: user?.user_id, new_password })
        return res.status(204).json()
    }
    catch (error) {
        throw new Error(error)
    }
}

module.exports = updatePassword;