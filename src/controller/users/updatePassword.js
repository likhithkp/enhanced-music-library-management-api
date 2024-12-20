const { updateUserPassword, getUser } = require("../../services/users/userServices");

const updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const { user_id } = req;

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

        const updatedUserInfo = await updateUserPassword({ user_id: user?.user_id, new_password })
        if (updatedUserInfo?.error) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad request",
                "error": null
            });
        }
        return res.status(204).json()
    }
    catch (error) {
        res.status(500).json({ error: "Error updating password", details: error?.message });
    }
}

module.exports = updatePassword;