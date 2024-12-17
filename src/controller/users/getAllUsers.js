const { getAllUsers } = require("../../services/users/userServices");

const fetchAllUsers = async (_, res) => {
    try {
        const users = await getAllUsers();
        if (users?.length) {
            return res.status(200).json({
                "status": 200,
                "data": users,
                "message": "Users retrieved successfully.",
                "error": null
            })
        }
    }
    catch (error) {
        throw new Error(error)
    }
}

module.exports = fetchAllUsers;