const { getAllUsers } = require("../../services/users/userServices");

const fetchAllUsers = async (_, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json({
            "status": 200,
            "data": users || [],
            "message": "Users retrieved successfully.",
            "error": null
        })
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching users", details: error?.message });
    }
}

module.exports = fetchAllUsers;