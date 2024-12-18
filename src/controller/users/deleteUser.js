const { getUser, deleteUserById } = require("../../services/users/userServices");

const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        }

        const user = await getUser({ user_id: user_id });
        if (!user) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": "User not found.",
                "error": null
            })
        }

        const deletedUser = await deleteUserById({ user_id: user_id })
        if (deletedUser) {
            return res.status(200).json({
                "status": 200,
                "data": null,
                "message": "User deleted successfully.",
                "error": null
            })
        }
    }
    catch (error) {
        throw new Error(error)
    }
}

module.exports = deleteUser;