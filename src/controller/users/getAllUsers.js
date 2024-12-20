const { getAllUsers } = require("../../services/users/userServices");

const fetchAllUsers = async (req, res) => {
    try {
        const { limit = 5, offset = 0, role } = req.query;

        const pagination = {
            limit: parseInt(limit, 10) || 5,
            offset: parseInt(offset, 10) || 0,
        };

        const users = await getAllUsers(pagination, role);
        if(!users?.error){
            return res.status(200).json({
                status: 200,
                data: users || [],
                message: "Users retrieved successfully.",
                error: null,
            });
        } else {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad request",
                error: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error fetching users",
            details: error?.message,
        });
    }
};

module.exports = fetchAllUsers;
